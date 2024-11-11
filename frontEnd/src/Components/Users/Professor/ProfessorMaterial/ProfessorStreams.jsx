import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import connectJs from '../../../../connect';

export default function ProfessorStreams() {
  const navigate = useNavigate();

  // Array of streams
  const [streams, setStream] = useState([]);
  const [localData, setLocalData] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [currentSubject, setcurrentSubject] = useState((sessionStorage.getItem("currentSubject")));
  const [teacherName, setteacherName] = useState(JSON.parse(localStorage.getItem("userInfo")).fname + JSON.parse(localStorage.getItem("userInfo")).lname)

  const { backEndLink } = connectJs;
  const path = window.location.pathname;
  const classString = path.split("/");
  const classID = classString[classString.length - 1];

  useEffect(() => {
    const getStreams = async () => {

      try {
        let response = await axios.get(`${backEndLink}/uploadedAssignment/${classID}`, {
          withCredentials: true
        })
        setStream(response.data.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    getStreams();
  }, [])


  function formatDateToReadable(dateStr) {
    const date = new Date(dateStr);

    // Format options
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    };

    return date.toLocaleString("en-US", options);
  }

  // const handleDownload = () => {
  //   // URL for the PDF in the backend's 'uploads' folder
  //   const fileUrl = "http://localhost:3000/uploads/assignments/doc-20240411-wa0002.pdf";

  //   // Create a temporary anchor link for downloading the file
  //   const link = document.createElement("a");
  //   link.href = fileUrl;
  //   link.click(); // Trigger the download
  // };

  const handleDownload = (url) => {
    // Open the document URL in a new tab
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank"; // Open in a new tab
    link.rel = "noopener noreferrer"; // Security measure
    link.click(); // Trigger the open action
  };


  const handleEdit = (assignmentId) => {
    console.log(`Edit assignment with ID: ${assignmentId}`);
    // Add edit functionality here
  };

  const handleDelete = (assignmentId) => {
    console.log(`Delete assignment with ID: ${assignmentId}`);
    // Add delete functionality here
  };


  return (
    <div>
      <header className="bg-blue-600 rounded-lg text-white p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{currentSubject}</h1>
          <p className="text-lg">Professor {teacherName}</p>
        </div>
        <div>
          <i style={{ fontSize: "60px" }} class=" bg-white p-3 rounded-full text-blue-500 fa-brands fa-google-scholar"></i>
        </div>
      </header>

      <div className="flex p-6">
        <main className="w-full">
          {streams.map((assignment, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer"
            >
              <div className="flex items-center mb-2">
                <i className="fas fa-file-alt text-blue-600"></i>
                <p onClick={() => {
                  navigate(`/new-route/${classID}/${assignment.assignment_id}`, { state: { someData: assignment.stateData } });
                }} className="ml-2 font-bold">New Assignment : {assignment.title}</p>
              </div>
              <p className="text-gray-500">Deadline <b>{formatDateToReadable(assignment.deadline)}</b></p>
              <p className="text-gray-500">Instructions <b>{assignment.instruction}</b></p>
              <div className='flex'>
                <button className='mr-4' onClick={() => handleDownload(assignment.documentUrl)}>
                  <i className="text-green-500 fa-solid fa-download"></i> Download
                </button>
                <button onClick={() => handleEdit(assignment.assignment_id)} className="flex items-center text-blue-500 mr-4">
                  <i className="fa-solid fa-edit"></i>
                  <span className="ml-1">Edit</span>
                </button>
                <button onClick={() => handleDelete(assignment.assignment_id)} className="flex items-center text-red-500">
                  <i className="fa-solid fa-trash-alt"></i>
                  <span className="ml-1">Delete</span>
                </button>
              </div>

            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
