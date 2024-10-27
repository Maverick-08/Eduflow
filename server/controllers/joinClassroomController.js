import Client from "../config/dbConn.js";
import { config } from "dotenv";
config();

//?-------------STEPS-------
//?required class code snd schoalr id
//?check for valid code
//?if already joined return
//?else add student to classroom

export const joinClassroomHandler = async (req, res) => {
  try {
    const { class_code, scholar_id } = req.body;

    const classResult = await Client.query(
      "SELECT class_id FROM classroom WHERE class_id = $1",
      [class_code]
    );

    if (classResult.rows.length === 0) {
      return res.status(404).json({ msg: "Classroom not found" });
    }

    const class_id = classResult.rows[0].class_id;

    const studentResult = await Client.query(
      "SELECT class_id FROM student WHERE scholar_id = $1 AND $2 = ANY(class_id)",
      [scholar_id, class_id]
    );

    if (studentResult.rows.length > 0) {
      return res
        .status(400)
        .json({ msg: "Student is already enrolled in this classroom" });
    }

    await Client.query(
      "UPDATE student SET class_id = array_append(class_id, $1) WHERE scholar_id = $2",
      [class_id, scholar_id]
    );

    return res
      .status(200)
      .json({ msg: "Student successfully joined the classroom" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
