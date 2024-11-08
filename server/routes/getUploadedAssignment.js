
import { Router } from "express";
import { getUploadedAssignmentController } from "../controllers/getUploadedAssignmentController.js";


const router = Router();

router.get("/:class_id" , getUploadedAssignmentController);

export default router;
  
