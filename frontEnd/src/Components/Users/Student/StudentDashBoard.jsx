import React from 'react'
import {useNavigate} from "react-router-dom"
export default function StudentDashBoard() {
    const courses = [
        { title: "Machine Learning (The...", year: "2020-2023", teacher: "Sugandha Gupta", image: "https://placehold.co/100x100", bgColor: "bg-gray-700" },
        { title: "Data Mining 2023", teacher: "Megha Ummat", image: "https://placehold.co/100x100", bgColor: "bg-purple-600" },
        { title: "B.Sc. (H) VI sem", teacher: "Neha Aggarwal", image: "https://placehold.co/100x100", bgColor: "bg-gray-500", initial: "N" },
        { title: "AI Practical Group A", year: "2020-2023", teacher: "Sugandha Gupta", image: "https://placehold.co/100x100", bgColor: "bg-purple-700" },
        { title: "Data Mining Grp A 20...", teacher: "Megha Ummat", image: "https://placehold.co/100x100", bgColor: "bg-purple-700" },
        { title: "Networks Practical", teacher: "Ushveen Kaur", image: "https://placehold.co/100x100", bgColor: "bg-gray-700" },
        { title: "Microprocessors 202...", teacher: "Neha Aggarwal", image: "https://placehold.co/100x100", bgColor: "bg-purple-600", initial: "N" },
        { title: "Microprocessor", year: "Sem V 2022", teacher: "Ushveen Kaur", image: "https://placehold.co/100x100", bgColor: "bg-purple-600" },
    ];
    const naviagte = useNavigate();
    return (
        <>
            <div className="flex">
                <main className="flex-1 p-6">
                    <header className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold">Student Dashboard</h1>
                    </header>
                    <div className="grid grid-cols-3 gap-4">
                        {courses.map((course, index) => (
                            <div onClick={()=>{naviagte("/StudentView/studentTasks")}} key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className={`p-4 bg-purple-700 text-white relative`}>
                                    <h2 className="text-lg font-semibold">{course.title}</h2>
                                    {course.year && <p className="text-sm">{course.year}</p>}
                                    <div className="absolute bottom-2 right-2">
                                        {course.image ? (
                                            <img src={course.image} alt="Teacher" className="w-10 h-10 rounded-full" />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center">{course.initial}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm">{course.teacher}</p>
                                </div>
                                <div className="flex justify-between p-4 border-t">
                                    <i className="fa-regular fa-clipboard"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    )
}
