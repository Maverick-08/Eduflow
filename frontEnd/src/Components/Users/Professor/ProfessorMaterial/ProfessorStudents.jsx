import React from 'react'

export default function ProfessorStudents() {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">Teachers</h1>
                <div className="flex items-center space-x-4">
                    <img src="https://placehold.co/40x40" alt="Teacher's profile picture" className="w-10 h-10 rounded-full" />
                    <span>Sugandha Gupta</span>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Classmates</h2>
                    <span className="text-gray-600">41 students</span>
                </div>
                <ul className="space-y-4">
                    {[
                        { name: "ARYAN 43", img: "https://placehold.co/40x40" },
                        { name: "PRIYANKA GOYAL 010", img: "https://placehold.co/40x40" },
                        { name: "PRATEEK NAITHANI 204001", img: "https://placehold.co/40x40" },
                        { name: "SHOURYA RANA 204004", img: "https://placehold.co/40x40" },
                        { name: "AKSHAY KUMAR 204005", img: "https://placehold.co/40x40" },
                        { name: "JAGRITI MALHOTRA 204006", img: "https://placehold.co/40x40" },
                        { name: "YASH MADHIWAL 204009", img: "https://placehold.co/40x40" },
                        { name: "GURPREET SINGH RANA 204011", img: "https://placehold.co/40x40" },
                        { name: "NAMAN SETIA 204012", img: "https://placehold.co/40x40" }
                    ].map((student, index) => (
                        <li key={index} className="flex items-center space-x-4">
                            <img src={student.img} alt={`Profile picture of ${student.name}`} className="w-10 h-10 rounded-full" />
                            <span>{student.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
