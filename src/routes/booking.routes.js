import { Router } from "express";
import {
    createBooking,
    allBooking,
    bookingDetails,
    groundOwnerBookig
} from "../controllers/booking.controller.js";


const router = Router()

import { isAutheticated,isUser } from "../midlewares/authMidlewares.js";

router.route("/create").post(isAutheticated,isUser(true),createBooking)
router.route("/user-bookings").get(isAutheticated,isUser(true),allBooking)
router.route("/user-booking-details/:bookingId").get(isAutheticated,isUser(true),bookingDetails)
router.route("/owner-bookings/:ownerId").get(isAutheticated,isUser(false),groundOwnerBookig)

export default router