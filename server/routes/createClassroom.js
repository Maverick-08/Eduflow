import { Router } from "express";
import { createClassroomHandler } from "../controllers/createClassroomController.js";

const router = Router();

router.post("/", createClassroomHandler);

export default router;
