import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfessorStreams() {
  const navigate = useNavigate();

  // Array of assignments
  const assignments = [
    {
      title: 'Sugandha Gupta posted a new assignment: Guidelines: Q18',
      date: 'Apr 6, 2023',
      stateData: 'Sugandha Gupta posted a new assignment: Guidelines: Q18',
    },
    {
      title: 'Sugandha Gupta posted a new assignment: Guidelines: Q16 and 17',
      date: 'Mar 28, 2023',
      stateData: 'Sugandha Gupta posted a new assignment: Guidelines: Q16 and 17',
    },
    {
      title: 'Sugandha Gupta posted a new assignment: Guidelines: Q8 and 14',
        date: 'Mar 23, 2023',
        stateData: 'Sugandha Gupta posted a new assignment: Guidelines: Q8 and 14',
    },
    {
      title: 'Sugandha Gupta posted a new assignment: Guidelines: Q9, 10 and 11 (concatenate, reverse and ...)',
      date: 'Mar 16, 2023',
      stateData: 'Sugandha Gupta posted a new assignment: Guidelines: Q9, 10 and 11 (concatenate, reverse and ...)',
    },
  ];




  return (
    <div>
      <header className="bg-blue-600 text-white p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Practical Group A</h1>
          <p className="text-lg">2020-2023</p>
        </div>
        <img
          src="https://placehold.co/100x100"
          alt="Illustration of books and headphones"
          className="w-24 h-24"
        />
      </header>

      <div className="flex p-6">
        <main className="w-full">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer"
              onClick={() => {
                navigate('/new-route', { state: { someData: assignment.stateData } });
              }}
            >
              <div className="flex items-center mb-2">
                <i className="fas fa-file-alt text-blue-600"></i>
                <p className="ml-2 font-bold">{assignment.title}</p>
              </div>
              <p className="text-gray-500">{assignment.date}</p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
