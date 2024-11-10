import Client from "../config/dbConn.js";
import path from 'path';

export const submitAssignmentHandler = async (req, res) => {
  try {
    const { class_id, assignment_id, scholar_id, fname, lname, isLate } = req.body;
    const files = req.file;

    if (!files || files.length === 0) {
      return res.status(400).json({ msg: "No files uploaded" });
    }

    console.log(files); 
    // {
    //   fieldname: 'pdfDocument',
    //   originalname: 'Cover Letter.pdf',
    //   encoding: '7bit',
    //   mimetype: 'application/pdf',
    //   destination: 'uploads/submissions',
    //   filename: 'cover_letter.pdf',
    //   path: 'uploads\\submissions\\cover_letter.pdf',
    //   path: 'uploads\\submissions\\cover_letter.pdf',
    //   size: 261519
    //   size: 261519
    // }


    // Check If student has already submitted the assignment then delete the previous submission record
    const response = await Client.query(
      "SELECT * FROM submission WHERE class_id = $1 AND assignment_id = $2 AND scholar_id = $3",
      [class_id, assignment_id, scholar_id]
    ); 

    if(response.rows.length != 0){
      await Client.query(
        "DELETE FROM submission WHERE class_id = $1 AND assignment_id = $2 AND scholar_id = $3",
        [class_id, assignment_id, scholar_id]);
    }

    const submission_id  = "SUB-" + Math.floor(Math.random() * 1000);
    const filePath = path.normalize(files.path);
    

    await Client.query("INSERT INTO submission (submission_id, class_id, assignment_id, fname, lname, scholar_id, documentFile, isLate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",[submission_id,class_id,assignment_id,fname,lname,scholar_id,filePath,isLate]);

    return res.json({msg:"Assignment submitted successfully !"});
    
  } catch (err) {
    console.log(err); 
    return res.status(500).json({ msg: err.message }); 
  }
};
