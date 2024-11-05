import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateAssignment({ setAssignmentVisible }) {
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [isIndividual, setIsIndividual] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [error, setError] = useState('');
  const naviagte = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation: Ensure all fields are filled and at least one document is uploaded
    if (!email || !department || !course || !year || !subjectName) {
      setError('Please fill in all fields');
      return;
    }
    setError(''); // Clear error if validation passes

    // Handle form submission
    console.log({
      email,
      department,
      course,
      year,
      isIndividual,
      subjectName,
    });
    naviagte("/ProfessorView");

    // Here, you would typically upload the data to a server or perform other actions
  };

  return (
    <>
      <center>
        <center>
          <h2 style={{ fontSize: "30px", cursor: "pointer" }}>
            <b style={{ "color": "rgb(147 51 234)" }} >Create Assignment</b>
            <small onClick={() => { setAssignmentVisible(false) }} style={{ fontSize: "20px", marginLeft: "20px" }} >x</small>
          </h2>
        </center>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="bg-white p-6 rounded-lg shadow-md mt-6">
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <input
              style={{ border: "1px solid gray", width: "100%", padding: "3px" }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email'
            />
            <br /><br />
            <input
              style={{ border: "1px solid gray", width: "100%", padding: "3px" }}
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder='Enter department'
            />
            <br /><br />
            <input
              style={{ border: "1px solid gray", width: "100%", padding: "3px" }}
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder='Enter course'
            />
            <br /><br />
            <input
              style={{ border: "1px solid gray", width: "100%", padding: "3px" }}
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder='Enter year'
            />
            <br /><br />
            <input
              style={{ border: "1px solid gray", width: "100%", padding: "3px" }}
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder='Enter subject name'
            />
            <br /><br />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isIndividual}
                onChange={() => setIsIndividual(!isIndividual)}
                className="mr-2"
              />
              <label className="text-gray-700">Is this an individual assignment?</label>
            </div>


            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </center>
    </>
  );
}
