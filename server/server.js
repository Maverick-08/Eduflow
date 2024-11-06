import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Auth from "./routes/auth.js";
import Register from "./routes/register.js";
import Logout from "./routes/logout.js";
import createClassroom from "./routes/createClassroom.js";
import joinClassroom from "./routes/joinClassroom.js";
import uploadAssignment from "./routes/uploadAssignment.js";
import submitAssignment from "./routes/submitAssignment.js";
import submissionlist from "./routes/submissionsList.js";
import fetchClassRoomP from "./routes/fetchClassRoomP.js";
import fetchStudents from "./routes/fetchStudentsOfClass.js";

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
app.use("/getPeople", fetchStudents);
  
app.use("/submitAssignment",submitAssignment)
app.use("/viewSubmissions",submissionlist)
app.use("/fetchClassRoomP",fetchClassRoomP)


app.listen(3000, () => {
  console.log("Server is running 3000");
});
