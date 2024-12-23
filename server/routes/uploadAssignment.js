import { Router } from "express";
import { uploadAssignmentHandler } from "../controllers/uploadAssignmentController.js";
import upload from "../middleware/multerAssignment.js";

const router = Router();

router.post("/", upload.single('pdfDocument') , uploadAssignmentHandler);

export default router;
  