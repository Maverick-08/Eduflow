import React from 'react';
import { useNavigate } from "react-router-dom";

export default function StudentNavbar() {
    const navigate = useNavigate();

    return (
        <>
            <aside style={{ height: "100vh" }} className="w-16 bg-white h-screen shadow-md">
                <div className="flex flex-col items-center py-4">
                    <i
                        onClick={() => { navigate("/StudentView") }}
                        className="fas fa-home text-blue-600 text-xl mb-6 cursor-pointer"
                    ></i>

                    <i onClick={() => { navigate("/StudentView/StudentAttendance") }}
                        className="fa-solid fa-calendar text-orange-600 text-xl mb-6 cursor-pointer"></i>

                    {/* <i onClick={() => { navigate("/StudentView/timeTable") }}
                        className="fa-solid fa-clock text-green-600 text-xl mb-6 cursor-pointer"></i> */}
                </div>
            </aside>
        </>
    );
}
