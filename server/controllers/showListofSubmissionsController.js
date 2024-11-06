import Client from "../config/dbConn.js";

export const showListofSubmissionsHandler = async (req, res) => {
  try {
    const { assignment_id } = req.params;
    

    const assignmentQuery = `
      SELECT deadline 
      FROM assignment 
      WHERE assignment_id = $1
    `;
    const assignmentResult = await Client.query(assignmentQuery, [assignment_id]);
    
    if (assignmentResult.rows.length === 0) {
      return res.status(404).json({ msg: "Assignment not found" });
    }

    const deadline = assignmentResult.rows[0].deadline;

    const submissionsQuery = `
      SELECT CONCAT(fname, ' ', lname) AS name, 
             CASE 
               WHEN submission_time > $1 THEN 'Yes' 
               ELSE 'No' 
             END AS isLate
      FROM submission
      WHERE assignment_id = $2
    `;
    const submissionsResult = await Client.query(submissionsQuery, [deadline, assignment_id]);

    return res.status(200).json({
      submissions: submissionsResult.rows,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
