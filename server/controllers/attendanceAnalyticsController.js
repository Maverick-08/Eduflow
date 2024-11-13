import Client from "../config/dbConn.js";

const getAttendanceAnalytics = async (req, res) => {
    try {
        const { classId } = req.body;
        console.log(classId);
        if (!classId) {
            return res.json({ msg: "Class id is missing!" });
        }

        // Get total strength of the class
        let response = await Client.query(
            "SELECT COUNT(*) FROM student WHERE $1 = ANY(class_id)", 
            [classId]
        );
        const totalStrength = response.rows[0]["count"];

        // Get distinct dates on which class was scheduled
        response = await Client.query("SELECT DISTINCT attendance_date FROM attendance");
        
        const attendanceDates = response.rows.map(data => data.attendance_date);

        const attendanceMap = [];

        for (let date of attendanceDates) {
            // Count only the students marked as present (`status = TRUE`)
            let result = await Client.query(
                "SELECT COUNT(scholar_id) FROM attendance WHERE attendance_date = $1 AND class_id = $2 AND status = TRUE", 
                [date, classId]
            );

            attendanceMap.push({ date, count: result.rows[0].count });
        }

        const responseObject = {
            totalStrength,
            attendanceMap
        };

        return res.json(responseObject);
    } catch (err) {
        console.log("@attendanceAnalyticsController\n" + err);
    }
};

export default getAttendanceAnalytics;
