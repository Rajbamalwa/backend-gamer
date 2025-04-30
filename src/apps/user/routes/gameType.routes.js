import { Router } from "express";
import {
    getAllGameTypes,
 
    
} from "../controllers/gameType.controller.js";


const router = Router()

router.route("/").get(getAllGameTypes)


export default router