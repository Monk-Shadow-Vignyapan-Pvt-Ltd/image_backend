import express from "express";
import { addFaq, getFaqs, getFaqById, deleteFaq, updateFaq} from "../controllers/faq.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addFaq").post( addFaq);
router.route("/getFaqs").get( getFaqs);
router.route("/getFaqById/:id").put( getFaqById);
router.route("/updateFaq/:id").post( updateFaq);
router.route("/deleteFaq/:id").delete(deleteFaq);

export default router;