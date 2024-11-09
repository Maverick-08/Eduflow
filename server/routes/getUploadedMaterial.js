import { Router } from "express";
import { getUploadedMaterialController } from "../controllers/getUploadedMaterialController.js";

const router = Router();

router.post("/", getUploadedMaterialController);

export default router;
