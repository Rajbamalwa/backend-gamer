import express from 'express';
import { initiatePhonePePayment, phonePeWebhook ,paymentStatus,paymentSummary} from '../controllers/payment.controller.js';
import { isAutheticated,authorizedRole } from "../../../midlewares/authMidlewares.js"

const router = express.Router();

router.post('/initiate',isAutheticated, initiatePhonePePayment);
router.post('/webhook', phonePeWebhook);
router.post('/success',paymentStatus);
router.post('/summary',isAutheticated,paymentSummary);


export default router;
