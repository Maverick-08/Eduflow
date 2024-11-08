import Client from "../config/dbConn.js";

export const uploadMaterialHandler = async (req, res) => {
  try {
    let { class_id, title, instruction } = req.body;


    const file = req.file; // Assuming a single file upload
    console.log("opopo :: ", req.body)
    if (!file) {
      return res.status(400).json({ msg: "File upload required" });
    }

    // Generate unique Material ID
    const material_id = `MAT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const documentfile = `uploads/materials/${file.filename}`;

    console.log("tatti :: ", material_id, documentfile, class_id, title, instruction)

    // Insert Material record into the database
    await Client.query(
      "INSERT INTO material (material_id, documentFile, class_id, title, instruction) VALUES ($1, $2, $3, $4, $5)",
      [material_id, documentfile, class_id, title, instruction]
    );

    // Return success response with Material data
    return res.status(200).json({
      msg: "Material uploaded successfully",
      data: {
        material_id,
        documentfile,
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

