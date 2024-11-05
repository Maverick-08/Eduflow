import express from 'express'
import { uploadAssignmentStudentHandler } from '../controllers/uploadAssignmentStudentHandler';

const router=express.Router();

router.post('/',upload.array('image',3),uploadAssignmentStudentHandler)

export default router;