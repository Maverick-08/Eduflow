import React, { useState, useEffect } from 'react';

// A simple present/absent icon component
const StatusIcon = ({ status }) => {
  if (status === 'present') {
    return <span className="text-green-500">✔️ Present</span>; // Green tick for present
  }
  if (status === 'absent') {
    return <span className="text-red-500">❌ Absent</span>; // Red cross for absent
  }
  return <span className="text-gray-500">-</span>; // Neutral state when no status is set
};

// Function to format the date as dd/mm/yyyy
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const StudentAttendance = () => {
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

  // Handle classroom selection change
  const handleClassroomChange = (e) => {
    const selectedClassroom = e.target.value;
    setClassroom(selectedClassroom);
    fetchAttendanceData(selectedClassroom);
  };

  // Sort the attendance data by date in reverse order (most recent date first)
  const sortedAttendanceData = attendanceData.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Calculate the present count and total days
  const presentCount = sortedAttendanceData.filter(row => row.status === 'present').length;
  const totalCount = sortedAttendanceData.length;
  const presentPercentage = (presentCount / totalCount) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">Student Attendance</h1>

      {/* Classroom selection input */}
      <div className="mb-6">
        <label htmlFor="classroom" className="block text-gray-700 font-semibold mb-2">Select Classroom</label>
        <select
          id="classroom"
          value={classroom}
          onChange={handleClassroomChange}
          className="w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a Classroom</option>
          <option value="Classroom A">Classroom A</option>
          <option value="Classroom B">Classroom B</option>
          <option value="Classroom C">Classroom C</option>
          {/* Add more classrooms here as needed */}
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
              {sortedAttendanceData.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 flex items-center">
                    <span className="mr-2 text-xl">🗓</span> {/* Calendar icon */}
                    {formatDate(row.date)} {/* Format the date as dd/mm/yyyy */}
                  </td>
                  <td className="px-4 py-2">
                    <StatusIcon status={row.status} />
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="px-4 py-2 font-semibold">Total Present Percentage</td>
                <td className="px-4 py-2 text-right text-lg font-semibold text-gray-700">
                  {totalCount > 0 ? presentPercentage.toFixed(2) : '0.00'}%
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
