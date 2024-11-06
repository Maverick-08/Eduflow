import Client from "../config/dbConn.js"; 

export const uploadAssignmentHandler = async (req, res) => {
  try {
    const { class_id, deadline, title, instruction, grade } = req.body;  // Include grade
    const files = req.files;

    // Ensure files are uploaded
    if (!files || files.length === 0) {
      return res.status(400).json({ msg: "No files uploaded" });
    }

    // Ensure that a grade is selected or input manually
    if (!grade) {
      return res.status(400).json({ msg: "Grade is required" });
    }

    const assignmentPromises = files.map(async (file) => {
      // Generate unique assignment ID
      const assignment_id = `ASSIGN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Insert assignment record into the database
      return Client.query(
        "INSERT INTO assignment (assignment_id, documentFile, class_id, deadline, title, instruction, grade) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [assignment_id, file.path, class_id, deadline, title, instruction, grade]  // Insert the grade
      );
    });

    // Wait for all assignment insertions to complete
    await Promise.all(assignmentPromises);

    // Return success response with assignment data
    return res.status(201).json({
      msg: "Assignments uploaded successfully",
      data: files.map((file, index) => ({
        assignment_id: `ASSIGN-${Date.now()}-${index}`,
        documentUrl: file.path,
        class_id,
        deadline,
        title,
        instruction,
        grade,  // Include grade in the response
      })),
    });
  } catch (err) {
    // Handle any errors that occur during the process
    return res.status(500).json({ msg: err.message });
  }
};
