import { Router } from "express";
import { showListofSubmissionsHandler } from "../controllers/showListofSubmissionsController.js";
import gradeSubmissionHandler from "../controllers/gradeSubmission.js";


const router=Router();

router.get('/:classId/:assignmentId',showListofSubmissionsHandler)

router.post("/grade",gradeSubmissionHandler);

export default router;