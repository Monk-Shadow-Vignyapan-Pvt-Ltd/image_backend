import express from "express";
import { addMentor, getMentors, getMentorById, deleteMentor, updateMentor} from "../controllers/mentor.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addMentor").post( addMentor);
router.route("/getMentors").get( getMentors);
router.route("/getMentorById/:id").put( getMentorById);
router.route("/updateMentor/:id").post( updateMentor);
router.route("/deleteMentor/:id").delete(deleteMentor);

export default router;