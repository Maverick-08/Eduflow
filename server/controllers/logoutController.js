import jwt from 'jsonwebtoken'
import responseCode from "../config/responseCode.js";

export const logoutHandler = async (req, res) => {
    console.log("op");
    try {
        res.clearCookie('jwt', { httpOnly: true }).send();;
    }
    catch (err) {
        console.log("@logoutHandler : " + err);
        return res.status(responseCode.internalServerError).json({ msg: err.message })
    }
}