import Client from "../config/dbConn.js";
import path from "path";
import fs from "fs";

// Student assignment submission controller without `class_id`
export const uploadStudentAssignmentHandler = async (req, res) => {
  try {
    const { assignment_id, remarks, isLate, scholar_id } = req.body;
    const file = req.files?.file;

    // Check if the file is provided
    if (!file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // Validate that the assignment exists
    const assignmentQuery = await Client.query(
      "SELECT * FROM assignment WHERE assignment_id = $1",
      [assignment_id]
    );

    if (assignmentQuery.rows.length === 0) {
      return res.status(404).json({ msg: "Assignment not found" });
    }

    // Validate that the student is enrolled in the class
    // Assuming `scholar_id` is passed and the student is enrolled in the class(s) for the assignment.
    const studentQuery = await Client.query(
      "SELECT * FROM student WHERE scholar_id = $1",
      [scholar_id]
    );

    if (studentQuery.rows.length === 0) {
      return res.status(404).json({ msg: "Student not found" });
    }

    // Generate submission ID
    const submission_id = `SUBMIT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Save the file to the server (or cloud storage depending on your setup)
    const filePath = path.join(__dirname, "../uploads", file.name); // Adjust the upload directory path as needed

    // Save file to disk (or use cloud storage logic)
    fs.writeFileSync(filePath, file.data); // This is synchronous, adjust as needed for async

    // Insert submission data into the database
    await Client.query(
      "INSERT INTO submission (submission_id, assignment_id, fname, lname, scholar_id, submission_time, documentFile, isLate, remarks) VALUES ($1, $2, $3, $4, $5, NOW(), $6, $7, $8)",
      [
        submission_id,
        assignment_id,
        studentQuery.rows[0].fname,
        studentQuery.rows[0].lname,
        scholar_id,
        filePath, // File location
        isLate || false, // Optional: flag if the submission is late
        remarks || "", // Optional: remarks provided by the student
      ]
    );

    return res.status(201).json({
      msg: "Assignment submitted successfully",
      data: {
        submission_id,
        documentUrl: filePath, // The location where the file is stored
        assignment_id,
        submission_time: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error submitting assignment", error: err.message });
  }
};
