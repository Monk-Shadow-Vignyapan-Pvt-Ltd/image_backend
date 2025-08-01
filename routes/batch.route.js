import express from "express";
import { addBatch, getBatches, getBatchById, deleteBatch, updateBatch} from "../controllers/batch.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addBatch").post( addBatch);
router.route("/getBatches").get( getBatches);
router.route("/getBatchById/:id").put( getBatchById);
router.route("/updateBatch/:id").post( updateBatch);
router.route("/deleteBatch/:id").delete(deleteBatch);

export default router;