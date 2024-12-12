import express from "express";
import { addCareer, getCareers, getCareerById, deleteCareer, updateCareer} from "../controllers/career.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addCareer").post( addCareer);
router.route("/getCareers").get( getCareers);
router.route("/getCareerById/:id").put( getCareerById);
router.route("/updateCareer/:id").post( updateCareer);
router.route("/deleteCareer/:id").delete(deleteCareer);

export default router;