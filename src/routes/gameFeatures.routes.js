import { Router } from "express";
import {
    createGameFeature,
    getAllGameFeatures,
 
    
} from "../controllers/gameFeatures.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(createGameFeature)
router.route("/get-all").get(getAllGameFeatures)



export default router