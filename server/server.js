import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Auth from './routes/auth.js';
import Register from './routes/register.js';
import createClassroom from './routes/createClassroom.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/test",(req,res)=>{
    res.status(200).json({"msg":"working"});
    return;
})

app.use("/auth", Auth);

app.use("/register", Register);

app.use('/createClassroom',createClassroom)

app.listen(3000,()=>{
    console.log("Server is running");
})