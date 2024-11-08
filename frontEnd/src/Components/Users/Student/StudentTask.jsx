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
    <div style={{ width: "100%" }} className="max-w-4xl mx-auto p-4">
      <nav className="flex space-x-4 border-b pb-2 mb-4">
        <div
          onClick={() => handleTabClick("")}
          className={`text-blue-700 cursor-pointer ${
            activeTab === "" ? "border-b-2 border-blue-600 pb-1" : ""
          }`}
        >
          Stream
        </div>
        <div
          onClick={() => handleTabClick("attendence")}
          className={`text-blue-700 cursor-pointer ${
            activeTab === "attendence" ? "border-b-2 border-blue-600 pb-1" : ""
          }`}
        >
          Attendance
        </div>
        <div
          onClick={() => handleTabClick("allStudents")}
          className={`text-blue-700 cursor-pointer ${
            activeTab === "allStudents" ? "border-b-2 border-blue-600 pb-1" : ""
          }`}
        >
          ClassMates
        </div>
      </nav>

      <Routes>
        {/* Define the updated routes to match paths */}
        <Route path="/:id" element={<Streams />} />
        <Route path="/attendence/:id" element={<Attendence />} />
        <Route path="/allStudents/:id" element={<AllStudents />} />
      </Routes>
    </div>
  );
}
