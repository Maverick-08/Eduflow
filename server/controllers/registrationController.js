import bcrypt from 'bcrypt';
import Client from '../config/dbConn.js';
import responseCode from '../config/responseCode.js';
import { config } from 'dotenv';
config();

export const registrationHandler = async (req,res) => {
    try{
        const payload = req.body;

        if(!payload || !payload.user_type || !payload.fname || !payload.lname || !payload.gender || !payload.email || !payload.password){
            return res.status(responseCode.badRequest).json({msg:"Missing data"})
        }

        // Validate data for Regular Student
        if(payload.user_type == "Regular Student"){

            if(!payload.scholar_id || !payload.department || !payload.enrolled_course || !payload.current_year){
                return res.status(responseCode.badRequest).json({msg:"Missing data for student user."})
            }

            // validate email
            const isStudentEmailValid = payload.email.indexOf("@stu.manit.ac.in") == -1 ? false : true;

            if(!isStudentEmailValid){
                return res.status(responseCode.forbidden).json({msg:"Unauthorized"})
            }
        }

        // Validate data for Guest Student
        if(payload.user_type == "Guest Student"){

            // validate email
            const isGuestStudentEmailValid = payload.email.indexOf("@stu.manit.ac.in") == -1 ? false : true;

            if(!isGuestStudentEmailValid){
                return res.status(responseCode.forbidden).json({msg:"Unauthorized"})
            }
        }

        // Validate data for Faculty Member
        if(payload.user_type == "Faculty Member"){
            if(!payload.experience_level || !payload.department ){
                return res.status(responseCode.badRequest).json({msg:"Missing data for professor user"})
            }
            // validate email
            const isProfessorEmailValid = payload.email.indexOf("@prof.manit.ac.in") == -1 ? false : true;

            if(!isProfessorEmailValid){
                return res.status(responseCode.forbidden).json({msg:"Unauthorized"})
            }
        }

        // Validate data for Guest Lecturer
        if(payload.user_type == "Guest Lecturer"){

            // validate email
            const isGuestLecturerEmailValid = payload.email.indexOf("@prof.manit.ac.in") == -1 ? false : true;

            if(!isGuestLecturerEmailValid){
                return res.status(responseCode.forbidden).json({msg:"Unauthorized"})
            }
        }

        // Encrypt Password
        const encryptedPassword = await bcrypt.hash(payload.password,10);

        // Insert data of Regular Student
        if(payload.user_type == "Regular Student"){
        
            await Client.query('INSERT INTO student(fname, lname, gender, email, user_password, scholar_id, user_type, department, enrolled_course, current_year) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',[payload.fname, payload.lname, payload.gender, payload.email, encryptedPassword, payload.scholar_id, payload.user_type, payload.department, payload.enrolled_course, payload.current_year])

            return res.json({msg:"Registered"})
        }

        // Insert data of Guest Student
        if(payload.user_type == "Guest Student"){
            // Create temporary scholar id
            const tempScholarId = "G-" + Math.floor(Math.random() * 100000000);

            await Client.query('INSERT INTO student(fname, lname, gender, email, user_password, scholar_id, user_type, department, enrolled_course, current_year) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',[payload.fname, payload.lname, payload.gender, payload.email, encryptedPassword, tempScholarId, payload.user_type, payload.department, payload.enrolled_course, 1])

            return res.json({msg:"Registered",scholar_id:tempScholarId})
        }

        // Insert data of Faculty Member
        if(payload.user_type == "Faculty Member"){

            await Client.query('INSERT INTO professor(fname, lname, gender, email, user_password, user_type, experience_level, department) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',[payload.fname, payload.lname, payload.gender, payload.email, encryptedPassword, payload.user_type, payload.experience_level, payload.department])

            return res.json({msg:"Registered"})
        }

        // Insert data of Guest Lecturer
        if(payload.user_type == "Guest Lecturer"){
            await Client.query('INSERT INTO professor(fname, lname, gender, email, user_password, user_type, experience_level, department) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',[payload.fname, payload.lname, payload.gender, payload.email, encryptedPassword, payload.user_type, payload.experience_level, payload.department])

            return res.json({msg:"Registered"});
        }

        return ;
    }
    catch(err){
        console.log("@registrationHandler : \n" + err);
        return res.status(responseCode.internalServerError).json({msg:err.message});
    }
}