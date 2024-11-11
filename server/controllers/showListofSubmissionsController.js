import Client from "../config/dbConn.js";
import responseCode from "../config/responseCode.js";

export const showListofSubmissionsHandler = async (req, res) => {
  try {
    const { classId,assignmentId } = req.params;
    
    
    if(!classId && !assignmentId){
      return res.status(responseCode.badRequest).json({msg:"Class Id or Assignment Id is missing !"})
    }

    // Fetch the list of all the students in the class
    let response =  await Client.query(
      "SELECT * FROM student WHERE $1 = ANY(class_id)",
      [classId]
    )
    
    const studentsList = response.rows;

    response = await Client.query(
      "SELECT * FROM submission WHERE class_id = $1 AND assignment_id = $2",
      [classId, assignmentId]
    );

    const submissionList = response.rows;

    // console.log("Submission List : ",submissionList);

    let submissionMap = {};

    for(let i=0;i<submissionList.length;++i){
      submissionMap[`${submissionList[i].scholar_id}`] = i;
    }
    
    const data = [];

    for(let i=0;i<studentsList.length;++i){
      let studentData = { 
        "name": studentsList[i].fname + " "+studentsList[i].lname,
        "scholarId": studentsList[i].scholar_id,
        "assignedGrade": null
      }

      if(studentsList[i].scholar_id in submissionMap){
        studentData["submitted"] = true;
        studentData["isLate"] = submissionList[submissionMap[studentsList[i].scholar_id]].islate;
        studentData["assignedGrade"] = submissionList[submissionMap[studentsList[i].scholar_id]].grade;
      }
      else{
        studentData["submitted"] = false;
        studentData["isLate"] = null;
      }


      data.push(studentData);
    }
    

    return res.json({data});
    
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
