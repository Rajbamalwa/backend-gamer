import { Router } from "express";
import {
    createBooking
} from "../controllers/booking.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(isAutheticated,createBooking)

export default router