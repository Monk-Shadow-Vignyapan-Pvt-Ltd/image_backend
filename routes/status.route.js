import express from "express";
import { addStatus, getStatuses, getStatusById, deleteStatus, updateStatus} from "../controllers/status.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addStatus").post( addStatus);
router.route("/getStatuses").get( getStatuses);
router.route("/getStatusById/:id").put( getStatusById);
router.route("/updateStatus/:id").post( updateStatus);
router.route("/deleteStatus/:id").delete(deleteStatus);

export default router;