import React, { useState } from 'react';
import connectJs from '../../../connect';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function JoinClassRoom({ setAssignmentVisible, setClasses }) {
  const [classID, setClassID] = useState('');

  const handleSubmit = async (e) => {
    const { backEndLink } = connectJs;
    e.preventDefault();
    // Add your join classroom logic here
    let data = JSON.parse(localStorage.getItem("userInfo"));
    console.log("Joining classroom with ID:", classID);
    try {
      let response = await axios.post(`${backEndLink}/joinClassroom`, {
        scholar_id: data.scholar_id, class_code: classID
      }, {
        withCredentials: true
      })
      try {
          let email = JSON.parse(localStorage.getItem("userInfo")).email;
          let response = await axios.post(`${backEndLink}/fetchClassRoomS`, {
            email
          }, { withCredentials: true });
          console.log("op :: ", response.data);
          setClasses(response.data);
      }
      catch (error) {
          console.log("Error fetching classes:", error);
      }
      setAssignmentVisible(false);
      console.log(response);
    }
    catch (error) {
      toast.error("Wrong code", { autoClose: 500 })
      console.log("error :: ", error);
    }
    setClassID(''); // Clear the input after submission
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ToastContainer />
      <div onClick={() => { setAssignmentVisible(false) }} style={{ cursor: "pointer", position: "fixed", top: "5%", right: "10%" }}  >x</div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-4 bg-white rounded shadow-md">
        <label htmlFor="classID" className="block text-sm font-medium text-gray-700 mb-2">
          Enter Class ID:
        </label>
        <input
          type="text"
          id="classID"
          value={classID}
          onChange={(e) => setClassID(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Class ID"
          required
        />
        <button
          type="submit"
          className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Join Class
        </button>
      </form>
    </div>
  );
}
