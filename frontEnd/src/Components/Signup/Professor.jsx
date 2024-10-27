import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import links from "../../connect";

const Professor = () => {
    const { backEndLink } = links;
    // fname VARCHAR(25) NOT NULL,
    // lname VARCHAR(25) NOT NULL,
    // gender VARCHAR(6) NOT NULL,
    // email VARCHAR(50) PRIMARY KEY,
    // user_password VARCHAR(15) NOT NULL,
	// user_type VARCHAR(15) NOT NULL,
	// experience_level VARCHAR(20) NOT NULL,
	// department TEXT[],
    // States for form fields
    const [email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [department, setMobile] = useState('');
    const [experience_level, setExperienceLevel] = useState(''); // New state for experience level
    const [user_type, setRegularOrGuest] = useState('');   // New state for regular or guest

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log({ email, user_password, fname, lname, gender, department, user_type, experience_level });
        e.preventDefault();
        try {
            // Make the request with the new fields
            let response = await axios.post(`${backEndLink}/register`, {
                email, password : user_password, fname, lname, gender, department, user_type, experience_level  // Added user_type
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
                    <label className="block text-gray-700">Department</label>
                    <input
                        type="text"
                        value={department}
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
                        type="user_password"
                        value={user_password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-purple-600 focus:outline-none"
                    />
                </div>

                {/* Experience Level Dropdown */}
                <div className="mb-4">
                    <label className="block text-gray-700">Experience Level</label>
                    <select
                        value={experience_level}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Experience Level</option>
                        <option value="HOD">HOD</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="PhD">PhD</option>
                        <option value="Professor">Professor</option>
                    </select>
                </div>

                {/* Regular or Guest Dropdown */}
                <div className="mb-4">
                    <label className="block text-gray-700">User Type</label>
                    <select
                        value={user_type}
                        onChange={(e) => setRegularOrGuest(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select User Type</option>
                        <option value="Faculty Member">Faculty Member</option>
                        <option value="Guest Lecturer">Guest Lecturer</option>
                    </select>
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

export default Professor;
