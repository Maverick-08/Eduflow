import Client from "../config/dbConn.js";

export const submitAssignmentHandler = async (req, res) => {
  try {
    const { class_id, assignment_id, scholar_id, fname, lname, isLate } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ msg: "No files uploaded" });
    }

    const submissionPromises = files.map(async (file) => {
      const submission_id = `SUBMIT-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}`;
      return Client.query(
        "INSERT INTO submission (submission_id, class_id, assignment_id, fname, lname, scholar_id, submission_time, documentFile, isLate) VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7, $8)",
        [submission_id, class_id, assignment_id, fname, lname, scholar_id, file.path, isLate]
      );
    });

    await Promise.all(submissionPromises);

    return res.status(201).json({
      msg: "Assignment submitted successfully",
      data: files.map((file, index) => ({
        submission_id: `SUBMIT-${Date.now()}-${index}`,
        documentUrl: file.path,
        class_id,
        assignment_id,
        scholar_id,
        fname,
        lname,
        isLate,
      })),
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
