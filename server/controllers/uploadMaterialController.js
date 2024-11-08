import Client from "../config/dbConn.js";

export const uploadMaterialHandler = async (req, res) => {
  try {
    let { classID : class_id, title, instructions : instruction } = req.body;
    console.log(class_id , title  , instruction);

    const file = req.file;
    console.log("opopo :: ", req.body)
    if (!file) {
      return res.status(400).json({ msg: "File upload required" });
    }

    // Generate unique Material ID
    const material_id = `MAT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const documentFile = `uploads/materials/${file.filename}`;


    // Insert Material record into the database
    await Client.query(
      "INSERT INTO material (material_id, documentFile, class_id, title, instruction) VALUES ($1, $2, $3, $4, $5)",
      [material_id, documentFile, class_id, title, instruction]
    );

    // Return success response with Material data
    return res.status(200).json({
      msg: "Material uploaded successfully",
      data: {
        material_id,
        documentFile,
        class_id,
        title,
        instruction
  
      },
    });
  } catch (err) {
    console.error("Error uploading Material:", err);
    return res.status(500).json({ msg: "An error occurred during upload" });
  }
};

