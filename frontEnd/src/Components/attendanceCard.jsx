import React from "react";

const AttendanceCard = ({ date, isPresent }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 w-[100%] text-center shadow-md bg-gray-50 flex flex-row justify-between">
      <div className="mb-2 text-lg font-semibold">
        <span className="font-bold">Date:</span> {date}
      </div>
      <div className="mb-2 text-lg font-semibold">
        <span className="font-bold">Lecture 1:</span>
      </div>
      <div
        className={`text-2xl ${isPresent ? "text-green-500" : "text-red-500"}`}
      >
        {isPresent ? "✅" : "❌"}
      </div>
    </div>
  );
};

export default AttendanceCard;
