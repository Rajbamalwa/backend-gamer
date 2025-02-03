import { Router } from "express";
import {
    createContactUs,
    updateContactUs,
    deleteContactUs,
    getAllContactUs
    
} from "../controllers/contactUs.controller.js";


const router = Router()

import { isAutheticated } from "../midlewares/authMidlewares.js";

router.route("/create").post(isAutheticated,createContactUs)
router.route("/get-all").get(getAllContactUs)
router.route("/delete/:_id").post(deleteContactUs)
router.route("/update/:_id").post(updateContactUs)



export default router