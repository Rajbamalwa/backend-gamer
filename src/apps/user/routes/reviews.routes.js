import { Router } from "express";
import {
    createReview,
    getAllReviewsById
    
} from "../controllers/reviews.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(isAutheticated,createReview)
router.route("/:_id").get(isAutheticated,getAllReviewsById)
// router.route("/details/:_id").get(isAutheticated,getGroundDetails)
// router.route("/update/:_id").post(isAutheticated,groundUpdate)
// router.route("/delete/:_id").post(isAutheticated,groundDelete)



export default router