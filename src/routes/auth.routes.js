import { Router } from "express";
import {
    initiatesGooleAuth,
    googleCallback,
    logout
} from "../controllers/auth.controller.js";

const router = Router()


router.route("/google").get(initiatesGooleAuth)
router.route("/google/callback").get(googleCallback)
router.route("/logout").get(logout)



export default router