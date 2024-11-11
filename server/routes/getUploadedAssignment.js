
import { Router } from "express";
import { getUploadedAssignmentController } from "../controllers/getUploadedAssignmentController.js";


const router = Router();

router.post("/" , getUploadedAssignmentController);

export default router;
  
