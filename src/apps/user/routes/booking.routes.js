import { Router } from "express";
import {
    createBooking,
    allBooking,
    bookingDetails,
    groundOwnerBookig,
    getBooking
} from "../controllers/booking.controller.js";


const router = Router()

import { isAutheticated,isUser } from "../../../midlewares/authMidlewares.js"

router.route("/create").post(isAutheticated,isUser(true),createBooking)
router.route("/").get(isAutheticated,isUser(true),allBooking)
router.route("/details/:bookingId").get(isAutheticated,isUser(true),bookingDetails)

export default router