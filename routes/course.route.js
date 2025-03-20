import express from "express";
import { addCourse, getCourses, getCourseById, deleteCourse, updateCourse,cloneCourse} from "../controllers/course.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addCourse").post( addCourse);
router.route("/getCourses").get( getCourses);
router.route("/getCourseById/:id").put( getCourseById);
router.route("/updateCourse/:id").post( updateCourse);
router.route("/deleteCourse/:id").delete(deleteCourse);
router.route("/cloneCourse/:id").post( cloneCourse);

export default router;