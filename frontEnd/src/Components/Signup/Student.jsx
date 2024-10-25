import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import links from "../../connect";

const Student = () => {
    const { backEndLink } = links;

    // Update state to match backend schema
    const [user_type, setRegularOrGuest ] = useState(''); // Updated default to "Regular Student"
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState(''); // Renamed to match backend's "lname"
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [scholar_id, setScholarId] = useState(''); // Renamed to match backend's "scholar_id"
    const [department, setDepartment] = useState('');
    const [enrolled_course, setEnrolledCourse] = useState(''); // Renamed to match backend's "enrolled_course"
    const [current_year, setCurrentYear] = useState(''); // Renamed to match backend's "current_year"

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("op :: " , user_type, fname, lname, gender, email, password, scholar_id, department, enrolled_course, current_year)
        try {
            // Use updated field names to match backend schema
            console.log("in try catch")
            let response = await axios.post(`${backEndLink}/register`, {
                user_type, fname, lname, gender, email, password, scholar_id, department, enrolled_course, current_year
            }, { withCredentials: true });

            console.log("response is :: ", response);
            navigate("/");
        }
        catch (error) {
            console.log("error", error);
        }
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
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
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
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
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
                    <label className="block text-gray-700">Enrolled Course</label>
                    <input
                        type="text"
                        value={enrolled_course}
                        onChange={(e) => setEnrolledCourse(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Scholar ID</label>
                    <input
                        type="text"
                        value={scholar_id}
                        onChange={(e) => setScholarId(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Are you a Regular or Guest?</label>
                    <select
                        value={user_type}
                        onChange={(e) => setRegularOrGuest(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Option</option>
                        <option value="Regular Student">Regular Student</option>
                        <option value="Guest Student">Guest Student</option>
                    </select>
                </div>

                

                <div className="mb-4">
                    <label className="block text-gray-700">Current Year</label>
                    <input
                        type="number"
                        value={current_year}
                        onChange={(e) => setCurrentYear(e.target.value)}
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
