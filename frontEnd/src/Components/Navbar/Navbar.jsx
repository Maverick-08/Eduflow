import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import links from "../../connect";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../state/user";
import connectJs from "../../connect";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useRecoilValue(userAtom);

  // const [userInfo, setuserInfo] = useState({});
  const { backEndLink } = links;
  // const [ifLoggedIn, setifLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userType, setUsertype] = useState("");
  const dropdownRef = useRef(null);

  const handleNaviagtion = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);
    if (userInfo && userInfo.email) {
      let email = userInfo.email;
      if (email.includes("prof.manit.ac.in")) {
        navigate("/professorView");
      } else {
        navigate("/studentView");
      }
    } else {
      navigate("/login");
    }
  };

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

  const handleUserNav = () => {
    if (user.user_type.includes("Student")) {
      navigate("/studentView");
      return;
    }
    navigate("/professorView");
  };

  const handleLogout = async () => {
    const { backEndLink } = connectJs;
    try {
      let response = await axios.get(`${backEndLink}/logout`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.clear();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-700 text-white p-2 rounded"></div>
          <span
            onClick={handleNaviagtion}
            className="cursor-pointer text-xl font-bold"
          >
            EduFlow
          </span>
        </div>
        {user.isAuthenticated ? (
          <section className="flex items-center justify-center space-x-4">
            <p onClick={handleNaviagtion} className="text-2x pr-4">
              Welcome &nbsp;
              <span className="text-blue-700 font-medium cursor-pointer">
                {user.fname}
              </span>
            </p>
            <button
              onClick={handleLogout}
              className="bg-blue-700 p-2 rounded-md text-white"
            >
              Logout
            </button>
          </section>
        ) : (
          <section className="relative flex items-center justify-center space-x-4">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className=""
            >
              Login
            </button>
            <button
              onClick={handleSignupClick}
              className="bg-blue-700 text-white px-3 py-1 rounded"
            >
              Sign Up
            </button>

            {showDropdown && (
              <div
                ref={dropdownRef}
                style={{ marginTop: "9.6rem" }}
                className="absolute right-0 mt-40 w-48 bg-white border rounded shadow-lg"
              >
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => navigate("/signup/professor")}
                >
                  Professor
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => navigate("/signup/student")}
                >
                  Student
                </button>
              </div>
            )}
          </section>
        )}
      </nav>
    </>
  );
}
