import Client from "../config/dbConn.js"; // PostgreSQL client
import { config } from "dotenv";
config();

export const markAttendanceHandler = async (req, res) => {
  try {
    const { class_id, attendance_date, attendanceStatus } = req.body;

    // Ensure attendanceStatus is an array of { scholar_id, status }
    if (!Array.isArray(attendanceStatus) || !attendanceStatus.length) {
      return res
        .status(400)
        .json({ msg: "Attendance status data is required." });
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

export const updateAttendanceHandler = async (req, res) => {
  try {
    const { class_id, attendance_date, attendanceStatus } = req.body;

    // Ensure attendanceStatus is an array of { scholar_id, status }
    if (!Array.isArray(attendanceStatus) || !attendanceStatus.length) {
      return res
        .status(400)
        .json({ msg: "Attendance status data is required." });
    }

    // Process each student's attendance status individually
    for (let record of attendanceStatus) {
      const { scholar_id, status } = record;

      // Update attendance record
      const result = await Client.query(
        `
        UPDATE attendance
        SET status = $1
        WHERE class_id = $2
          AND scholar_id = $3
          AND attendance_date = $4
        `,
        [status, class_id, scholar_id, attendance_date]
      );

      // If no rows were affected, return an error that the record doesn't exist
      if (result.rowCount === 0) {
        return res.status(404).json({
          msg: `No attendance record found for class_id: ${class_id}, scholar_id: ${scholar_id}, and date: ${attendance_date}`,
        });
      }
    }

    return res.status(200).json({ msg: "Attendance updated successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err.message });
  }
};
