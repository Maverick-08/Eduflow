import Client from "../config/dbConn.js"; // PostgreSQL client
import { config } from "dotenv";
config();

export const fetchAttendacneByClassShandler = async (req, res) => {
  const { class_id, scholar_id } = req.body;

  if (!class_id || !scholar_id) {
    return res
      .status(400)
      .json({ msg: "Class ID and Scholar ID are required" });
  }

  try {
    // Query to fetch attendance records for the specified class_id and scholar_id
    const result = await Client.query(
      `SELECT attendance_date, status 
       FROM attendance 
       WHERE class_id = $1 AND scholar_id = $2 
       ORDER BY attendance_date`,
      [class_id, scholar_id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({
          msg: "No attendance records found for this student in this class.",
        });
    }

    // Organize attendance records by date
    const attendanceRecords = result.rows.map((record) => ({
      date: record.attendance_date.toISOString().split("T")[0],
      status: record.status,
    }));

    return res
      .status(200)
      .json({ class_id, scholar_id, attendance: attendanceRecords });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
