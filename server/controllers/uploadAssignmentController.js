import Client from "../config/dbConn.js"; 
export const uploadAssignmentHandler = async (req, res) => {
  try {
    const { class_id, deadline, title, instruction } = req.body;
    const files = req.files;
 
    if (!files || files.length === 0) {
      return res.status(400).json({ msg: "No files uploaded" });
    }

    const assignmentPromises = files.map(async (file) => {
      const assignment_id = `ASSIGN-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}`;
    
      return Client.query(
        "INSERT INTO assignment (assignment_id, documentFile, class_id, deadline, title, instruction) VALUES ($1, $2, $3, $4, $5, $6)",
        [assignment_id, file.path, class_id, deadline, title, instruction]
      );
    });

    await Promise.all(assignmentPromises);

    return res.status(201).json({
      msg: "Assignments uploaded successfully",
      data: files.map((file, index) => ({
        assignment_id: `ASSIGN-${Date.now()}-${index}`,
        documentUrl: file.path,
        class_id,
        deadline,
        title,
        instruction,
      })),
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
