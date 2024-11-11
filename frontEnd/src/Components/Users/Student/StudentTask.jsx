import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Streams from "./StudentMatrial/Streams";
import Attendence from "./StudentMatrial/Attendence";
import AllStudents from "./StudentMatrial/AllStudents";

export default function StudentTask() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stream");

  const handleTabClick = (tab) => {
    const path = window.location.pathname;
    const classString = path.split("/");
    const classID = classString[classString.length - 1];
    setActiveTab(tab);

    const newPath = tab
      ? `/StudentView/studentTasks/${tab}/${classID}`
      : `/StudentView/studentTasks/${classID}`;
    navigate(newPath);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 w-full">
      <nav className="flex justify-center space-x-8 border-b pb-3 mb-6 text-lg font-semibold">
        <div
          onClick={() => handleTabClick("")}
          className={`cursor-pointer ${
            activeTab === "" ? "border-b-2 border-blue-600 text-blue-700" : "text-gray-500"
          } hover:text-blue-700 transition duration-150`}
        >
          Stream
        </div>
        {/* Uncomment Attendance tab when needed */}
        {/* <div
          onClick={() => handleTabClick("attendence")}
          className={`cursor-pointer ${
            activeTab === "attendence" ? "border-b-2 border-blue-600 text-blue-700" : "text-gray-500"
          } hover:text-blue-700 transition duration-150`}
        >
          Attendance
        </div> */}
        <div
          onClick={() => handleTabClick("allStudents")}
          className={`cursor-pointer ${
            activeTab === "allStudents" ? "border-b-2 border-blue-600 text-blue-700" : "text-gray-500"
          } hover:text-blue-700 transition duration-150`}
        >
          Classmates
        </div>
      </nav>

      <Routes>
        <Route path="/:id" element={<Streams />} />
        {/* <Route path="/attendence/:id" element={<Attendence />} /> */}
        <Route path="/allStudents/:id" element={<AllStudents />} />
      </Routes>
    </div>
  );
}
