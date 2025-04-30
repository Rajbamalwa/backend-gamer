import { Router } from "express";
import {
    toggleLikeGround,
    getAllLikeGround
} from "../controllers/like.controller.js";


const router = Router()

import { isAutheticated,isUser } from "../../../midlewares/authMidlewares.js"

router.route("/").post(isAutheticated,toggleLikeGround)
router.route("/likes").get(isAutheticated,getAllLikeGround)



export default router