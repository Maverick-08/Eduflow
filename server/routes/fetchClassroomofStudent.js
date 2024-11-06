import { Router } from "express";
import { fetchClassRoomShandler } from "../controllers/fetchClassRoomSController.js";

const router = Router();

router.post("/", fetchClassRoomShandler);

export default router;
