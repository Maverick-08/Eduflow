import Client from "../config/dbConn.js"; // PostgreSQL client
import { config } from "dotenv";
config();

export const markAttendanceHandler = async (req, res) => {
  try {
    const { class_id, attendance_date, attendanceStatus } = req.body;

    // Ensure attendanceStatus is an array of { scholar_id, status }
    if (!Array.isArray(attendanceStatus) || !attendanceStatus.length) {
      return res.status(400).json({ msg: "Attendance status data is required." });
    }

    // Process each student's attendance status individually
    for (let record of attendanceStatus) {
      const { scholar_id, status } = record;

      // Insert or update attendance record
      await Client.query(
        `
        INSERT INTO attendance (class_id, scholar_id, attendance_date, status)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (class_id, scholar_id, attendance_date) 
        DO UPDATE SET status = $4
        `,
        [class_id, scholar_id, attendance_date, status]
      );
    }

    return res.status(200).json({ msg: "Attendance marked successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err.message });
  }
};
