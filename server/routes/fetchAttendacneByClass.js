import { Router } from "express";
import { fetchAttendacneByClassShandler } from "../controllers/fetchAttendacneByClassController.js";

const router = Router();

router.post("/", fetchAttendacneByClassShandler);

export default router;
