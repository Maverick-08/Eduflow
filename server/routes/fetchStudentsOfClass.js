import { Router } from "express";
import { fetchStudentsHandler } from "../controllers/fetchStudentsController.js";

const router = Router();

router.post("/", fetchStudentsHandler);
 
export default router;
