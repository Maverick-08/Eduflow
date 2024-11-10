import { Router } from "express";
import {
  markAttendanceHandler,
  updateAttendanceHandler,
} from "../controllers/markAttendanceController.js";

const router = Router();

router.post("/", markAttendanceHandler);
router.patch("/", updateAttendanceHandler);

export default router;
