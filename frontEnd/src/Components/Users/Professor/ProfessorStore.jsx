import React from 'react';
import { Routes, Route } from "react-router-dom";
import ProfessorNavbar from './ProfessorNavbar';
import ProfessorDashBoard from './ProfessorDashBoard';
import ProfessorTask from './ProfessorTask';

export default function ProfessorStore() {
    return (
        <div style={{display : "flex"}}>
            <div>
                <ProfessorNavbar />
            </div>

            <div style={{ width: "100%" }} >
                <Routes>
                    <Route path="/" element={<ProfessorDashBoard />} />
                    <Route path="/professorTask*" element={<ProfessorTask />} />
                </Routes>
            </div>
        </div>
    );
}
