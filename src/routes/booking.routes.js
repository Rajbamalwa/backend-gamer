import { Router } from "express";
import {
    createBooking,
    allBooking
} from "../controllers/booking.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(isAutheticated,createBooking)
router.route("/booking-list").get(isAutheticated,allBooking)

export default router