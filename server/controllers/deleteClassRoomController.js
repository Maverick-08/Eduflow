import Client from "../config/dbConn.js"; // PostgreSQL client
import { config } from "dotenv";
config();

export const deleteClassRoomhandler = async (req, res) => {
  const { class_id } = req.body;
  try {
    // Delete query to remove classroom by class_id
    const deleteQuery = `
      DELETE FROM classroom
      WHERE class_id = $1
      RETURNING *;
    `;

    const result = await Client.query(deleteQuery, [class_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: "Classroom not found" });
    }

    res.status(200).json({
      msg: "Classroom deleted successfully",
      deletedClassroom: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err.message });
  }
};
