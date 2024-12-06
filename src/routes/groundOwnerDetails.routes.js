import { Router } from "express";
import {
    registerGroundOwner
} from "../controllers/groundOwnerDetails.controller.js"


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/register-ground-owner").post(registerGroundOwner)


export default router