import { Router } from "express";
import {
    getAllGrounds,
    getGroundDetails,
    createGround
    
} from "../controllers/ground.controller.js";


const router = Router()

import { isAutheticated,isUser } from "../../../midlewares/authMidlewares.js"

router.route("/create").post(isAutheticated,isUser(false),createGround)
router.route("/").post(isAutheticated,isUser(false),getAllGrounds)
router.route("/details/:_id").post(isAutheticated,isUser(false),getGroundDetails)


export default router