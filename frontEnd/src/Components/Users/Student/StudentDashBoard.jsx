import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JoinClassRoom from "./JoinClassRoom";
import axios from "axios";
import connectJs from "../../../connect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function StudentDashboard() {
  const [isAssignmentVisible, setAssignmentVisible] = useState(false);
  const { backEndLink } = connectJs;
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getClass = async () => {
      let email = JSON.parse(localStorage.getItem("userInfo")).email;
      try {
        let response = await axios.post(
          `${backEndLink}/fetchClassRoomS`,
          { email },
          { withCredentials: true }
        );
        setClasses(response.data);
        console.log("Fetched classes:", response.data);
      } catch (error) {
        console.log("Error fetching classes:", error);
      }
    };
    getClass();
  }, []);

  const handleClass = (class_id, subject_name , professor_name) => {
    sessionStorage.setItem("studentClassInfo", JSON.stringify({class_id, subject_name , professor_name}));
    navigate(`/StudentView/studentTasks/${class_id}`);
  };

  const toggleAssignmentForm = () => {
    setAssignmentVisible(!isAssignmentVisible);
  };

  const handleLeaveClass = async (class_id) => {
    let email = JSON.parse(localStorage.getItem("userInfo")).email;
    try {
      setClasses(classes.filter((course) => course.class_id !== class_id));
      await axios.post(
        `${backEndLink}/leaveClassroom`,
        { classId: class_id, email },
        { withCredentials: true }
      );
    } catch (error) {
      console.log("Error leaving class:", error);
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
          + Join Class
        </button>
      </header>

      {classes.length === 0 ? (
        <h1 className="font-bold text-slate-700 text-xl text-center">
          No classes joined
        </h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((course, index) => (
            <div
              style={{ boxShadow: "0px 0px 10px gray" }}
              key={index}
              onClick={() => handleClass(course.class_id, course.subject_name , course.professor_name)}
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
                    handleLeaveClass(course.class_id);
                  }}
                  className="text-red-500 hover:text-red-600 transition duration-200"
                  title="Leave Class"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isAssignmentVisible && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-10 bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
          <JoinClassRoom
            setAssignmentVisible={setAssignmentVisible}
            setClasses={setClasses}
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
  