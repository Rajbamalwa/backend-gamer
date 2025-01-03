import { Router } from "express";
import {
    // sendOtp,
    // verifyOtp,
    
} from "../controllers/user.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

// router.route("/send-otp").post(sendOtp)
// router.route("/verify-otp").post(verifyOtp)






export default router