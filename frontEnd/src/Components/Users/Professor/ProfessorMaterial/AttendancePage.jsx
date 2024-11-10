import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import connectJs from "../../../../connect";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

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
          { withCredentials: true }
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
    const attendance_date = selectedDate;

    const attendanceStatus = Object.entries(attendance).map(([scholar_id, status]) => ({
      scholar_id,
      status: status === "present",
    }));

    try {
      await axios.post("http://localhost:3000/markAttendance", {
        class_id: classID,
        attendance_date,
        attendanceStatus,
      });
      toast.success(`Attendance submitted successfully for ${attendance_date}`, { autoClose: 1500 });
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  const exportToExcel = () => {
    const today = selectedDate;
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

  const getAttendance = async (e) => {
    const path = window.location.pathname;
    const classString = path.split("/");
    const class_id = classString[classString.length - 1];
    const attendance_date = e.target.value;
    setSelectedDate(attendance_date);
    const { backEndLink } = connectJs;
    try {
      const response = await axios.post(
        `${backEndLink}/fetchAttendanceByDate`,
        { class_id, attendance_date },
        { withCredentials: true }
      );
      console.log(response);
      const updatedStudents = response.data.attendance;
      // const updatedStudents = response.data.attendance.sort((a, b) =>
      //   a.name.localeCompare(b.name)
      // );
      setStudents(updatedStudents);

      const updatedAttendance = updatedStudents.reduce((acc, student) => ({
        ...acc,
        [student.scholar_id]: student.status ? "present" : "absent",
      }), {});
      
      console.log(updatedAttendance);
      setAttendance(updatedAttendance);
    } catch (error) {
      setStudents([]);
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600">Attendance Management</h1>
        <div className="mt-4">
          <label className="mr-2 text-lg font-semibold text-gray-600">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={getAttendance}
            className="border text-1xl font-bold text-green-500 border-gray-300 rounded-lg px-2 py-1"
          />
        </div>
      </header>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 gap-4">
          {
            students.length === 0 ?
              <center>No attendance for this day</center>
              :
              <>
                {students.map((student) => (
                  <div
                    key={student.scholar_id}
                    className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm transition-transform hover:scale-105"
                  >
                    <i class="rounded-full mr-4 border p-3 text-green-500 border-gray-300 fa-brands fa-google-scholar"></i>
                    <span className="text-lg font-semibold text-gray-800">
                      {student.name} <span className="text-gray-500">({student.scholar_id})</span>
                    </span>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleAttendanceChange(student, "present")}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${attendance[student.scholar_id] === "present"
                          ? "bg-green-500 text-white"
                          : "border-2 border-gray-300 text-gray-500"
                          }`}
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handleAttendanceChange(student, "absent")}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${attendance[student.scholar_id] === "absent"
                          ? "bg-red-500 text-white"
                          : "border-2 border-gray-300 text-gray-500"
                          }`}
                      >
                        ✗
                      </button>
                    </div>
                  </div>
                ))}
              </>
          }
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-transform hover:scale-105"
          >
            Submit Attendance
          </button>
          <button
            onClick={exportToExcel}
            className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition-transform hover:scale-105"
          >
            Export to Excel
          </button>
        </div>
      </div>
    </main>
  );
}
