import Client from "../config/dbConn.js"; // PostgreSQL client
import { config } from "dotenv";
config();

export const fetchClassRoomShandler = async (req, res) => {
    const { email } = req.body;

    try {
        const query = `
            SELECT c.*
            FROM classroom c
            JOIN student s ON s.email = $1
            WHERE c.class_id = ANY(s.class_id);
        `;
        
        const result = await Client.query(query, [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No classrooms found for this student' });
        }

        res.status(200).json(result.rows);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
