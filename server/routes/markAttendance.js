import { Router } from "express";
import { markAttendanceHandler } from "../controllers/markAttendanceController.js";

const router = Router();

router.post("/", markAttendanceHandler);
 
export default router;
