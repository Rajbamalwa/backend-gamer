import { Router } from "express";
import {
    createGround,
    getAllGrounds,
    getGroundDetails
 
    
} from "../controllers/ground.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(isAutheticated,createGround)
router.route("/get-all").get(isAutheticated,getAllGrounds)
router.route("/details/:_id").get(isAutheticated,getGroundDetails)



export default router