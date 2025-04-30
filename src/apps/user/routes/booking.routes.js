import { Router } from "express";
import {
    createBooking,
    allBooking,
    bookingDetails,
    groundOwnerBookig,
    getBooking
} from "../controllers/booking.controller.js";


const router = Router()

import { isAutheticated,authorizedRole } from "../../../midlewares/authMidlewares.js"

router.route("/create").post(isAutheticated,authorizedRole('user'),createBooking)
router.route("/").get(isAutheticated,authorizedRole('user'),allBooking)
router.route("/details/:bookingId").get(isAutheticated,authorizedRole('user'),bookingDetails)

export default router