import express from "express";
import { addTestimonial, getTestimonials, getTestimonialById, deleteTestimonial, updateTestimonial} from "../controllers/testimonial.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addTestimonial").post( addTestimonial);
router.route("/getTestimonials").get( getTestimonials);
router.route("/getTestimonialById/:id").put( getTestimonialById);
router.route("/updateTestimonial/:id").post( updateTestimonial);
router.route("/deleteTestimonial/:id").delete(deleteTestimonial);

export default router;