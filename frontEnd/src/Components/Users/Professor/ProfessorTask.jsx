import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
    <div style={{ width: "100%" }} className="max-w-4xl mx-auto p-4">
      <nav className="flex space-x-4 border-b pb-2 mb-4">
        <div
          onClick={() => handleTabClick("")}
          className={`text-blue-700 cursor-pointer ${
            activeTab === "" ? "border-b-2 border-blue-600 pb-1" : ""
          }`}
        >
          Streams
        </div>
        <div
          onClick={() => handleTabClick("professorMaterial")}
          className={`text-blue-700 cursor-pointer ${
            activeTab === "professorMaterial"
              ? "border-b-2 border-blue-600 pb-1"
              : ""
          }`}
        >
          Material
        </div>
        <div
          onClick={() => handleTabClick("assignment")}
          className={`text-blue-700 cursor-pointer ${
            activeTab === "assignment"
              ? "border-b-2 border-blue-600 pb-1"
              : ""
          }`}
        >
          Assignment
        </div>
        <div
          onClick={() => handleTabClick("studentsInClass")}
          className={`text-blue-700 cursor-pointer ${
            activeTab === "studentsInClass"
              ? "border-b-2 border-blue-600 pb-1"
              : ""
          }`}
        >
          Students
        </div>
        <div
          onClick={() => handleTabClick("attendancePage")}
          className={`text-blue-700 cursor-pointer ${
            activeTab === "attendancePage"
              ? "border-b-2 border-blue-600 pb-1"
              : ""
          }`}
        >
          Attendence
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
