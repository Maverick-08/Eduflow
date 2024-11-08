import React , { useState } from "react";

export default function Streams() {
  const [studentClassInfo , useStudentClassInfo] = useState(JSON.parse(sessionStorage.getItem("studentClassInfo")));
  return (
    <>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{studentClassInfo.subject_name}</h1>
            <p className="text-lg">Professor {studentClassInfo.professor_name}</p>
          </div>
          <div>
          <i style={{ fontSize: "60px" }} class=" bg-white p-3 rounded-full text-blue-500 fa-brands fa-google-scholar"></i>
        </div>
        </div>
        <div className="p-4 flex space-x-4">
          <div className="w-3/4">
            <div className="bg-white shadow rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search Material"
                  className="w-full border border-blue-300 rounded-lg p-2"
                />
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-file-alt text-blue-700"></i>
                <div className="flex-grow">
                  <p className="font-medium">
                    Sugandha Gupta posted a new material: Classification
                  </p>
                  <p className="text-blue-700 text-sm">Apr 26, 2023</p>
                </div>
                <i className="fas fa-ellipsis-v text-blue-700 ml-auto"></i>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-file-alt text-blue-700"></i>
                <div className="flex-grow">
                  <p className="font-medium">
                    Sugandha Gupta posted a new material: Regression
                  </p>
                  <p className="text-blue-700 text-sm">Apr 26, 2023</p>
                </div>
                <i className="fas fa-ellipsis-v text-blue-700 ml-auto"></i>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-file-alt text-blue-700"></i>
                <div className="flex-grow">
                  <p className="font-medium">
                    Sugandha Gupta posted a new material: Regularization
                  </p>
                  <p className="text-blue-700 text-sm">Apr 26, 2023</p>
                </div>
                <i className="fas fa-ellipsis-v text-blue-700 ml-auto"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
