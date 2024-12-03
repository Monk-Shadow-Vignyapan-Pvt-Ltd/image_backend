import express from "express";
import { addSurvey, getSurveys, getSurveyById, deleteSurvey, updateSurvey} from "../controllers/survey.controller.js";
import { surveyOnOff,getSurveyOnOff } from "../controllers/surveyonoff.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addSurvey").post( addSurvey);
router.route("/getSurveys").get( getSurveys);
router.route("/getSurveyById/:id").put( getSurveyById);
router.route("/updateSurvey/:id").post( updateSurvey);
router.route("/deleteSurvey/:id").delete(deleteSurvey);
router.route("/surveyOnOff").post( surveyOnOff);
router.route("/getSurveyOnOff").get(getSurveyOnOff);

export default router;