import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import conectjs from "../../../connect";

export default function CreateAssignment({ setAssignmentVisible }) {
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [isIndividual, setIsIndividual] = useState(false);
  const [subject_name, setsubject_name] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { backEndLink } = conectjs;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !department || !course || !year || !subject_name) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setSuccess('');

    try {
      let depArra = [];
      depArra.push(department);
      let courseArra = [];
      courseArra.push(course);
      let yearArra = [];
      yearArra.push(year);
      const response = await axios.post(`${backEndLink}/createClassroom`, {
        email,
        department : depArra,
        course : courseArra,
        year : yearArra,
        isIndividual,
        subject_name: subject_name,
      },{
        withCredentials : true
      });

      setSuccess('Classroom created successfully!');
      console.log(response.data); // Handle response as needed
      setAssignmentVisible(false);
    } catch (err) {
      setError(err.response ? err.response.data.msg : 'Error creating classroom');
    }
  };

  return (
    <>
      <center>
        <h2 style={{ fontSize: '30px', cursor: 'pointer' }}>
          <b style={{ color: 'rgb(147 51 234)' }}>Create Class</b>
          <small
            onClick={() => setAssignmentVisible(false)}
            style={{ fontSize: '20px', marginLeft: '20px' }}
          >
            x
          </small>
        </h2>
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className="bg-white p-6 rounded-lg shadow-md mt-6"
        >
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            <input
              style={{ border: '1px solid gray', width: '100%', padding: '3px' }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter professor email"
            />
            <br />
            <br />
            <input
              style={{ border: '1px solid gray', width: '100%', padding: '3px' }}
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter department"
            />
            <br />
            <br />
            <input
              style={{ border: '1px solid gray', width: '100%', padding: '3px' }}
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Enter course"
            />
            <br />
            <br />
            <input
              style={{ border: '1px solid gray', width: '100%', padding: '3px' }}
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year"
            />
            <br />
            <br />
            <input
              style={{ border: '1px solid gray', width: '100%', padding: '3px' }}
              type="text"
              value={subject_name}
              onChange={(e) => setsubject_name(e.target.value)}
              placeholder="Enter subject name"
            />
            <br />
            <br />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isIndividual}
                onChange={() => setIsIndividual(!isIndividual)}
                className="mr-2"
              />
              <label className="text-gray-700">Is this an individual assignment?</label>
            </div>

            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg">
              Submit
            </button>
          </form>
        </div>
      </center>
    </>
  );
}
