import bcrypt from "bcrypt";
import Client from "../config/dbConn.js"; // PostgreSQL client
import responseCode from "../config/responseCode.js";
import { config } from "dotenv";
config();

// Function to generate class ID
const generateClassId = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, "0");

  return `CLASS-${year}${month}${day}${milliseconds}`;
};

export const createClassroomHandler = async (req, res) => {
  try {
    const {
      email,
      department,
      course,
      year,
      isIndividual,
      subject_name,
    } = req.body;
    const class_id = generateClassId();

    if (!email || !department || !course || !year || isIndividual === undefined || !subject_name) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const professorQuery = `
      SELECT fname, lname, class_id
      FROM professor
      WHERE email = $1
    `;
    const professorResult = await Client.query(professorQuery, [email]);

    if (professorResult.rows.length === 0) {
      return res.status(404).json({ msg: "Professor not found." });
    }

    const { fname, lname, class_id: professorClassIds } = professorResult.rows[0];
    const professor_name = `${fname} ${lname}`;

    const updatedProfessorClassIds = professorClassIds ? [...professorClassIds, class_id] : [class_id];

    const insertClassroomQuery = `
      INSERT INTO classroom (professor_name, department, course, year, isIndividual, class_id, subject_name)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const classroomValues = [
      professor_name,
      department,
      course,
      year,
      isIndividual,
      class_id,
      subject_name,
    ];
    await Client.query(insertClassroomQuery, classroomValues);

    const updateStudentQuery = `
      UPDATE student
      SET class_id = array_append(class_id, $1)
      WHERE department = ANY($2)
        AND enrolled_course = ANY($3)
        AND current_year = ANY($4)
    `;
    const updateStudentValues = [class_id, department, course, year];
    await Client.query(updateStudentQuery, updateStudentValues);

    const updateProfessorQuery = `
      UPDATE professor
      SET class_id = $1
      WHERE email = $2
    `;
    await Client.query(updateProfessorQuery, [updatedProfessorClassIds, email]);

    return res.status(200).json({
      msg: "Classroom created and students updated successfully.",
      class_id,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
