import { Router } from "express";
import {
    addDetails,
    getUserDetailsById
} from "../controllers/userDetails.controller.js";


const router = Router()

import { isAutheticated,isUser } from "../../../midlewares/authMidlewares.js"

router.route("/create").post(isAutheticated,isUser(true),addDetails)
router.route("/").get(isAutheticated,getUserDetailsById)


export default router