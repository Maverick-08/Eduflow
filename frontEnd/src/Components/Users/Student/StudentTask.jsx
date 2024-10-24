import React, { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Streams from './StudentMatrial/Streams';
import Assignments from './StudentMatrial/Assignments';
import Attendence from './StudentMatrial/Attendence';

export default function StudentTask() {
    const navigate = useNavigate();
    
    // State to keep track of the active tab
    const [activeTab, setActiveTab] = useState("stream");

    const handleTabClick = (tab) => {
        setActiveTab(tab); // Set the active tab
        navigate(`/StudentView/studentTasks/${tab}`); // Navigate to the respective tab
    };

    return (
        <div style={{ width: "100%" }} className="max-w-4xl mx-auto p-4">
            <nav className="flex space-x-4 border-b pb-2 mb-4">
                <div
                    onClick={() => handleTabClick("")}
                    className={`text-purple-600 cursor-pointer ${activeTab === "" ? "border-b-2 border-purple-600 pb-1" : ""}`}>
                    Material
                </div>
                <div
                    onClick={() => handleTabClick("assignment")}
                    className={`text-purple-600 cursor-pointer ${activeTab === "assignment" ? "border-b-2 border-purple-600 pb-1" : ""}`}>
                    Assignment
                </div>
                <div
                    onClick={() => handleTabClick("attendence")}
                    className={`text-purple-600 cursor-pointer ${activeTab === "attendence" ? "border-b-2 border-purple-600 pb-1" : ""}`}>
                    Attendence
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Streams />} />
                <Route path="/assignment" element={<Assignments />} />
                <Route path="/attendence" element={<Attendence />} />
            </Routes>
        </div>
    );
}
