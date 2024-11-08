import { Router } from "express";
import { uploadMaterialHandler } from "../controllers/uploadMaterialController.js";
import upload from "../middleware/multerMaterial.js";

const router = Router();

router.post("/", upload.single("pdfDocument"), uploadMaterialHandler);

export default router;
