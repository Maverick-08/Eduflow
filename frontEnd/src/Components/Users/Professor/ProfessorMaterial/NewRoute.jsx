import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const NewRoute = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const assignmentId = path[path.length - 1];
  const classId = path[path.length - 2];
  console.log("---location--");
  console.log(classId, assignmentId);

  const [studentsData, setStudentsData] = useState([]);
  const [grade, setGrade] = useState(null);
  const [scholarId, setScholarId] = useState(null);
  const [assignmentDetails, setAssignmentDetails] = useState(null);

  useEffect(() => {
    const getStudentsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/viewSubmissions/${classId}/${assignmentId}`
        );

        // console.log(response.data.data)
        setStudentsData(response.data.data ?? []);
      } catch (err) {
        console.log(err);
      }
    };

    const getDetails = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/assignmentDetails`,
          { assignmentId },
          {
            withCredentials: true,
          }
        );

        setAssignmentDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getDetails();
    getStudentsData();
  }, []);

  // Function to determine the assignment status symbol
  const getAssignmentStatusSymbol = (submitted, isLate) => {
    if (assignmentDetails.grade == "Ungraded" && submitted) {
      return "✔";
    }

    if (assignmentDetails == "Ungraded" && !submitted) {
      return "❌";
    }

    if (!submitted) {
      return "❌"; // Not Submitted (red cross)
    }

    if (submitted && isLate) {
      return "🕒"; // Late Submitted (clock symbol)
    }

    return "✔"; // Submitted (checkmark)
  };

  useEffect(() => {
    const submitGrade = async () => {
      try {
        const payload = { assignmentId, scholarId, grade };

        if (isNaN(grade) || grade < 0) {
          toast.error("Negative grade is not allowed");
          return;
        }

        await axios.post(
          "http://localhost:3000/viewSubmissions/grade",
          payload,
          {
            withCredentials: true,
          }
        );
      } catch (err) {
        console.log(err);
      }
    };

    submitGrade();
  }, [grade]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Student Submissions
      </h1>
      <ToastContainer />

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-center text-gray-700">
                Scholar Id
              </th>
              <th className="py-2 px-4 border-b text-center text-gray-700">
                Name
              </th>
              <th className="py-2 px-4 border-b text-center text-gray-700">
                Submitted Assignment
              </th>
              <th className="py-2 px-4 border-b text-center text-gray-700">
                Assignment Status
              </th>
              {assignmentDetails?.grade != "Ungraded" && (
                <th className="py-2 px-4 border-b text-center text-gray-700">
                  Grade
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center text-gray-800">
                  {student.scholarId}
                </td>

                <td className="py-2 px-4 border-b text-center text-gray-800">
                  {student.name}
                </td>

                {/* Submitted Assignment PDF link */}
                <td className="py-2 px-4 border-b text-center">
                  {student.submitted ? (
                    <a
                      href={`http://localhost:3000/uploads/submission/${student.scholarId}`}
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
                  {getAssignmentStatusSymbol(student.submitted, student.isLate)}
                </td>
                {assignmentDetails?.grade != "Ungraded" && (
                  <td className="flex justify-center border-b items-center py-2">
                    {student.assignedGrade ? (
                      <p className="text-xl text-gray-400">
                        {student.assignedGrade}
                      </p>
                    ) : (
                      <input
                        type="number"
                        className={`text-center py-1 border-2 border-gray-400 ${
                          student.submitted ? "" : "cursor-not-allowed"
                        }`}
                        onChange={(e) => {
                          if (student.submitted) {
                            setScholarId(student.scholarId);
                            setGrade(e.target.value);
                          }
                        }}
                      />
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-green-400 rounded-lg px-16 py-4 text-white text-2xl"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRoute;

// C:\Vivek\Coding\Projects\Eduflow\server\uploads\submissions\cover_letter.pdf
// server\uploads\submissions\cover_letter.pdf
// ../../../../../../server/uploads/submissions/cover_letter.pdf
