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
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const getStreams = async () => {
      const { backEndLink } = connectJs;
      const path = window.location.pathname;
      const classId = path.split("/").pop();

      const scholarId = JSON.parse(localStorage.getItem("userInfo")).scholar_id;

      const payload = { classId, scholarId };

      try {
        let response = await axios.post(
          `${backEndLink}/uploadedAssignment`,
          payload,
          {
            withCredentials: true,
          }
        );
        setStream(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStreams();
  }, []);

  useEffect(() => {
    const getMaterials = async () => {
      const { backEndLink } = connectJs;
      const path = window.location.pathname;
      const classID = path.split("/").pop();
      try {
        let response = await axios.post(
          `${backEndLink}/getUploadedMaterial/`,
          {
            class_id: classID,
          },
          {
            withCredentials: true,
          }
        );
        setMaterial(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMaterials();
  }, []);

  function submitOverlayVisibility(assignment) {
    setSelectedAssignment(assignment);
    SetSubmitOverlayVisible(true);
  }

  function formatDateToReadable(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      <div className="bg-white p-6 shadow-lg rounded-lg">
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
          <i className="text-6xl bg-white p-3 rounded-full text-blue-500 fa-brands fa-google-scholar"></i>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {streams.map((assignment, index) => (
              <div
                key={index}
                onClick={() => submitOverlayVisibility(assignment)}
                className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:border-blue-300 border-2"
              >
                <div className="flex items-start space-x-3">
                  <i className="fas fa-file-alt text-blue-700 mt-1"></i>
                  <div className="flex-grow">
                    <p className="font-medium">
                      New Assignment: {assignment.title}
                    </p>
                    <p className="text-sm text-blue-700">
                      Deadline: {formatDateToReadable(assignment.deadline)}
                    </p>
                    <p className="text-sm text-blue-700">
                      Grade: {assignment.totalGrade}
                    </p>
                    <p className="text-sm text-blue-700">
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
                </div>
              </div>
            ))}

            {material.map((material, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-file-alt text-blue-700 mt-1"></i>
                  <div className="flex-grow">
                    <p className="font-medium">
                      New Material: {material.title}
                    </p>
                    <p className="text-sm text-blue-700">
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
                </div>
              </div>
            ))}

            {isSubmitOverlayVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <SubmitAssignmentComponent
                  selectedAssignment={selectedAssignment}
                  SetSubmitOverlayVisible={SetSubmitOverlayVisible}
                  classId={studentClassInfo.class_id}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function SubmitAssignmentComponent({
  SetSubmitOverlayVisible,
  selectedAssignment,
  classId,
}) {
  const [submissionFile, setSubmissionFile] = useState(null);

  const handleFile = (e) => setSubmissionFile(e.target.files[0]);

  const handleFileSubmission = async () => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    const deadline = new Date(selectedAssignment.deadline);
    const isLate = new Date() > deadline;

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
      toast.success(response.data.msg);
    } catch (err) {
      toast.error("Failed to upload assignment");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <b className="text-lg">Submit Assignment</b>
        <button
          onClick={() => SetSubmitOverlayVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          X
        </button>
      </div>
      <div className="flex flex-col space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFile}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleFileSubmission}
          className="w-full px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
