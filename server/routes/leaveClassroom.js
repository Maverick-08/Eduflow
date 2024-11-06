import { Router } from "express";
import { leaveClassroomHandler } from "../controllers/leaveClassroomController.js";


const router=Router();
router.post('/',leaveClassroomHandler)
export default router;