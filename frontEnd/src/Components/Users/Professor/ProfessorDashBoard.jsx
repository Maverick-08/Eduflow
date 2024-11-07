import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateAssignment from './CreateAssignment';
import axios from "axios";
import connectJs from '../../../connect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ProfessorDashBoard() {
    const [isAssignmentVisible, setAssignmentVisible] = useState(false);
    const { backEndLink } = connectJs;
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getClass = async () => {
            let email = JSON.parse(localStorage.getItem("userInfo")).email;
            try {
                let response = await axios.post(`${backEndLink}/fetchClassRoomP`, {
                    email
                }, { withCredentials: true });
                console.log(response.data);
                setCourses(response.data);
            } catch (error) {
                console.log("Error fetching courses:", error);
                
            }
        };
        getClass();
    }, []);

    const handleClass = (class_id) => {
        console.log(class_id);
        navigate(`/ProfessorView/professorTask/${class_id}`);
    };

    const toggleAssignmentForm = () => {
        setAssignmentVisible(!isAssignmentVisible);
    };

    // Handle course deletion
    const handleDeleteCourse = async (class_id) => {
        try {
            setCourses(courses.filter(course => course.class_id !== class_id));
            await axios.post(`${backEndLink}/deleteClassroom`, {
                class_id
            }, { withCredentials: true });
        } catch (error) {
            console.log("Error deleting course:", error);
        }
    };

    const copyCourseId = async (class_id) => {
        try {
            await navigator.clipboard.writeText(class_id);
            toast.success("Course ID copied to clipboard!");
        } catch (error) {
            toast.error("Failed to copy Course ID.");
        }
    };

    return (
        <main className="flex-1 p-6" style={{ height: "100vh" }}>
            <ToastContainer />
            <header className="flex items-center justify-start mb-6">
                <h1 className="text-2xl font-semibold mr-6">Classes</h1>
                <h1
                    onClick={toggleAssignmentForm}
                    style={{
                        border: "2px solid black",
                        borderRadius: "100px",
                        padding: "0px 10px 4px 10px",
                        cursor: "pointer"
                    }}
                    className="text-2xl font-semibold"
                >
                    +
                </h1>
            </header>
            <div className="grid grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <div
                        key={index}
                        style={{ cursor: "pointer" }}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <div onClick={() => handleClass(course.class_id)} className={`p-4 ${course.bgColor} text-black relative`}>
                            <h2 className="text-purple-600 text-lg font-semibold">Name: {course.subject_name}</h2>
                            {course.year && <p className="text-sm">Year: {course.year}</p>}
                            <div className="absolute bottom-9 right-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        copyCourseId(course.class_id);
                                    }}
                                    className="text-purple-500 hover:text-blue-700"
                                    title="Copy Course ID"
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-600">Course - {course.course[0]}</p>
                            <p className="text-gray-600">Department - {course.department[0]}</p>
                            <p className="text-blue-600">{course.isindividual ? "Individual" : "Combined"}</p>
                        </div>
                        <div className="flex justify-between p-4 border-t">
                            <i className="fas fa-clipboard text-gray-600"></i>

                            <FontAwesomeIcon className='text-red-500 hover:text-red-700' onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCourse(course.class_id);
                            }} icon={faTrash} />
                        </div>
                    </div>
                ))}
            </div>
            {isAssignmentVisible && (
                <div style={{ boxShadow: "0px 0px 10px gray" }} className="secondSection fixed top-[15%] left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-md">
                    <CreateAssignment setAssignmentVisible={setAssignmentVisible} setCourses={setCourses} />
                </div>
            )}
        </main>
    );
}
// Ksf6kCp