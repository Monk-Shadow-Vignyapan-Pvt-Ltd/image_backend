import express from "express";
import { addSurveyAnswer, getSurveyAnswers} from "../controllers/survey_answer.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addSurveyAnswer").post( addSurveyAnswer);
router.route("/getSurveyAnswers").get( getSurveyAnswers);

export default router;