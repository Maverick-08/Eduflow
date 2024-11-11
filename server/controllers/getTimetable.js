
import { config } from "dotenv";
import path from 'path'
config();

export const getTimetable = async (req, res) => {
    const { filename } = req.params;
    console.log(filename)

    // Build the file path to access the image
    const filePath = path.join(__dirname, "uploads/timetable/", filename);

    // Check if file exists
    fs.exists(filePath, (exists) => {
        if (exists) {
            res.sendFile(filePath);
        } else {
            res.status(404).json({ message: "File not found" });
        }
    });
};
