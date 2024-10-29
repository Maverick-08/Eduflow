import { Router } from "express";
import { uploadAssignmentHandler } from "../controllers/uploadAssignmentController.js";
import upload from "../middleware/multerCloudinary.js";

const router = Router();

router.post("/", upload.array("image", 3), uploadAssignmentHandler);

export default router;
