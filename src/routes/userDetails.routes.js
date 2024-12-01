import { Router } from "express";
import {
    addDetails
    
} from "../controllers/userDetails.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(addDetails)


export default router