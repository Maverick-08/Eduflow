import bcrypt from "bcrypt";
import Client from "../config/dbConn.js"; // Assuming you've already set up a PostgreSQL client
import responseCode from "../config/responseCode.js";
import { config } from "dotenv";
config();

// Function to generate class ID
const generateClassId = (professor_name) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `CLASS-${year}${month}${day}`;
};

export const createClassroomHandler = async (req, res) => {
  try {
    const {
      professor_name,
      department,
      course,
      year,
      isIndividual,
      subject_name,
    } = req.body;

    if (
      !professor_name ||
      !department ||
      !course ||
      !year ||
      isIndividual === undefined ||
      !subject_name
    ) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    // Generate the class ID
    const class_id = generateClassId(professor_name);

    // Insert classroom into the database
    const query = `
            INSERT INTO classroom (professor_name, department, course, year, isIndividual, class_id, subject_name)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

    const values = [
      professor_name,
      department,
      course,
      year,
      isIndividual,
      class_id,
      subject_name,
    ];

    await Client.query(query, values);

    // Now update students' class_id who match department, course, and year
    const updateStudentQuery = `
            UPDATE student
            SET class_id = array_append(class_id, $1) 
            WHERE department = ANY($2)
              AND enrolled_course = ANY($3)
              AND current_year = ANY($4)
        `;

    const updateValues = [
      class_id, // Newly generated classroom ID
      department, // Department array
      course, // Course array
      year, // Year array
    ];

    await Client.query(updateStudentQuery, updateValues);

    return res
      .status(200)
      .json({
        msg: "Classroom created and students updated successfully.",
        class_id,
      });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
