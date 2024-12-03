import express from "express";
import { addNewsLetter, getNewsLetters} from "../controllers/newsletter.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addNewsLetter").post( addNewsLetter);
router.route("/getNewsLetters").get( getNewsLetters);

export default router;