import Client from "../config/dbConn.js";

const getAttendanceAnalytics = async (req,res) => {
    try{
        const {classId} = req.body;
        console.log(classId)
        if(!classId){
            return res.json({msg:"Class id is missing !"})
        }

        // Get total strength of the class
        let response = await Client.query("SELECT COUNT(*) FROM student WHERE $1 = ANY(class_id)",[classId]);

        const totalStrength = response.rows[0]["count"]

        // Get distinct dates on which class was scheduled
        response = await Client.query("SELECT DISTINCT attendance_date FROM attendance");
    //     [
    // {
    //     "attendance_date": "2024-11-10T18:30:00.000Z"
    //   },
    //   {
    //     "attendance_date": "2024-11-11T18:30:00.000Z"
    //   }
    // ]

        const attendanceDates = [];

        response.rows.map(data => {
            // const date = new Date(data.attendance_date)
            // attendanceDates.push(date.toLocaleDateString());

            attendanceDates.push(data.attendance_date);
        })

        const attendanceMap = [];

        for(let date of attendanceDates){
            let result = await Client.query("SELECT COUNT(scholar_id) FROM attendance WHERE attendance_date = $1",[date]);

            attendanceMap.push({date,count:result.rows[0].count})
        }

        const responseObject = {
            totalStrength,
            attendanceMap
        }

        return res.json(responseObject);
    }
    catch(err){
        console.log("@attendanceAnalyticsController\n"+err);
    }
}

export default getAttendanceAnalytics;