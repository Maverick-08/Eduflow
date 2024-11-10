import Client from "../config/dbConn.js"; // PostgreSQL client
import { config } from "dotenv";
config();

export const fetchAttendacneByDatehandler = async (req, res) => {
  const { class_id, attendance_date } = req.body;

  try {
    const query = `
    SELECT a.*, CONCAT(stu.fname, ' ', stu.lname) AS name 
    FROM attendance AS a
    JOIN student AS stu ON a.scholar_id = stu.scholar_id
    WHERE a.class_id = $1 AND a.attendance_date = $2;
  `;

    const result = await Client.query(query, [class_id, attendance_date]);

    if (result.rows.length > 0) {
      return res.status(200).json({ attendance: result.rows });
    } else {
      return res.status(404).json({
        msg: "No attendance data found for the specified class and date.",
      });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
