import React from 'react'
import ProfessorDashBoard from './ProfessorDashBoard'
import ProfessMaterial from './ProfessorMaterial/ProfessMaterial';
import ProfessorAssignment from './ProfessorMaterial/ProfessorAssignment';
import { Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom";
export default function ProfessorNavbar() {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ display: "flex" }}>
                <div>
                    <aside style={{ height: "100vh" }} className="w-16 bg-white h-screen shadow-md">
                        <div className="flex flex-col items-center py-4">
                            <i onClick={() => { navigate("/ProfessorView") }} className="fas fa-home text-gray-600 text-1xl mb-6"></i>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    )
}
