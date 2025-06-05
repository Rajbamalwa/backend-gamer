import { Router } from "express";
import {
    createGround,
    getAllGrounds,
    getGroundDetails,
    groundUpdate,
    groundDelete,
    ownerGround
    
} from "../controllers/ground.controller.js";


const router = Router()

import { isAutheticated,authorizedRole } from "../../../midlewares/authMidlewares.js"

router.route("/create").post(isAutheticated,createGround)
router.route("/list").get(isAutheticated,ownerGround)
router.route("/details").post(isAutheticated,getGroundDetails)
router.route("/update").post(isAutheticated,groundUpdate)
router.route("/delete").post(isAutheticated,groundDelete)
// router.route("/list-owner").post(isAutheticated,isUser(false),ownerGround)



export default router