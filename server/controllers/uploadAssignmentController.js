import Client from "../config/dbConn.js";

export const uploadAssignmentHandler = async (req, res) => {
  try {
    let { class_id, deadline, title, instruction, grade } = req.body;
    console.log("dead --------------> ", deadline , typeof(deadline));
    if (deadline=="null") {
      deadline = new Date(); // or any default value you want
      console.log("Inside if block because deadline was falsy");
      console.log(deadline);
    }

    const file = req.file; // Assuming a single file upload
    console.log("opopo :: ", req.body)
    if (!file) {
      return res.status(400).json({ msg: "File upload required" });
    }
    // Ensure that a grade is selected or input manually
    if (!grade) {
      return res.status(400).json({ msg: "Grade is required" });
    }

    // Generate unique assignment ID
    const assignment_id = `ASSIGN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const documentfile = `uploads/assignments/${file.filename}`;

    console.log("tatti :: ", assignment_id, documentfile, class_id, deadline, title, instruction, grade)

    // Insert assignment record into the database
    await Client.query(
      "INSERT INTO assignment (assignment_id, documentFile, class_id, deadline, title, instruction, grade) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [assignment_id, documentfile, class_id, deadline, title, instruction, grade]
    );

    // Return success response with assignment data
    return res.status(200).json({
      msg: "Assignment uploaded successfully",
      data: {
        assignment_id,
        documentfile,
        class_id,
        deadline,
        title,
        instruction,
        grade,
      },
    });
  } catch (err) {
    console.error("Error uploading assignment:", err);
    return res.status(500).json({ msg: "An error occurred during upload" });
  }
};

