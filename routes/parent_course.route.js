import express from "express";
import { addParentCourse, getParentCourses, getParentCourseById, deleteParentCourse, updateParentCourse} from "../controllers/parent_course.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addParentCourse").post( addParentCourse);
router.route("/getParentCourses").get( getParentCourses);
router.route("/getParentCourseById/:id").put( getParentCourseById);
router.route("/updateParentCourse/:id").post( updateParentCourse);
router.route("/deleteParentCourse/:id").delete(deleteParentCourse);

export default router;