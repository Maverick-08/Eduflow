import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const NewRoute = () => {
  const location = useLocation();
  const state = location.state?.someData || 'No State Provided'; // Fallback if state is undefined

  // Sample data
  const [studentsData, setStudentsData] = useState([
    { name: 'John Doe', assignmentSubmitted: true, grade: 90 },
    { name: 'Jane Smith', assignmentSubmitted: false, grade: 75 },
    { name: 'Tom Hanks', assignmentSubmitted: true, grade: 95 },
    { name: 'Emily Brown', assignmentSubmitted: false, grade: 60 },
    { name: 'Mark Lee', assignmentSubmitted: true, grade: 85 },
  ]);

  // Function to handle grade input change
  const handleGradeChange = (index, newGrade) => {
    const updatedData = [...studentsData];
    updatedData[index].grade = newGrade;
    setStudentsData(updatedData);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">{state}</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-center text-gray-700">Name</th>
              <th className="py-2 px-4 border-b text-center text-gray-700">Assignment Status</th>
              <th className="py-2 px-4 border-b text-center text-gray-700">Grading</th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center text-gray-800">{student.name}</td>
                <td className="py-2 px-4 border-b text-center">
                  <div
                    className={`w-6 h-6 rounded-full mx-auto ${
                      student.assignmentSubmitted ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></div>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <input
                    type="number"
                    value={student.grade}
                    onChange={(e) => handleGradeChange(index, e.target.value)}
                    className="w-20 py-1 px-2 border rounded text-center"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewRoute;
