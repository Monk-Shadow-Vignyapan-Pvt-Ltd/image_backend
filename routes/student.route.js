import express from "express";
import { addStudent, getStudents, getStudentById, deleteStudent, updateStudent} from "../controllers/student.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addStudent").post( addStudent);
router.route("/getStudents").get( getStudents);
router.route("/getStudentById/:id").put( getStudentById);
router.route("/updateStudent/:id").post( updateStudent);
router.route("/deleteStudent/:id").delete(deleteStudent);

export default router;