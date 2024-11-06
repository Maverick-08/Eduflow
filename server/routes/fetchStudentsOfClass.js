import { Router } from "express";
import { fetchStudentsHandler } from "../controllers/fetchStudentsController.js";

const router = Router();

router.get("/:class_id", fetchStudentsHandler);
 
export default router;
