import { Router } from "express";
import getAttendanceAnalytics from "../controllers/attendanceAnalyticsController.js";

const router = Router();

router.post("/attendance",getAttendanceAnalytics);

export default router;