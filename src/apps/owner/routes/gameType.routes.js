import { Router } from "express";
import {
    createGameType,
    getAllGameTypes,
    deleteGameTypes
 
    
} from "../controllers/gameType.controller.js";


const router = Router()

import { isAutheticated,authorizedRole } from "../../../midlewares/authMidlewares.js"

router.route("/create").post(isAutheticated,createGameType)
router.route("/get-all").get(isAutheticated,getAllGameTypes)
router.route("/delete/:_id").post(isAutheticated,deleteGameTypes)



export default router