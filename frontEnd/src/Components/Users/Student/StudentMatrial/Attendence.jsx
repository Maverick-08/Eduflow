import React from 'react';
import AttendanceCard from '../../../attendanceCard';

export default function Attendance() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Attendance here!!!</h2>
      <div className="flex gap-4 flex-col">
        {/* Example attendance cards */}
        <AttendanceCard date="2024-10-25" isPresent={true} />
        <AttendanceCard date="2024-10-26" isPresent={false} />
      </div>
    </div>
  );
}
