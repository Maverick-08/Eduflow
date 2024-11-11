import Client from "../config/dbConn.js";
import responseCode from "../config/responseCode.js";

const gradeSubmissionController = async (req,res) => {
    try{
        const {assignmentId,scholarId,grade} = req.body;
        // console.log(req.body);
        if(!assignmentId || !scholarId || !grade){
            return res.status(responseCode.badRequest).json({msg:"Invalid payload"})
        }

        const response = await Client.query("UPDATE submission SET grade = $1 WHERE scholar_id = $2 AND assignment_id = $3",[grade,scholarId,assignmentId]);

        // console.log(response);

        return res.sendStatus(responseCode.successful);
    }catch(err){
        console.log("@gradeSubmissionController\n"+err);
    }
}

export default gradeSubmissionController;