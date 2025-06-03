import { Router } from "express";
import {
    createGameFeature,
    getAllGameFeatures,
    deleteGameFeatures
    
} from "../controllers/gameFeatures.controller.js";


const router = Router()

import { isAutheticated,authorizedRole } from "../../../midlewares/authMidlewares.js"

router.route("/create").post(isAutheticated,createGameFeature)
router.route("/get-all").get(isAutheticated,getAllGameFeatures)
router.route("/delete/:_id").post(isAutheticated,deleteGameFeatures)



export default router