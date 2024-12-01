import { Router } from "express";
import {
    createGameType,
    getAllGameTypes,
    deleteGameTypes
 
    
} from "../controllers/gameType.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(createGameType)
router.route("/get-all").get(getAllGameTypes)
router.route("/delete/:_id").delete(deleteGameTypes)



export default router