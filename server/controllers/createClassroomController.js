import bcrypt from 'bcrypt';
import Client from '../config/dbConn.js'; // Assuming you've already set up a PostgreSQL client
import responseCode from '../config/responseCode.js';
import { config } from 'dotenv';
config();

export const createClassroomHandler = async (req, res) => {
    try {
        const { professor_name, department, course, year, isIndividual, class_id, subject_name } = req.body;

        // Validate input fields
        if (!professor_name || !department || !course || !year || isIndividual === undefined || !class_id || !subject_name) {
            return res.status(400).json({ msg: 'All fields are required.' });
        }

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
            subject_name
        ];

        // Execute the query to insert the classroom
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
            class_id, // New classroom's ID
            department, // Department array
            course, // Course array
            year // Year array
        ];

        // Execute the query to update students
        await Client.query(updateStudentQuery, updateValues);

        return res.status(200).json({ msg: 'Classroom created and students updated successfully.' });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
