import { Router } from "express";
import {
    createReview,
    getAllReviewsById
    
} from "../controllers/reviews.controller.js";


const router = Router()

import { isAutheticated,isUser } from "../../../midlewares/authMidlewares.js"

router.route("/create").post(isAutheticated,createReview)
router.route("/").post(isAutheticated,getAllReviewsById)



export default router