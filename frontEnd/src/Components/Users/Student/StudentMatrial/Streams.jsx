import React, { useState, useEffect } from "react";
import connectJs from "../../../../connect";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function Streams() {
  const [studentClassInfo] = useState(
    JSON.parse(sessionStorage.getItem("studentClassInfo"))
  );
  const [streams, setStream] = useState([]);
  const [material, setMaterial] = useState([]);
  const [isSubmitOverlayVisible, SetSubmitOverlayVisible] = useState(false);
  const [submitOverlayHeight, setSubmitOverlayHeight] = useState(0);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const getStreams = async () => {
      const { backEndLink } = connectJs;
      const path = window.location.pathname;
      const classString = path.split("/");
      const classID = classString[classString.length - 1];
      try {
        let response = await axios.get(
          `${backEndLink}/uploadedAssignment/${classID}`,
          {
            withCredentials: true,
          }
        );
        console.log("-----Assignment------");
        console.log(response);
        setStream(response.data.data); // Store the data fetched from the backend
      } catch (error) {
        console.log(error);
      }
    };
    getStreams();
  }, []);

  useEffect(() => {
    const getStreams = async () => {
      const { backEndLink } = connectJs;
      const path = window.location.pathname;
      const classString = path.split("/");
      const classID = classString[classString.length - 1];
      try {
        let response = await axios.post(
          `${backEndLink}/getUploadedMaterial`,
          {
            class_id: classID,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);
        setMaterial(response.data.data); // Store the data fetched from the backend
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStreams();
  }, []);

  function submitAssignment() {
    SetSubmitOverlayVisible(false);
  }

  function submitOverlayVisibility(element, assignment) {
    // console.log("Submit Overlay Visibility");
    // console.log(element);
    setSubmitOverlayHeight(element.pageY - 50);
    setSelectedAssignment(assignment);
    // console.log("---selected----")
    // console.log(selectedAssignment);
    SetSubmitOverlayVisible(true);
  }

  function formatDateToReadable(dateStr) {
    const date = new Date(dateStr);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <>
      <div className="bg-white p-4 shadow rounded-lg overflow-hidden">
        <ToastContainer />
        <div className="bg-blue-600 rounded-lg text-white p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {studentClassInfo.subject_name}
            </h1>
            <p className="text-lg">
              Professor {studentClassInfo.professor_name}
            </p>
          </div>
          <div>
            <i
              style={{ fontSize: "60px" }}
              className=" bg-white p-3 rounded-full text-blue-500 fa-brands fa-google-scholar"
            ></i>
          </div>
        </div>
        <div className="p-4 flex space-x-4">
          <div className="w-3/4">
            {/* Map through the streams data to display assignment posts */}
            {streams.map((assignment, index) => (
              <div
                key={index}
                onClick={(element) =>
                  submitOverlayVisibility(element, assignment)
                }
                style={{ width: "50rem" }}
                className="bg-white shadow rounded-lg p-4 mb-4 cursor-pointer border-2 hover:border-blue-300"
              >
                <div className="flex items-center space-x-2">
                  <i className="fas fa-file-alt text-blue-700"></i>
                  <div className="flex-grow">
                    <p className="font-medium">
                      New Assignment: {assignment.title}
                    </p>
                    <p className="text-blue-700 text-sm">
                      Deadline: {formatDateToReadable(assignment.deadline)}
                    </p>
                    <p className="text-blue-700 text-sm">
                      Grade: {assignment.grade}
                    </p>
                    <p className="text-blue-700 text-sm">
                      Instructions: {assignment.instruction}
                    </p>
                  </div>

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

            {material.map((material, index) => (
              <div
                key={index}
                style={{ width: "50rem" }}
                className="bg-white shadow rounded-lg p-4 mb-4"
              >
                <div className="flex items-center space-x-2">
                  <i className="fas fa-file-alt text-blue-700"></i>
                  <div className="flex-grow">
                    <p className="font-medium">
                      New Material: {material.title}
                    </p>
                    <p className="text-blue-700 text-sm">
                      Instructions: {material.instruction}
                    </p>
                  </div>

                  {material.documentUrl && (
                    <a
                      href={material.documentUrl}
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
            {isSubmitOverlayVisible && (
              <div
                style={{
                  position: "fixed",
                  top: `${submitOverlayHeight}px`,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 10,
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                  width: "90%",
                  maxWidth: "600px",
                }}
              >
                <SubmitAssignmentComponent
                  selectedAssignment={selectedAssignment}
                  SetSubmitOverlayVisible={SetSubmitOverlayVisible}
                  classId = {studentClassInfo.class_id}
                />
              </div>
            )}
            <div
              className={`${
                isSubmitOverlayVisible ? "block" : "hidden"
              } fixed inset-0 bg-black opacity-30`}
              onClick={() => SetSubmitOverlayVisible(false)}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

function SubmitAssignmentComponent({
  SetSubmitOverlayVisible,
  selectedAssignment,
  classId
}) {
  const [submissionFile, setSubmissionFile] = useState(null);
  // console.log("----Selected Assignment---")
  // console.log(selectedAssignment)
  const handleFile = (e) => setSubmissionFile(e.target.files[0]);

  const handleFileSubmission = async function () {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    let isLate = false;
    const deadline = new Date(selectedAssignment.deadline);
    const currentTimestamp = new Date();
    if(currentTimestamp > deadline){
      isLate = true;
    }
    
    const formData = new FormData();
    formData.append("class_id", classId);
    formData.append("assignment_id", selectedAssignment.assignment_id);
    formData.append("scholar_id", userData.scholar_id);
    formData.append("fname", userData.fname);
    formData.append("lname", userData.lname);
    formData.append("isLate", isLate);
    formData.append("pdfDocument", submissionFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/submitAssignment",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("----RESPONSE----")
      console.log(response.data)
      toast.success(response.data.msg)
    } catch (err) {
      toast.error("Failed to upload assignment");
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <span
          onClick={() => SetSubmitOverlayVisible(false)}
          className="cursor-pointer border-2 mb-4 px-3 py-1 rounded-full"
        >
          X
        </span>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFile}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
        <button onClick={handleFileSubmission} className="px-4 py-2 rounded-md bg-green-400 text-gray-800">
          Submit
        </button>
      </div>
    </div>
  );
}
