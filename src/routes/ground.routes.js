import { Router } from "express";
import {
    createGround,
    getAllGrounds,
    getGroundDetails
 
    
} from "../controllers/ground.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(createGround)
router.route("/list").get(getAllGrounds)
router.route("/details/:_id").get(getGroundDetails)



export default router