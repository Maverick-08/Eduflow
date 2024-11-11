



export const uploadTimetableHandler = async (req, res) => {
    try {
        const file = req.file; // Multer should populate this with the uploaded file
        console.log("File details: ", file);

        if (!file) {
            return res.status(400).json({ msg: "File upload required" });
        }

        return res.status(200).json({
            msg: "Timetable uploaded successfully",
            data: {
                file // This will return the file object containing details like filename, path, etc.
            },
        });
    } catch (err) {
        console.error("Error uploading timetable:", err);
        return res.status(500).json({ msg: "An error occurred during upload" });
    }
};