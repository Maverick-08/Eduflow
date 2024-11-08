import Client from "../config/dbConn.js";
import path from "path";

export const getUploadedMaterialController = async (req, res) => {
  try {
    const { class_id } = req.body;
    
    if (!class_id) {
      return res.status(400).json({ msg: "class_id is required" });
    }

    const result = await Client.query(
      "SELECT * FROM material WHERE class_id = $1",
      [class_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "No materials found for this class." });
    }

    // Generate the base URL for the uploaded files (assuming your app is hosted on a server)
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/materials/`;

    // Format the response with the full file URL for each material
    const materials = result.rows.map((material) => {
      const filePath = material.documentfile ? material.documentfile.toString() : '';

      return {
        material_id: material.material_id,
        documentUrl: baseUrl + path.basename(filePath), // Ensure filePath is a string
        class_id: material.class_id,
        title: material.title,
        instruction: material.instruction,
      };
    });

    return res.status(200).json({
      msg: "Materials retrieved successfully",
      data: materials,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err.message });
  }
};
