import express from "express";
import { addCourse, getCourses, getCourseById,getCourseByUrl, deleteCourse, updateCourse,cloneCourse,getCourseImage} from "../controllers/course.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addCourse").post( addCourse);
router.route("/getCourses").get( getCourses);
router.route("/getCourseById/:id").put( getCourseById);
router.route("/getCourseByUrl/:id").put( getCourseByUrl);
router.route("/updateCourse/:id").post( updateCourse);
router.route("/deleteCourse/:id").delete(deleteCourse);
router.route("/cloneCourse/:id").post( cloneCourse);
router.route("/getCourseImage/:id").get(getCourseImage);

export default router;