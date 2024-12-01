import { Router } from "express";
import {
    createGroundUser,
    loginGroundUser,
 
    
} from "../controllers/groundUser.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(createGroundUser)
router.route("/login").post(loginGroundUser)



export default router