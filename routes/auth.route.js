import express from "express";
import {auth} from "../middleware/auth.js"
import { addUser, login, tokenIsValid, getUser,getUsers,updateUser,deleteUser} from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/addUser").post( addUser);
router.route("/login").post( login);
router.route("/tokenIsValid").post( tokenIsValid);
router.route("/getUser").get(auth, getUser);
router.route("/getUsers").get( getUsers);
router.route("/updateUser/:id").post( updateUser);
router.route("/deleteUser/:id").delete( deleteUser);

export default router;
