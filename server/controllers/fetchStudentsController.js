import Client from "../config/dbConn.js"; // PostgreSQL client
import { config } from "dotenv";
config();

export const fetchStudentsHandler = async (req, res) => {
  const { class_id } = req.body;
  console.log(class_id);
  try {
    const query = `
      SELECT CONCAT(s.fname, ' ', s.lname) AS name ,scholar_id
      FROM student s
      WHERE $1 = ANY(s.class_id); 
    `;

    const { rows } = await Client.query(query, [class_id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this classroom" });
    }

    res.json({ students: rows });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
