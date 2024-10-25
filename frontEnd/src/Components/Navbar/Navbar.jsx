import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import links from "../../connect";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [userInfo, setuserInfo] = useState({});
    const { backEndLink } = links;
    const [ifLoggedIn, setifLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const checkIfLoggedIn = async () => {
            try {
                let response = await axios.get(`${backEndLink}/user/getInfo`, {
                    withCredentials: true
                });
                console.log("response is  ", response);
                setifLoggedIn(true);
                setuserInfo(response);
            } catch (error) {
                console.log("error :: ", error);
            }
        }
        checkIfLoggedIn();
    }, [location]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false); // Close the dropdown
            }
        };

        // Add event listener for clicks
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Remove event listener on cleanup
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    // Toggle dropdown
    const handleSignupClick = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <>
            <nav className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                    <div className="bg-purple-600 text-white p-2 rounded">
                    </div>
                    <span onClick={() => { navigate("/") }} className="cursor-pointer text-xl font-bold">
                        EduFlow
                    </span>
                </div>
                {
                    ifLoggedIn ?
                        <section className='flex items-center justify-center space-x-4'>
                            <button onClick={() => { navigate("/login") }} className=''>
                                Welcome Ankit
                            </button>
                        </section>
                        :
                        <section className='relative flex items-center justify-center space-x-4'>
                            <button onClick={() => { navigate("/login") }} className=''>
                                Login
                            </button>
                            <button onClick={handleSignupClick} className='bg-purple-600 text-white px-3 py-1 rounded'>
                                Sign Up
                            </button>

                            {showDropdown && (
                                <div ref={dropdownRef} style={{ "marginTop": "9.6rem" }} className='absolute right-0 mt-40 w-48 bg-white border rounded shadow-lg'>
                                    <button
                                        className='block w-full text-left px-4 py-2 hover:bg-gray-200'
                                        onClick={() => navigate("/signup/professor")}>
                                        Professor
                                    </button>
                                    <button
                                        className='block w-full text-left px-4 py-2 hover:bg-gray-200'
                                        onClick={() => navigate("/signup/student")}>
                                        Student
                                    </button>
                                </div>
                            )}
                        </section>
                }
            </nav>
        </>
    );
}
