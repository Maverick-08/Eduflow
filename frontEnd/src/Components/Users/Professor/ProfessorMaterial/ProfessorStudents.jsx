import React, { useEffect, useState } from 'react'
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
            console.log(classID);
            try {
                let response = await axios.post(`${backEndLink}/getPeople`, { class_id: classID }, {
                    withCredentials: true
                })
                console.log(response);
                setStudents(response.data.students);
            }
            catch (error) {
                console.log(error);
            }
        }
        getStudents();
    }, [])
    return (
        <div className="max-w-4xl mx-auto p-4">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Classmates</h2>
                    <span className="text-gray-600">{student && student.length ? student.length : ""} Students</span>
                </div>
                <ul className="space-y-4">
                    {
                        student && student.length ? 
                        <div>
                            {
                                student.map((student, index) => (
                                    <>
                                    <li key={index} className="flex items-center space-x-4">
                                        <img src={image} alt={`Profile picture of ${student.name}`} className="w-10 h-10 rounded-full" />
                                        {student.name + " (" + student.scholar_id + ")"}
                                    </li>
                                    <br />
                                    </>
                                ))
                            }
                        </div>
                        :
                        <div>
                            No student in class
                        </div>
                    }
                </ul>
            </div>
        </div>
    );
}
