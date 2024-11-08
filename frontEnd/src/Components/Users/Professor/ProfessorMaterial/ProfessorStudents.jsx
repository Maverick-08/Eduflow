import React, { useEffect, useState } from 'react';
import connectJs from "../../../../connect";
import axios from "axios";

export default function ProfessorStudents() {
    const [student, setStudents] = useState([]);
    const [image, setImage] = useState("https://placehold.co/40x40");

    useEffect(() => {
        const getStudents = async () => {
            const path = window.location.pathname;
            const classString = path.split("/");
            const classID = classString[classString.length - 1];
            const { backEndLink } = connectJs;
            try {
                let response = await axios.post(`${backEndLink}/getPeople`, { class_id: classID }, {
                    withCredentials: true
                });
                setStudents(response.data.students);
            } catch (error) {
                console.log(error);
            }
        };
        getStudents();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h2 className="text-3xl font-semibold text-blue-600">Classmates</h2>
                <span className="text-gray-500 font-medium">{student && student.length ? `${student.length} Students` : "No students"}</span>
            </div>
            <ul className="space-y-4">
                {student && student.length ? (
                    student.map((student, index) => (
                        <li key={index} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out">
                            <img src={image} alt={`Profile picture of ${student.name}`} className="w-12 h-12 rounded-full mr-4 border border-gray-300" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-700">{student.name}</h3>
                                <p className="text-sm text-gray-500">SCHOLAR ID: {student.scholar_id}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <div className="text-center text-gray-600 mt-6">
                        No students in class
                    </div>
                )}
            </ul>
        </div>
    );
}
