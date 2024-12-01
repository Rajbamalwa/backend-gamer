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

router.route("/create").post(createGround)
router.route("/list").get(getAllGrounds)
router.route("/details/:_id").get(getGroundDetails)
router.route("/update/:_id").post(groundUpdate)
router.route("/delete/:_id").post(groundDelete)



export default router