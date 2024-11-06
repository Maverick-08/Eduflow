import { Router } from "express";
import { deleteClassRoomhandler } from "../controllers/deleteClassRoomController.js";

const router = Router();

router.post("/", deleteClassRoomhandler);

export default router;
