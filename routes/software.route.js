import express from "express";
import { addSoftware, getSoftwares,getAllSoftwares, getSoftwareById, deleteSoftware, updateSoftware} from "../controllers/software.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addSoftware").post( addSoftware);
router.route("/getSoftwares").get( getSoftwares);
router.route("/getAllSoftwares").get( getAllSoftwares);
router.route("/getSoftwareById/:id").put( getSoftwareById);
router.route("/updateSoftware/:id").post( updateSoftware);
router.route("/deleteSoftware/:id").delete(deleteSoftware);

export default router;