import express from "express";
import { addSeo, getAllSeo, getSeoById,getSeoByPageName, deleteSeo, updateSeo} from "../controllers/seo.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addSeo").post( addSeo);
router.route("/getAllSeo").get( getAllSeo);
router.route("/getSeoById/:id").put( getSeoById);
router.route("/getSeoByPageName/:pageName").get( getSeoByPageName);
router.route("/updateSeo/:id").post( updateSeo);
router.route("/deleteSeo/:id").delete(deleteSeo);

export default router;