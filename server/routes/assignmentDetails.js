import { Router } from "express";
import Client from "../config/dbConn.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { assignmentId } = req.body;

        if (!assignmentId) {
            return req.json({ msg: "Missing Assignment ID" })
        }

        const response = await Client.query("SELECT * FROM assignment WHERE assignment_id = $1", [assignmentId]);

        const data = response.rows[0];

        return res.json(data)
    }
    catch (err) {
        console.log("@assignmentDetails\n" + err);
    }
})

export default router