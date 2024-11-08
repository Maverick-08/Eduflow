import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Auth from "./routes/auth.js";
import Register from "./routes/register.js";
import Logout from "./routes/logout.js";
import createClassroom from "./routes/createClassroom.js";
import joinClassroom from "./routes/joinClassroom.js";
import uploadAssignment from "./routes/uploadAssignment.js";
import uploadMaterial from "./routes/uploadMaterial.js";
import submitAssignment from "./routes/submitAssignment.js";
import submissionlist from "./routes/submissionsList.js";
import fetchClassRoomP from "./routes/fetchClassRoomP.js";
import fetchClassRoomS from "./routes/fetchClassroomofStudent.js";
import fetchStudents from "./routes/fetchStudentsOfClass.js";
import deleteClassroom from "./routes/deleteClassroom.js";
import leaveClassroom from "./routes/leaveClassroom.js";
import getUploadedAssignment from "./routes/getUploadedAssignment.js"
import markAttendance from "./routes/markAttendance.js"


import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.status(200).json({ msg: "working" });
  return;
});

app.use("/auth", Auth);
app.use("/register", Register);
app.use("/logout", Logout);
app.use("/createClassroom", createClassroom);
app.use("/joinClassroom", joinClassroom);
app.use("/uploadAssignment", uploadAssignment);
app.use("/uploadMaterial", uploadMaterial);
app.use("/uploadedAssignment", getUploadedAssignment)
 
app.use("/getPeople", fetchStudents);

app.use("/submitAssignment", submitAssignment)
app.use("/viewSubmissions", submissionlist)
app.use("/fetchClassRoomP", fetchClassRoomP)
app.use("/fetchClassRoomS", fetchClassRoomS)
app.use("/deleteClassroom", deleteClassroom)
app.use("/leaveClassroom", leaveClassroom)
app.use("/markAttendance", markAttendance)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3000, () => {
  console.log("Server is running 3000");
});
