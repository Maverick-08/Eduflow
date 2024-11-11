import Client from "../config/dbConn.js"; // PostgreSQL client
import { config } from "dotenv";

config();

export const deleteAssignmentById = async (req, res) => {
    const assignmentId = req.params.assignment_id;

    const deleteQuery = `DELETE FROM assignment WHERE assignment_id = $1`;

    try {
        const result = await Client.query(deleteQuery, [assignmentId]);

        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Assignment not found' });
        } else {
            res.status(200).json({ message: 'Assignment deleted successfully' });
        }
    } catch (err) {
        console.error('Error deleting assignment:', err);
        res.status(500).json({ error: 'Failed to delete assignment' });
    }
};