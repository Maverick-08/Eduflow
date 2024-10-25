import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import links from "../../connect";

const Professor = () => {
    const { backEndLink } = links;

    // States for form fields
    const [email, setEmail] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState('');
    const [userType, setUserType] = useState("Professor");
    const [experienceLevel, setExperienceLevel] = useState(''); // New state for experience level
    const [regularOrGuest, setRegularOrGuest] = useState('');   // New state for regular or guest

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make the request with the new fields
            let response = await axios.post(`${backEndLink}/signup`, {
                email, password, fname, lastname, gender, mobile, userType, experienceLevel, regularOrGuest  // Added regularOrGuest
            }, { withCredentials: true });

            console.log("response is :: ", response);
            navigate("/");
        }
        catch (error) {
            console.log("error", error);
        }
        console.log({ email, password, fname, lastname, gender, mobile, userType, experienceLevel, regularOrGuest });
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

                {/* Experience Level Dropdown */}
                <div className="mb-4">
                    <label className="block text-gray-700">Experience Level</label>
                    <select
                        value={experienceLevel}
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
                        value={regularOrGuest}
                        onChange={(e) => setRegularOrGuest(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select User Type</option>
                        <option value="Regular">Faculty Member</option>
                        <option value="Guest">Guest Lecturer</option>
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
