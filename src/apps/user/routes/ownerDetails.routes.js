import { Router } from "express";
import {
    registerGroundOwner
} from "../controllers/ownerDetails.controller.js"


const router = Router()

import { isAutheticated,isUser } from "../../../midlewares/authMidlewares.js"

router.route("/register").post(isAutheticated,registerGroundOwner)


export default router