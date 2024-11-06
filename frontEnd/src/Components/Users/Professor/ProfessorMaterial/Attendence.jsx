import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export default function Attendance() {
    const students = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"]; // Sample student list
    const [attendance, setAttendance] = useState(
        students.reduce((acc, student) => ({ ...acc, [student]: null }), {})
    );

    const handleAttendanceChange = (student, status) => {
        setAttendance((prev) => ({ ...prev, [student]: status }));
    };

    const handleSubmit = () => {
        const today = new Date().toLocaleDateString();
        console.log("Attendance for", today);
        console.log(attendance);
        alert(`Attendance submitted for ${today}`);
    };

    const exportToExcel = () => {
        const today = new Date().toLocaleDateString();
        const attendanceData = Object.entries(attendance).map(([student, status]) => ({
            Student: student,
            Status: status || "Not marked"
        }));

        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(attendanceData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Attendance");

        // Export it to an Excel file
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
                        <div key={student} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
                            <span className="text-lg font-medium text-gray-800">{student}</span>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleAttendanceChange(student, "present")}
                                    className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                                        attendance[student] === "present" ? "bg-green-500" : "border-2 border-gray-300"
                                    }`}
                                >
                                    {attendance[student] === "present" && (
                                        <span className="text-white font-bold text-xl">✓</span>
                                    )}
                                </button>
                                <button
                                    onClick={() => handleAttendanceChange(student, "absent")}
                                    className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                                        attendance[student] === "absent" ? "bg-red-500" : "border-2 border-gray-300"
                                    }`}
                                >
                                    {attendance[student] === "absent" && (
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
