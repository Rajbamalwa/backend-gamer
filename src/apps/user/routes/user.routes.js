import { Router } from "express";
import {
    loginUser
} from "../controllers/user.controller.js";


const router = Router()

import { isAutheticated,isUser } from "../../../midlewares/authMidlewares.js"

router.route("/login").post(loginUser)

export default router