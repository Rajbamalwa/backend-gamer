import { Router } from "express";
import {
    createContactUs
} from "../controllers/contactUs.controller.js";


const router = Router()

import { isAutheticated,isUser } from "../../../midlewares/authMidlewares.js"

router.route("/create").post(isAutheticated,createContactUs)



export default router