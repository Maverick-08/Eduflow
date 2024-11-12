import React from 'react';
import { Routes, Route } from "react-router-dom";
import StudentNavbar from './StudentNavbar';
import StudentDashBoard from './StudentDashBoard';
import StudentTask from './StudentTask';
import StudentAttendance from './StudentAttendance';
import TimeTable from './TimeTable';

export default function StudentStore() {
    return (
        <div style={{display : "flex"}}>
            <div>
                <StudentNavbar />
            </div>

            <div style={{ width: "100%" }} >
                <Routes>
                    <Route path="/" element={<StudentDashBoard />} />
                    <Route path="/studentTasks/*" element={<StudentTask />} />
                    <Route path="/studentAttendance/*" element={<StudentAttendance/>}/>
                    <Route path="/timeTable/*" element={<TimeTable/>}/>
                </Routes>
            </div>
        </div>
    );
}
