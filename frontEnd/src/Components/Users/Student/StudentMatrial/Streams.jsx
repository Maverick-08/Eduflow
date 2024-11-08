import React, { useState, useEffect } from "react";
import connectJs from "../../../../connect";
import axios from "axios";

export default function Streams() {
  const [studentClassInfo] = useState(JSON.parse(sessionStorage.getItem("studentClassInfo")));
  const [streams, setStream] = useState([]);

  useEffect(() => {
    const getStreams = async () => {
      const { backEndLink } = connectJs;
      const path = window.location.pathname;
      const classString = path.split("/");
      const classID = classString[classString.length - 1];
      try {
        let response = await axios.get(`${backEndLink}/uploadedAssignment/${classID}`, {
          withCredentials: true
        })
        console.log(response);
        setStream(response.data.data); // Store the data fetched from the backend
      }
      catch (error) {
        console.log(error);
      }
    }
    getStreams();
  }, [])

  function formatDateToReadable(dateStr) {
    const date = new Date(dateStr);
  
    // Format the date in the desired format: Day Month Year (e.g., 19 November 2024)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-blue-600 rounded-lg text-white p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{studentClassInfo.subject_name}</h1>
            <p className="text-lg">Professor {studentClassInfo.professor_name}</p>
          </div>
          <div>
            <i style={{ fontSize: "60px" }} className=" bg-white p-3 rounded-full text-blue-500 fa-brands fa-google-scholar"></i>
          </div>
        </div>
        <div className="p-4 flex space-x-4">
          <div className="w-3/4">
            <div className="bg-white shadow rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search Material"
                  className="w-full border border-blue-300 rounded-lg p-2"
                />
              </div>
            </div>

            {/* Map through the streams data to display assignment posts */}
            {streams.map((assignment, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-file-alt text-blue-700"></i>
                  <div className="flex-grow">
                    <p className="font-medium">
                      {studentClassInfo.professor_name} posted a new assignment: {assignment.title}
                    </p>
                    <p className="text-blue-700 text-sm">Deadline: {formatDateToReadable(assignment.deadline)}</p>
                    <p className="text-blue-700 text-sm">Grade: {assignment.grade}</p>
                    <p className="text-blue-700 text-sm">Instructions: {assignment.instruction}</p>
                  </div>
                  {/* If documentUrl exists, show a link */}
                  {assignment.documentUrl && (
                    <a
                      href={assignment.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 ml-auto"
                    >
                      View Document
                    </a>
                  )}
                  <i className="fas fa-ellipsis-v text-blue-700 ml-auto"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
