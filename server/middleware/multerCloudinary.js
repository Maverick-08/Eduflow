import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import path from "path";
import cloudinary from "../config/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const format = file.mimetype.split("/")[1];
    
    return {
      folder: "assignments",
      format: format,
      public_id: `${Date.now()}-${file.originalname}`, // Fixed template literal
    };
  },
  filename: (req, file, callback) => {
    console.log(file);
    const ogName = file.originalname;
    const exte = path.extname(ogName);
    const fileName = ogName.replace(exte, "");
    const compFileName = fileName.split(" ").join("_");
    const lcFileName = compFileName.toLowerCase() + exte; // Changed toLowerCase
    callback(null, lcFileName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("File type not allowed"), false); // Corrected syntax for error callback
    }
  },
});

export default upload;
