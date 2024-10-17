import { Router } from "express";
import {
    sendOtp,
    verifyOtp,
    addDetails
    
} from "../controllers/user.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/send-otp").post(sendOtp)
router.route("/verify-otp").post(verifyOtp)
router.route("/add-details").put(isAutheticated,addDetails)






export default router