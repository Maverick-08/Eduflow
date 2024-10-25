import { Router } from "express";
import { createAssignmentHandler } from "../controllers/createAssignmentController.js";

const router = Router();

router.post("/", createAssignmentHandler)

export default router;