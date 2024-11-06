import { Router } from "express";
import { fetchClassRoomPhandler } from "../controllers/fetchClassRoomPController.js";

const router = Router();

router.post("/", fetchClassRoomPhandler);

export default router;
