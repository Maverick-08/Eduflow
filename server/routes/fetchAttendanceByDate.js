import { Router } from "express";
import { fetchAttendacneByDatehandler } from "../controllers/fetchAttendacneByDateController.js";
 
const router = Router();

router.post("/", fetchAttendacneByDatehandler);

export default router;
