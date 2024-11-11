import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProfessMaterial from "./ProfessorMaterial/ProfessMaterial";
import ProfessorAssignment from "./ProfessorMaterial/ProfessorAssignment";
import ProfessorStudents from "./ProfessorMaterial/ProfessorStudents";
import ProfessorStreams from "./ProfessorMaterial/ProfessorStreams";
import AttendancePage from "./ProfessorMaterial/AttendancePage";

export default function ProfessorTask() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stream");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const path = window.location.pathname;
    const classString = path.split("/");
    const classID = classString[classString.length - 1];
    const newPath = tab
      ? `/ProfessorView/professorTask/${tab}/${classID}`
      : `/ProfessorView/professorTask/${classID}`;
    navigate(newPath);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 w-full">
      <nav className="flex justify-center space-x-6 border-b pb-3 mb-6 text-lg font-semibold">
        <div
          onClick={() => handleTabClick("")}
          className={`cursor-pointer ${activeTab === "" ? "border-b-2 border-blue-600 text-blue-700" : "text-gray-500"
            } hover:text-blue-700 transition duration-200`}
        >
          Streams
        </div>
        <div
          onClick={() => handleTabClick("professorMaterial")}
          className={`cursor-pointer ${activeTab === "professorMaterial" ? "border-b-2 border-blue-600 text-blue-700" : "text-gray-500"
            } hover:text-blue-700 transition duration-200`}
        >
          Material
        </div>
        <div
          onClick={() => handleTabClick("assignment")}
          className={`cursor-pointer ${activeTab === "assignment" ? "border-b-2 border-blue-600 text-blue-700" : "text-gray-500"
            } hover:text-blue-700 transition duration-200`}
        >
          Assignment
        </div>
        <div
          onClick={() => handleTabClick("studentsInClass")}
          className={`cursor-pointer ${activeTab === "studentsInClass" ? "border-b-2 border-blue-600 text-blue-700" : "text-gray-500"
            } hover:text-blue-700 transition duration-200`}
        >
          Students
        </div>
        <div
          onClick={() => handleTabClick("attendancePage")}
          className={`cursor-pointer ${activeTab === "attendancePage" ? "border-b-2 border-blue-600 text-blue-700" : "text-gray-500"
            } hover:text-blue-700 transition duration-200`}
        >
          Attendance
        </div>
      </nav>

      <Routes>
        <Route path="/:id" element={<ProfessorStreams />} />
        <Route path="/professorMaterial/:id" element={<ProfessMaterial />} />
        <Route path="/assignment/:id" element={<ProfessorAssignment />} />
        <Route path="/studentsInClass/:id" element={<ProfessorStudents />} />
        <Route path="/attendancePage/:id" element={<AttendancePage />} />
      </Routes>
    </div>
  );
}
