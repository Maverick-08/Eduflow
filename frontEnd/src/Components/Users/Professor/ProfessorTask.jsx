import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProfessMaterial from './ProfessorMaterial/ProfessMaterial';
import ProfessorAssignment from './ProfessorMaterial/ProfessorAssignment';

export default function ProfessorTask() {
    const location = useLocation();
    const navigate = useNavigate();
    const { classId } = location.state || {}; // Retrieve classId from location.state

    console.log("class id :: ", classId);
    const [activeTab, setActiveTab] = useState("stream");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        navigate(`/ProfessorView/professorTask/${tab}`, { state: { classId } });
    };

    return (
        <div style={{ width: "100%" }} className="max-w-4xl mx-auto p-4">
            <nav className="flex space-x-4 border-b pb-2 mb-4">
                <div
                    onClick={() => handleTabClick("")}
                    className={`text-purple-600 cursor-pointer ${activeTab === "" ? "border-b-2 border-purple-600 pb-1" : ""}`}
                >
                    Material
                </div>
                <div
                    onClick={() => handleTabClick("assignment")}
                    className={`text-purple-600 cursor-pointer ${activeTab === "assignment" ? "border-b-2 border-purple-600 pb-1" : ""}`}
                >
                    Assignment
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<ProfessMaterial classId={classId} />} />
                <Route path="/assignment" element={<ProfessorAssignment classId={classId} />} />
            </Routes>
        </div>
    );
}
