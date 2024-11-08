import { Router } from "express";
import { getUploadedMaterialController } from "../controllers/getUploadedMaterialController.js";

const router = Router();

router.get("/", getUploadedMaterialController);

export default router;
