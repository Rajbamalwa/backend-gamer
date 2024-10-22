import { Router } from "express";
import {
    createGameFeature,
    getAllGameFeatures,
 
    
} from "../controllers/gameFeatures.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(isAutheticated,createGameFeature)
router.route("/get-all").get(isAutheticated,getAllGameFeatures)



export default router