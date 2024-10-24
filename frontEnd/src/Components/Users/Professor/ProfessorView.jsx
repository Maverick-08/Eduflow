import React from 'react'
import ProfessorDashBoard from './ProfessorDashBoard'
import ProfessMaterial from './ProfessMaterial';
import ProfessorAssignment from './ProfessorAssignment';
import { Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom";
export default function ProfessorView() {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ display: "flex" }}>
                <div>
                    <aside style={{ height: "100%" }} className="w-16 bg-white h-screen shadow-md">
                        <div className="flex flex-col items-center py-4">
                            <i onClick={() => { navigate("/ProfessorView") }} className="fas fa-home text-gray-600 text-1xl mb-6"></i>
                            <i onClick={() => { navigate("/ProfessorView/addAssignment") }} class="fas fa-solid fa-list-check text-1xl mb-6"></i>
                            <i onClick={() => { navigate("/ProfessorView/addMaterial") }} class="fas fa-solid fa-book text-1xl mb-6"></i>
                        </div>
                    </aside>
                </div>
                <div style={{ width: "100%" }} >
                    <Routes>
                        <Route path="/" element={<ProfessorDashBoard />} />
                        <Route path="/addMaterial" element={<ProfessMaterial />} />
                        <Route path="/addAssignment" element={<ProfessorAssignment />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}
