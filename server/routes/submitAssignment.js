import { Router } from "express";
import { submitAssignmentHandler } from "../controllers/submitAssignmentController.js";
import upload from "../middleware/multerSubmission.js";

const router=Router();
router.post('/',upload.single('pdfDocument'),submitAssignmentHandler)
export default router;