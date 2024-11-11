import { Router } from "express";
import { deleteAssignmentById } from "../controllers/deleteAssignmentById.js";

const router = Router();

router.delete("/:assignment_id", deleteAssignmentById);

export default router;
