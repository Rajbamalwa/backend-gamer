import { Router } from "express";
import {
    getAllGrounds,
    getGroundDetails,
    createGround
    
} from "../controllers/ground.controller.js";


const router = Router()

import { isAutheticated,isUser } from "../../../midlewares/authMidlewares.js"

router.route("/create").post(isAutheticated,createGround)
router.route("/").post(isAutheticated,getAllGrounds)
router.route("/details").post(isAutheticated,getGroundDetails)


export default router