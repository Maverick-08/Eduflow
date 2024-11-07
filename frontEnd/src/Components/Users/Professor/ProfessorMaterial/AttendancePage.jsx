import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import connectJs from "../../../../connect";
import axios from "axios";

export default function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const getStudents = async () => {
      const path = window.location.pathname;
      const classString = path.split("/");
      const classID = classString[classString.length - 1];
      const { backEndLink } = connectJs;
      try {
        const response = await axios.post(
          `${backEndLink}/getPeople`,
          { class_id: classID },
          {
            withCredentials: true,
          }
        );
        setStudents(response.data.students);
        const initialAttendance = response.data.students.reduce(
          (acc, student) => ({ ...acc, [student.scholar_id]: null }),
          {}
        );
        setAttendance(initialAttendance);
      } catch (error) {
        console.error(error);
      }
    };
    getStudents();
  }, []);

  const handleAttendanceChange = (student, status) => {
    setAttendance((prev) => ({ ...prev, [student.scholar_id]: status }));
  };

  const handleSubmit = async () => {
    const path = window.location.pathname;
    const classString = path.split("/");
    const classID = classString[classString.length - 1];
    const attendance_date = new Date().toLocaleDateString("en-CA"); // Format as YYYY-MM-DD for PostgreSQL

    const attendanceStatus = Object.entries(attendance).map(([scholar_id, status]) => ({
      scholar_id,
      status: status === "present", // true if "present", false otherwise
    }));

    try {
      const response = await axios.post("http://localhost:3000/markAttendance", {
        class_id: classID,
        attendance_date,
        attendanceStatus,
      });
      alert(`Attendance submitted successfully for ${attendance_date}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  const exportToExcel = () => {
    const today = new Date().toLocaleDateString();
    const attendanceData = Object.entries(attendance).map(
      ([student, status]) => ({
        Student: student,
        Status: status || "Not marked",
      })
    );
    const ws = XLSX.utils.json_to_sheet(attendanceData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");

    XLSX.writeFile(wb, `Attendance_${today}.xlsx`);
  };

  return (
    <main className="flex-1 p-6" style={{ height: "100vh" }}>
      <header className="flex items-center justify-start mb-6">
        <h1 className="text-2xl font-semibold text-blue-500">Attendance</h1>
      </header>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-4">
          {students.map((student) => (
            <div
              key={student.scholar_id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
            >
              <span className="text-lg font-medium text-gray-800">
                {student.name + " (" + student.scholar_id + ")"}
              </span>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleAttendanceChange(student, "present")}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                    attendance[student.scholar_id] === "present"
                      ? "bg-green-500"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {attendance[student.scholar_id] === "present" && (
                    <span className="text-white font-bold text-xl">✓</span>
                  )}
                </button>
                <button
                  onClick={() => handleAttendanceChange(student, "absent")}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                    attendance[student.scholar_id] === "absent"
                      ? "bg-red-500"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {attendance[student.scholar_id] === "absent" && (
                    <span className="text-white font-bold text-xl">✗</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-600"
          >
            Submit Attendance
          </button>
          <button
            onClick={exportToExcel}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-600"
          >
            Export to Excel
          </button>
        </div>
      </div>
    </main>
  );
}
