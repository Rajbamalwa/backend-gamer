import { Router } from "express";
import {
    createContactUs
} from "../controllers/contactUs.controller.js";


const router = Router()

import { isAutheticated,authorizedRole } from "../../../midlewares/authMidlewares.js"

router.route("/create").post(isAutheticated,authorizedRole('user'),createContactUs)



export default router