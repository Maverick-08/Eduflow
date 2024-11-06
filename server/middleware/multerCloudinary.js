import multer from "multer";
import path from "path";

// Set up local file storage configuration
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Define the folder where files should be saved
    callback(null, "uploads/assignments");
  },
  filename: (req, file, callback) => {
    console.log(file);
    const ogName = file.originalname;
    const ext = path.extname(ogName);
    const fileName = ogName.replace(ext, "");
    const compFileName = fileName.split(" ").join("_");
    const lcFileName = compFileName.toLowerCase() + ext; // Changed toLowerCase
    callback(null, lcFileName);
  },
});

// Initialize multer with storage configuration and file type validation
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
