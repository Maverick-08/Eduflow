import Client from "../config/dbConn.js"; // PostgreSQL client
import { config } from "dotenv";
config();

export const leaveClassroomHandler = async (req, res) => {
    const { email, classId } = req.body; // classId is the classroom to be removed

    try {
        const query = `
            UPDATE student
            SET class_id = array_remove(class_id, $2)
            WHERE email = $1
            RETURNING class_id;
        `;
        
        const result = await Client.query(query, [email, classId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Student not found or not enrolled in the specified classroom' });
        }

        res.status(200).json({ message: 'Successfully left the classroom', updatedClassIds: result.rows[0].class_id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: err.message });
    }
};
