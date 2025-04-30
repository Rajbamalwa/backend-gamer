import { Router } from "express";
import {

    getAllNotifications
    
} from "../controllers/notification.controller.js";


const router = Router()

import { isAutheticated,isUser } from "../../../midlewares/authMidlewares.js"

router.route("/").get(getAllNotifications)



export default router