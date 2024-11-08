import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAssignment from "./CreateAssignment";
import axios from "axios";
import connectJs from "../../../connect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ProfessorDashBoard() {
  const [isAssignmentVisible, setAssignmentVisible] = useState(false);
  const { backEndLink } = connectJs;
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getClass = async () => {
      let email = JSON.parse(localStorage.getItem("userInfo")).email;
      try {
        let response = await axios.post(
          `${backEndLink}/fetchClassRoomP`,
          {
            email,
          },
          { withCredentials: true }
        );
        setCourses(response.data);
        console.log("course array :: ",response.data);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };
    getClass();
  }, []);

  const handleClass = (class_id , subject_name) => {
    sessionStorage.setItem("currentSubject" , subject_name);
    navigate(`/ProfessorView/professorTask/${class_id}`);
  };

  const toggleAssignmentForm = () => {
    setAssignmentVisible(!isAssignmentVisible);
  };

  const handleDeleteCourse = async (class_id) => {
    try {
      setCourses(courses.filter((course) => course.class_id !== class_id));
      await axios.post(
        `${backEndLink}/deleteClassroom`,
        {
          class_id,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log("Error deleting course:", error);
    }
  };

  const copyCourseId = async (class_id) => {
    try {
      await navigator.clipboard.writeText(class_id);
      toast.success(`Course ID - (${class_id}) copied to clipboard!`, { autoClose: 1500 });
    } catch (error) {
      toast.error("Failed to copy Course ID.");
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-100" style={{ minHeight: "100vh" }}>
      <ToastContainer />
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-blue-700">Classes</h1>
        <button
          onClick={toggleAssignmentForm}
          className="bg-blue-700 text-white rounded-full px-5 py-2 shadow-lg hover:bg-blue-600 transition duration-200"
        >
          + Create Class
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <div
            style={{ boxShadow: "0px 0px 10px gray" }}
            key={index}
            onClick={() => handleClass(course.class_id, course.subject_name)}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer"
          >
            <div
              className="p-6 border-b"
              style={{ backgroundColor: "#f1f5f9" }}
            >
              <h2 className="text-lg font-semibold text-blue-800 mb-2">
                {course.subject_name}
              </h2>
              <p className="text-sm text-gray-600">
                Year: {course.year || "N/A"}
              </p>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-1">
                <strong>Course:</strong> {course.course[0]}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Department:</strong> {course.department[0]}
              </p>
              <p className="text-blue-500 font-semibold">
                {course.isindividual ? "Individual" : "Combined"}
              </p>
            </div>
            <div className="flex justify-between p-4 border-t bg-gray-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyCourseId(course.class_id);
                }}
                className="text-blue-500 hover:text-blue-700 transition duration-200"
                title="Copy Course ID"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCourse(course.class_id);
                }}
                className="text-red-500 hover:text-red-600 transition duration-200"
                title="Delete Course"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAssignmentVisible && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-10 bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
          <CreateAssignment
            setAssignmentVisible={setAssignmentVisible}
            setCourses={setCourses}
          />
        </div>
      )}
      <div
        className={`${isAssignmentVisible ? "block" : "hidden"
          } fixed inset-0 bg-black opacity-30`}
        onClick={toggleAssignmentForm}
      ></div>
    </main>
  );
}
