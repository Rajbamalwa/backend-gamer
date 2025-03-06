import { Router } from "express";
import {
    toggleLikeGround,
    getAllLikeGround
} from "../controllers/like.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/:groundId").post(isAutheticated,toggleLikeGround)
router.route("/liked-grounds").get(isAutheticated,getAllLikeGround)



export default router