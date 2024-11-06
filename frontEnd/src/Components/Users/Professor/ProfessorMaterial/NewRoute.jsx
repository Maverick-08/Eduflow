import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const NewRoute = () => {
  const location = useLocation();
  const state = location.state?.someData || 'No State Provided'; // Fallback if state is undefined

  // Sample data with PDF links, submission status, and submission date
  const [studentsData, setStudentsData] = useState([
    {
      name: 'John Doe',
      assignmentSubmitted: true,
      grade: 90,
      pdfUrl: 'https://example.com/assignments/john-doe-assignment.pdf',
      submissionDate: '2024-04-10', // Date of submission
      dueDate: '2024-04-08', // Assignment due date
    },
    {
      name: 'Jane Smith',
      assignmentSubmitted: false,
      grade: 75,
      pdfUrl: 'https://example.com/assignments/jane-smith-assignment.pdf',
      submissionDate: null,
      dueDate: '2024-04-08',
    },
    {
      name: 'Tom Hanks',
      assignmentSubmitted: true,
      grade: 95,
      pdfUrl: 'https://example.com/assignments/tom-hanks-assignment.pdf',
      submissionDate: '2024-04-09',
      dueDate: '2024-04-08',
    },
    {
      name: 'Emily Brown',
      assignmentSubmitted: false,
      grade: 60,
      pdfUrl: 'https://example.com/assignments/emily-brown-assignment.pdf',
      submissionDate: null,
      dueDate: '2024-04-08',
    },
    {
      name: 'Mark Lee',
      assignmentSubmitted: true,
      grade: 85,
      pdfUrl: 'https://example.com/assignments/mark-lee-assignment.pdf',
      submissionDate: '2024-04-07',
      dueDate: '2024-04-08',
    },
  ]);

  // Function to handle grade input change (no longer needed, as grading column is removed)
  // const handleGradeChange = (index, newGrade) => {
  //   const updatedData = [...studentsData];
  //   updatedData[index].grade = newGrade;
  //   setStudentsData(updatedData);
  // };

  // Function to determine the assignment status symbol
  const getAssignmentStatusSymbol = (submissionDate, dueDate) => {
    if (!submissionDate) {
      return '❌'; // Not Submitted (red cross)
    }

    const submission = new Date(submissionDate);
    const due = new Date(dueDate);

    if (submission > due) {
      return '🕒'; // Late Submitted (clock symbol)
    }

    return '✔'; // Submitted (checkmark)
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">{state}</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-center text-gray-700">Name</th>
              <th className="py-2 px-4 border-b text-center text-gray-700">Submitted Assignment</th>
              <th className="py-2 px-4 border-b text-center text-gray-700">Assignment Status</th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center text-gray-800">{student.name}</td>

                {/* Submitted Assignment PDF link */}
                <td className="py-2 px-4 border-b text-center">
                  {student.assignmentSubmitted ? (
                    <a
                      href={student.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Open Assignment
                    </a>
                  ) : (
                    <span className="text-gray-500">Not Submitted</span>
                  )}
                </td>

                {/* Assignment status symbol */}
                <td className="py-2 px-4 border-b text-center text-gray-800">
                  {getAssignmentStatusSymbol(student.submissionDate, student.dueDate)}
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
