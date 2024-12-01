import { Router } from "express";
import {
    createGameFeature,
    getAllGameFeatures,
    deleteGameFeatures
    
} from "../controllers/gameFeatures.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(createGameFeature)
router.route("/get-all").get(getAllGameFeatures)
router.route("/delete/:_id").delete(deleteGameFeatures)



export default router