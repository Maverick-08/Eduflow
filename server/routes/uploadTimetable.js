import { Router } from "express";
import upload from "../middleware/multerTimetable.js";
import { uploadTimetableHandler } from "../controllers/uploadTimetableHandler.js";

const router = Router();

router.post("/", upload.single('file'), uploadTimetableHandler);

export default router;
