import { Router } from "express";
import { fetchClassRoomPhandler } from "../controllers/fetchClassRoomPController.js";

const router = Router();

router.get("/", fetchClassRoomPhandler);

export default router;
