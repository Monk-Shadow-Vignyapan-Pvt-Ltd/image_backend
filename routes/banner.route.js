import express from "express";
import { addBanner, getBanners, getBannerById, deleteBanner, updateBanner} from "../controllers/banner.controller.js";
import {auth} from "../middleware/auth.js"
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addBanner").post( addBanner);
router.route("/getBanners").get( getBanners);
router.route("/getBannerById/:id").put( getBannerById);
router.route("/updateBanner/:id").post( updateBanner);
router.route("/deleteBanner/:id").delete(deleteBanner);

export default router;