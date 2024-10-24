import React from 'react';
import { Routes, Route } from "react-router-dom";
import StudentNavbar from './StudentNavbar';
import StudentDashBoard from './StudentDashBoard';
import StudentTask from './StudentTask';

export default function StudentStore() {
    return (
        <div style={{display : "flex"}}>
            <div>
                <StudentNavbar />
            </div>

            <div style={{ width: "100%" }} >
                <Routes>
                    <Route path="/" element={<StudentDashBoard />} />
                    <Route path="/studentTasks*" element={<StudentTask />} />
                </Routes>
            </div>
        </div>
    );
}
