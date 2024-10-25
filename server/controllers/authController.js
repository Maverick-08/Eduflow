import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import responseCode from '../config/responseCode.js';
import { config } from 'dotenv';
import Client from '../config/dbConn.js';
config();

export const authHandler = async (req, res) => {
    try {
        const payload = req.body;

        // Data validation
        if (!payload.email || !payload.password ) {
            return res.status(responseCode.badRequest).json({ msg: "Missing email or password !" });
        }

        // Validate if the user mail is associated with the institution
        const isEmailvalid = payload.email.indexOf("@stu.manit.ac.in") != -1 ||payload.email.indexOf("@prof.manit.ac.in") != -1 

        if(!isEmailvalid){
            return res.status(responseCode.badRequest).json({ msg: "Invalid User" });
        }

        let userExists;
        // Check if the user exists in the student database 
        if(payload.email.indexOf("@stu.manit.ac.in") != -1){
            userExists = await Client.query('SELECT * FROM student WHERE email = $1',[payload.email])
        }

        // Check if the user exists in the professor database
        if(payload.email.indexOf("@prof.manit.ac.in") != -1){
            userExists = await Client.query('SELECT * FROM professor WHERE email = $1',[payload.email])
        }

        // If the email is valid and it does not exist in the database
        if(userExists.rows.length == 0){
            return res.status(responseCode.badRequest).json({msg:"The email is not registered !"})
        }


        // If the user exists in our database compare the stored password
        const user = userExists.rows[0];
        const isPasswordValid = await bcrypt.compare(payload.password, user.user_password);

        if(!isPasswordValid){
            return res.status(responseCode.unauthorised).json({msg:"Invalid Password"});
        }

        // If email and password are correct then generate jwt token
        const token = jwt.sign(
            {
            username: user.fname +" "+user.lname,
            email: user.email,
            createdAt: user.created_at
            },
            process.env.TOKEN_SECRET_KEY,
            {expiresIn:'30d'}
        )

        // Store the token in the database
        if(payload.email.indexOf("@prof.manit.ac.in") != -1){
            await Client.query('UPDATE professor SET refresh_token = $1 WHERE email = $2',[token,payload.email])
        }

        if(payload.email.indexOf("@stu.manit.ac.in") != -1){
            await Client.query('UPDATE student SET refresh_token = $1 WHERE email = $2',[token,payload.email])
        }

        res.cookie('jwt', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

        return res.json({status:"Logged In",token})
    }
    catch (err) {
        console.log("@authHandler : \n" + err);
        return res.sendStatus(responseCode.internalServerError);
    }
}