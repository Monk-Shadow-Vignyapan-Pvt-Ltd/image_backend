import express from "express";
import { addPlacement, getPlacements, getPlacementById, deletePlacement, updatePlacement} from "../controllers/placement.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addPlacement").post( addPlacement);
router.route("/getPlacements").get( getPlacements);
router.route("/getPlacementById/:id").put( getPlacementById);
router.route("/updatePlacement/:id").post( updatePlacement);
router.route("/deletePlacement/:id").delete(deletePlacement);

export default router;