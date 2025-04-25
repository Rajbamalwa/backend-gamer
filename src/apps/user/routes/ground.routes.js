import { Router } from "express";
import {
    getAllGrounds,
    getGroundDetails,
   
    
} from "../controllers/ground.controller.js";


const router = Router()

import { isAutheticated,isUser } from "../../../midlewares/authMidlewares.js"


router.route("/").post(isAutheticated,getAllGrounds)
router.route("/details/:_id").post(isAutheticated,getGroundDetails)


export default router