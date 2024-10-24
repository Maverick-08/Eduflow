import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import links from "../../connect";

const Student = () => {
    const { backEndLink } = links;
    
    // Add states for new fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState('');
    const [userType, setUserType] = useState('student');
    const [department, setDepartment] = useState('');
    const [course, setCourse] = useState('');        
    const [scholarId, setScholarId] = useState('');  
    const [year, setYear] = useState('');            

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make the request with the new fields
            let response = await axios.post(`${backEndLink}/signup`, {
                email, password, fname, lastname, gender, mobile, userType, department, course, scholarId, year // Added new fields
            }, { withCredentials: true });

            console.log("response is :: ", response);
            navigate("/");
        }
        catch (error) {
            console.log("error", error);
        }
        console.log({ email, password, fname, lastname, gender, mobile, userType, department, course, scholarId, year });
    };

    return (
        <div className="flex items-center p-8 justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">Sign Up</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Mobile</label>
                    <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-purple-600 focus:outline-none"
                    />
                </div>

                {/* New fields for Department, Course, Scholar ID, and Year */}
                <div className="mb-4">
                    <label className="block text-gray-700">Department</label>
                    <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Course</label>
                    <input
                        type="text"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Scholar ID</label>
                    <input
                        type="text"
                        value={scholarId}
                        onChange={(e) => setScholarId(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Year</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
                    Sign Up
                </button>
                <div className='flex items-center justify-center mt-4'>
                    Already a user? Login here
                </div>
                <button onClick={() => { navigate("/login") }} className="mt-4 w-full bg-purple-600 text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Student;
