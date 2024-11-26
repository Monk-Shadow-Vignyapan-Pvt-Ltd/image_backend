import express from "express";
import { addFollowup, getFollowups, getFollowupById, deleteFollowup, updateFollowup} from "../controllers/contact_followup.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addFollowup").post( addFollowup);
router.route("/getFollowups").get( getFollowups);
router.route("/getFollowupById/:id").put( getFollowupById);
router.route("/updateFollowup/:id").post( updateFollowup);
router.route("/deleteFollowup/:id").delete(deleteFollowup);

export default router;