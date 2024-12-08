import { Router } from "express";
import {
    addDetails,
} from "../controllers/userDetails.controller.js";


const router = Router()

import { isAutheticated,isOwner } from "../midlewares/authMidlewares.js";

router.route("/create").post(isAutheticated,addDetails)


export default router