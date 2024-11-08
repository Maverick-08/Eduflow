import React, { useState, useEffect } from 'react';
import axios from "axios";
import connectJs from '../../../connect';

// A simple attendencePercentage/absent icon component


const StudentAttendance = () => {
  const { backEndLink } = connectJs
  const [classes, setClasses] = useState([]);
  const [selectedClassID, setselectedClassID] = useState("")


  // Function to format the date as dd/mm/yyyy
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const [classroom, setClassroom] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock API fetch based on classroom selection
  const fetchAttendanceData = async (classroom) => {
    setLoading(true);
    // Mock API call - Replace with actual API request
    const data = [
      { date: '2024-11-01', status: 'present' },
      { date: '2024-11-02', status: 'absent' },
      { date: '2024-11-03', status: 'present' },
      { date: '2024-11-04', status: 'absent' },
      { date: '2024-11-05', status: 'present' },
      { date: '2024-11-06', status: 'present' },
      // Add more mock data
    ];
    setAttendanceData(data);
    setLoading(false);
  };




  useEffect(() => {
    const getClass = async () => {
      let email = JSON.parse(localStorage.getItem("userInfo")).email;
      try {
        let response = await axios.post(
          `${backEndLink}/fetchClassRoomS`,
          { email },
          { withCredentials: true }
        );
        setClasses(response.data);
        console.log("Fetched classes:", response.data);
      } catch (error) {
        console.log("Error fetching classes:", error);
      }
    };
    getClass();
  }, []);

  const [attendanceRecord, setAttendanceRecord] = useState([]);
  const [attendencePercentage, setattendencePercentage] = useState(0);

  const getAttendence = async () => {
    console.log("seleced class id is :: ", selectedClassID);
    let scholar_id = JSON.parse(localStorage.getItem("userInfo")).scholar_id;
    console.log("scholar_id is :: ", scholar_id);
    try {
      let response = await axios.post(`${backEndLink}/fetchAttendacneByClass`, {
        class_id: selectedClassID, scholar_id
      }, {
        withCredentials: true
      })
      console.log("response is ->>>>>>>>>>>>>>>>>>>>> ", response.data.attendance);;
      let p = 0;
      response.data.attendance.map((e) => {
        e.status ? p += 1 : p
      })
      let percentage = ((p / response.data.attendance.length) * 100).toFixed(2);
      setattendencePercentage(percentage);
      setAttendanceRecord(response.data.attendance);
    }
    catch (error) {
      setAttendanceRecord([])
      console.log(error);
    }
  }

  useEffect(() => {
    getAttendence();
  }, [selectedClassID])


  // Modify the handleClassroomChange function to set selectedClassID directly
  const handleClassroomChanges = (e) => {
    const selectedClassroom = e.target.value;
    setClassroom(selectedClassroom);

    // Find the selected class by its subject_name
    const selectedClass = classes.find((cls) => cls.subject_name === selectedClassroom);
    if (selectedClass) {
      setselectedClassID(selectedClass.class_id);
    }

    fetchAttendanceData(selectedClassroom);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">Student Attendance</h1>

      {/* Classroom selection input */}
      <div className="mb-6">
        <label htmlFor="classroom" className="block text-gray-700 font-semibold mb-2">Select Classroom</label>
        <select
          id="classroom"
          value={classroom}
          onChange={handleClassroomChanges}
          className="w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="text-lg font-semibold text-gray-600">Loading...</div>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecord.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 flex items-center">
                    <i class="text-green-500 fa-regular fa-calendar-days"></i> &nbsp;&nbsp;
                    {formatDate(row.date)} {/* Format the date as dd/mm/yyyy */}
                  </td>
                  <td className="px-4 py-2">
                    {
                      row.status ?
                        <>
                          ✔️
                        </>
                        :
                        <>
                          ❌
                        </>
                    }
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="px-4 py-2 font-semibold">Total attendencePercentage Percentage</td>
                <td className="px-4 py-2 text-right text-lg font-semibold text-gray-700">
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
