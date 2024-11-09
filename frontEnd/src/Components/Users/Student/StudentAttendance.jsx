import React, { useState, useEffect } from 'react';
import axios from "axios";
import connectJs from '../../../connect';

const StudentAttendance = () => {
  const { backEndLink } = connectJs;
  const [classes, setClasses] = useState([]);
  const [selectedClassID, setselectedClassID] = useState("");
  const [classroom, setClassroom] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendanceRecord, setAttendanceRecord] = useState([]);
  const [attendencePercentage, setattendencePercentage] = useState(0);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getClass = async () => {
    let email = JSON.parse(localStorage.getItem("userInfo")).email;
    try {
      let response = await axios.post(
        `${backEndLink}/fetchClassRoomS`,
        { email },
        { withCredentials: true }
      );
      setClasses(response.data);
    } catch (error) {
      console.log("Error fetching classes:", error);
    }
  };

  const getAttendence = async () => {
    let scholar_id = JSON.parse(localStorage.getItem("userInfo")).scholar_id;
    try {
      let response = await axios.post(`${backEndLink}/fetchAttendacneByClass`, {
        class_id: selectedClassID, scholar_id
      }, {
        withCredentials: true
      });
      let p = response.data.attendance.reduce((acc, e) => acc + (e.status ? 1 : 0), 0);
      let percentage = ((p / response.data.attendance.length) * 100).toFixed(2);
      setattendencePercentage(percentage);
      setAttendanceRecord(response.data.attendance);
    } catch (error) {
      setAttendanceRecord([]);
      console.log(error);
    }
  };

  useEffect(() => {
    getClass();
  }, []);

  useEffect(() => {
    if (selectedClassID) {
      getAttendence();
    }
  }, [selectedClassID]);

  const handleClassroomChanges = (e) => {
    const selectedClassroom = e.target.value;
    setClassroom(selectedClassroom);
    const selectedClass = classes.find((cls) => cls.subject_name === selectedClassroom);
    if (selectedClass) {
      setselectedClassID(selectedClass.class_id);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Student Attendance</h1>

      <div className="mb-8 w-full max-w-xs">
        <label htmlFor="classroom" className="block text-lg font-medium text-gray-700 mb-2 text-center">
          Select Classroom
        </label>
        <select
          id="classroom"
          value={classroom}
          onChange={handleClassroomChanges}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select classroom</option>
          {classes.map((elem) => (
            <option key={elem.class_id} value={elem.subject_name}>
              {elem.subject_name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-500 text-white text-left text-sm uppercase tracking-wider">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecord.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 text-gray-700 text-sm flex items-center">
                    <i className="text-blue-500 fa-regular fa-calendar-days mr-2"></i>
                    {formatDate(row.date)}
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-sm">
                    {row.status ? (
                      <span className="text-green-600 font-semibold">✔️ Present</span>
                    ) : (
                      <span className="text-red-600 font-semibold">❌ Absent</span>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100">
                <td className="px-6 py-4 font-semibold text-gray-700">Attendance Percentage</td>
                <td className="px-6 py-4 text-lg font-semibold text-blue-600 text-right">
                  {attendencePercentage}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
