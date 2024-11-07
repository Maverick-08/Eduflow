import Client from "../config/dbConn.js";
import path from "path"

export const getUploadedAssignmentController=async(req,res)=>{
    try {
      const { class_id } = req.params; 
      // console.log("->>>>>>>>>>>>>>>>>>", class_id)
  
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