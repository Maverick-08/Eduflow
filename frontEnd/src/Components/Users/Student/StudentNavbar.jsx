import React from 'react';
import { useNavigate } from "react-router-dom";

export default function StudentNavbar() {
    const navigate = useNavigate();

    return (
        <>
            <aside style={{ height: "100%" }} className="w-16 bg-white h-screen shadow-md">
                <div className="flex flex-col items-center py-4">
                    <i
                        onClick={() => { navigate("/StudentView") }}
                        className="fas fa-home text-xl mb-6 cursor-pointer"
                    ></i>
                </div>
            </aside>
        </>
    );
}
