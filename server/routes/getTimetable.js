
import { Router } from "express";
import { getTimetable } from "../controllers/getTimetable.js";


const router = Router();

router.get("/:filename", getTimetable);

export default router;

