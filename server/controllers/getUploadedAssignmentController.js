import Client from "../config/dbConn.js";
import path from "path"

export const getUploadedAssignmentController=async(req,res)=>{
    try {
      const { classId, scholarId } = req.body; 
      // console.log("->>>>>>>>>>>>>>>>>>", classId)
  
      if (!classId) {
        return res.status(400).json({ msg: "classId is required" });
      }

      if (!scholarId) {
        return res.status(400).json({ msg: "scholarId is required" });
      }
  
      const result = await Client.query(
        "SELECT * FROM assignment WHERE class_id = $1", 
        [classId]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ msg: "No assignments found for this class." });
      }

      const response = await Client.query("SELECT * FROM submission WHERE class_id = $1 AND scholar_id = $2",[classId,scholarId]);

      const assignmentSubmittedDetails = response.rows

      const data = [];

      const baseUrl = `${req.protocol}://${req.get('host')}/uploads/assignments/`;

      for(let i=0;i<result.rows.length;++i){
        let assignment = result.rows[i];
        const obj = {
          "assignment_id":assignment.assignment_id,
          "classId":classId,
          "documentUrl": baseUrl + path.basename(assignment.documentfile),
          "deadline": assignment.deadline,
          "title": assignment.title,
          "instruction": assignment.instruction,
          "totalGrade": assignment.grade,
          "submitted":false,
          "receivedGrade":null
        };

        for(let j=0;j<assignmentSubmittedDetails.length;++j){
          let submission = assignmentSubmittedDetails[j];

          if(assignment.assignment_id == submission.assignment_id){
            obj["submitted"] = true,
            obj["receivedGrade"] = submission.grade
          }

        }

        data.push(obj);
      }
  
      return res.status(200).json({data});

    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err.message });
    }
  }