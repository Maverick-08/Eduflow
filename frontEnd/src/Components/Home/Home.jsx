import React from 'react'
import { useNavigate } from 'react-router-dom';
import homeImage from "./homeImage.png"
export default function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <main className="flex justify-center align-center mt-12 p-8">
                <div className="max-w-lg">
                    <h1 className="text-6xl font-bold text-gray-900">Smooth journey with powerful management</h1>
                    <p className="text-gray-700 mt-10">Unlock your academic potential with a smart platform designed to streamline your studies and enhance your productivity effortlessly!.</p>
                    <div className="mt-6 flex items-center space-x-4">
                        <button className="bg-purple-600 text-center text-white px-44 py-2 rounded" onClick={()=>navigate("/login")}>Get Started Now!</button>
                    </div>
                </div>
                <div>
                    <img src={homeImage} style={{ width: "400px", height: "400px" }} alt="perons taking mock interview" />
                </div>
            </main>
        </div>
    );
}
