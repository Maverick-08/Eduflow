import Client from "../config/dbConn.js"; 

export const uploadAssignmentHandler = async (req, res) => {
  try {
    const { class_id, deadline, title, instruction, grade } = req.body;  // Include grade
    const files = req.files;

    // Ensure files are uploaded

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

export const getUploadedAssignmentController=async(req,res)=>{
  try {
    const { class_id } = req.query; 

    if (!class_id) {
      return res.status(400).json({ msg: "class_id is required" });
    }

    const result = await Client.query(
      "SELECT * FROM assignment WHERE class_id = $1", 
      [class_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "No assignments found for this class." });
    }

    // Generate the base URL for the uploaded files (assuming your app is hosted on a server)
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/assignments/`;

    // Format the response with the full file URL for each assignment
    const assignments = result.rows.map((assignment) => ({
      assignment_id: assignment.assignment_id,
      documentUrl: baseUrl + path.basename(assignment.documentfile), // Use `basename` to extract filename
      class_id: assignment.class_id,
      deadline: assignment.deadline,
      title: assignment.title,
      instruction: assignment.instruction,
      grade: assignment.grade, // Include grade in the response
    }));

    return res.status(200).json({
      msg: "Assignments retrieved successfully",
      data: assignments,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err.message });
  }
}