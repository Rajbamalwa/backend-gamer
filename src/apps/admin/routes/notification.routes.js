import { Router } from "express";
import {
    createNotification,
    updateNotification,
    deleteNotification,
    getAllNotifications
    
} from "../controllers/notification.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(createNotification)
router.route("/get-all").get(getAllNotifications)
router.route("/delete/:_id").post(deleteNotification)
router.route("/update/:_id").post(updateNotification)



export default router