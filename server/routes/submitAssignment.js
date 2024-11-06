import { Router } from "express";
import { submitAssignmentHandler } from "../controllers/submitAssignmentController.js";
import upload from "../middleware/multerCloudinary.js";

const router=Router();
router.post('/',upload.array('image',3),submitAssignmentHandler)
export default router;