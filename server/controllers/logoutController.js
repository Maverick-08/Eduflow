import jwt from 'jsonwebtoken'
import responseCode from "../config/responseCode.js";

export const logoutHandler = async (req, res) => {
    try{
        const token = res.cookie();
        console.log(token);

        return res.json(token)
    } 
    catch(err){
        console.log("@logoutHandler : "+err);
        return res.status(responseCode.internalServerError).json({msg:err.message})
    }
}