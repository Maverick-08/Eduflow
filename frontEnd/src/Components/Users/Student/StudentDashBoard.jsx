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
          {
            email,
          },
          { withCredentials: true }
        );
        console.log("op :: ", response.data);
        setClasses(response.data);
      } catch (error) {
        console.log("Error fetching classes:", error);
      }
    };
    getClass();
  }, []);

  const handleClass = (class_id) => {
    console.log("class_id is :: ", class_id);
    navigate(`/StudentView/studentTasks/${class_id}`);
  };

  const toggleAssignmentForm = () => {
    setAssignmentVisible(!isAssignmentVisible);
  };

  // Handle course deletion
  const handleLeaveClass = async (class_id) => {
    let email = JSON.parse(localStorage.getItem("userInfo")).email;
    try {
      setClasses(classes.filter((course) => course.class_id !== class_id));
      await axios.post(
        `${backEndLink}/leaveClassroom`,
        {
          classId: class_id,
          email,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log("Error deleting course:", error);
    }
  };

  return (
    <main className="flex-1 p-6" style={{ height: "100vh" }}>
      <ToastContainer />
      <header className="flex items-center justify-start mb-6">
        <h1 className="text-2xl font-semibold mr-6">Classes</h1>
        <h1
          onClick={toggleAssignmentForm}
          style={{
            border: "2px solid black",
            borderRadius: "100px",
            padding: "0px 10px 4px 10px",
            cursor: "pointer",
          }}
          className="text-2xl font-semibold"
        >
          +
        </h1>
      </header>
      {classes.length == 0 ? (
        <>
          <h1>
            <center className="font-bold text-slate-700 text-xl ">
              No classes joined
            </center>
          </h1>
        </>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {classes.map((course, index) => (
            <div
              onClick={() => handleClass(course.class_id)}
              key={index}
              style={{ cursor: "pointer" }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className={`p-4 ${course.bgColor} text-black relative`}>
                <h2 className="text-blue-700 text-lg font-semibold">
                  Class : {course.subject_name}
                </h2>
                {course.year && <p className="text-sm">Year: {course.year}</p>}
              </div>
              <div className="p-4">
                <p className="text-gray-600">
                  Department - {course.department[0]}
                </p>
                <p className="text-blue-600">
                  {course.isindividual ? "Individual" : "Combined"}
                </p>
              </div>
              <div className="flex justify-between p-4 border-t">
                <FontAwesomeIcon
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLeaveClass(course.class_id);
                  }}
                  icon={faTrash}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {isAssignmentVisible && (
        <div
          style={{ boxShadow: "0px 0px 10px gray" }}
          className="secondSection fixed top-[15%] left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-md"
        >
          <JoinClassRoom
            setAssignmentVisible={setAssignmentVisible}
            setClasses={setClasses}
          />
        </div>
      )}
    </main>
  );
}
// Ksf6kCp
