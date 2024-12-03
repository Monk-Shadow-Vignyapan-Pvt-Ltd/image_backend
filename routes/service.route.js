import express from "express";
import { addService, getServices, getServiceById, deleteService, updateService,getServicesFrontend,getServicesBeforeAfter} from "../controllers/service.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addService").post( addService);
router.route("/getServices").get( getServices);
router.route("/getServiceById/:id").put( getServiceById);
router.route("/updateService/:id").post( updateService);
router.route("/deleteService/:id").delete(deleteService);
router.route("/getServicesFrontend").get(getServicesFrontend);
router.route("/getServicesBeforeAfter").get(getServicesBeforeAfter);

export default router;