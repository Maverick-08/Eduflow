import Client from "../config/dbConn.js"; // PostgreSQL client
import { config } from "dotenv";
config();

export const fetchClassRoomPhandler = async (req, res) => {
    const { email } = req.body;
    console.log("email is :: ", email)
    try {
        const query = `
            SELECT c.*
            FROM classroom c
            JOIN professor p ON p.email = $1
            WHERE c.class_id = ANY(p.class_id)
        `;
        
        const result = await Client.query(query, [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No classrooms found for this professor' });
        }

        res.status(200).json(result.rows);
    }catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
