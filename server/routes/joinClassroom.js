import { Router } from "express";
import { joinClassroomHandler } from "../controllers/joinClassroomController.js";

const router = Router();

router.post("/", joinClassroomHandler);

export default router;
