import { Router } from "express";
import {
    createGround,
    getAllGrounds,
    getGroundDetails,
    groundUpdate,
    groundDelete
    
} from "../controllers/ground.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(isAutheticated,createGround)
router.route("/list").get(isAutheticated,getAllGrounds)
router.route("/details/:_id").get(isAutheticated,getGroundDetails)
router.route("/update/:_id").post(isAutheticated,groundUpdate)
router.route("/delete/:_id").post(isAutheticated,groundDelete)



export default router