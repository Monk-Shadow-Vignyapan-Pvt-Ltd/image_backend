import express from "express";
import { addStudentPlaced, getStudentsPlaced, getStudentById, deleteStudentPlaced, updateStudentPlaced} from "../controllers/studentsPlaced.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addStudentPlaced").post( addStudentPlaced);
router.route("/getStudentsPlaced").get( getStudentsPlaced);
router.route("/getStudentById/:id").put( getStudentById);
router.route("/updateStudentPlaced/:id").post( updateStudentPlaced);
router.route("/deleteStudentPlaced/:id").delete(deleteStudentPlaced);

export default router;