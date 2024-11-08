import { Router } from "express";
import { showListofSubmissionsHandler } from "../controllers/showListofSubmissionsController.js";
import upload from "../middleware/multerAssignment.js";

const router=Router();
router.get('/:assignment_id',upload.array('image',3),showListofSubmissionsHandler)
export default router;