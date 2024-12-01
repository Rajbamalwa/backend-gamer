import { Router } from "express";
import {
    createGround,
    getAllGrounds,
    getGroundDetails,
    groundUpdate
    
} from "../controllers/ground.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(createGround)
router.route("/list").get(getAllGrounds)
router.route("/details/:_id").get(getGroundDetails)
router.route("/update/:_id").put(groundUpdate)



export default router