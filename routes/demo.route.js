import express from "express";
import { addDemo, getDemos, getDemoById, deleteDemo, updateDemo} from "../controllers/demo.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addDemo").post( addDemo);
router.route("/getDemos").get( getDemos);
router.route("/getDemoById/:id").put( getDemoById);
router.route("/updateDemo/:id").post( updateDemo);
router.route("/deleteDemo/:id").delete(deleteDemo);

export default router;