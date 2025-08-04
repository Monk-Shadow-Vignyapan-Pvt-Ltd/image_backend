import express from "express";
import {
  addTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag
} from "../controllers/tag.controller.js";

const router = express.Router();

router.route("/addTag").post(addTag);
router.route("/getTags").get(getTags);
router.route("/getTagById/:id").put(getTagById);
router.route("/deleteTag/:id").delete(deleteTag);
router.route("/updateTag/:id").post(updateTag);

export default router;
