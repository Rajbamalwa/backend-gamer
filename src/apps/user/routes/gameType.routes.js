import { Router } from "express";
import {
    getAllGameTypes,
 
    
} from "../controllers/gameType.controller.js";


const router = Router()
import { isAutheticated,authorizedRole } from "../../../midlewares/authMidlewares.js"


router.route("/").get(isAutheticated,authorizedRole('user'),getAllGameTypes)


export default router