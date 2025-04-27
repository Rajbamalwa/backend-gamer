import { Router } from "express";
import {
    verifyGroundOwner
} from "../controllers/onweDetails.controller.js"


const router = Router()

import { isAutheticated } from "../../../midlewares/authMidlewares.js"

router.route("/verify").post(isAutheticated,verifyGroundOwner)


export default router