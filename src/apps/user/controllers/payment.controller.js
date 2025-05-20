import { Booking } from "../../../models/booking.model.js";

import axios from 'axios';
import crypto from 'crypto';
import paymentQueue from '../queues/payment/index.js'; // or whatever your actual file is
import { ApiResponse } from "../../../utils/ApiResponse.js";


export const initiatePhonePePayment = async (req, res) => {
  const { _id } = req.user
  const { bookingId, amount, phoneNO } = req.body;

  try {
    const transactionId = `TXN_${Date.now()}`;

    // Update booking with transactionId
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { transactionId },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json(new ApiResponse(404, null, 'Booking not found'));
    }


    //payment
    const paymentPayload = {
      merchantId: process.env.MERCHANT_ID,
      merchantUserId: 'user_' + _id,
      mobileNumber: phoneNO,
      amount: amount * 100,
      merchantTransactionId: transactionId,
      redirectUrl: process.env.REDIRECT_URL,
      redirectMode: 'POST',
      callbackUrl: process.env.CALLBACK_URL, // ✅ ADD THIS
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    }

    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64')
    const string = payload + '/pg/v1/pay' + process.env.MERCHANT_KEY
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + '###' + process.env.KEY_INDEX

    const option = {
      method: 'POST',
      url: process.env.MERCHANT_BASE_URL,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
      },
      data: {
        request: payload
      }
    }

    const { data } = await axios.request(option);
    if (data.success) {
      return res.status(200).json(new ApiResponse(200, {
        data: data,
        transactionId,
      }, 'Payment link generated'));
    } else {
      return res.status(400).json(new ApiResponse(400, null, 'Failed to create payment'));
    }



  } catch (err) {
    console.error(err);
    return res.status(500).json(new ApiResponse(500, null, 'Server error'));
  }
};


export const phonePeWebhook = async (req, res) => {
  try {
    const encodedResponse = req.body.response;

    if (!encodedResponse) {
      console.error("Missing response in webhook payload");
      return res.status(400).json({ success: false, message: 'Missing response' });
    }

    // Decode base64
    const decoded = Buffer.from(encodedResponse, 'base64').toString('utf8');

    // Parse JSON
    const parsed = JSON.parse(decoded);

    const transactionId = parsed?.data?.transactionId;

    if (!transactionId) {
      console.error("Transaction ID not found after decoding response");
      return res.status(400).json({ success: false, message: 'Missing transactionId' });
    }

    // Send to queue
    await paymentQueue.add({ paymentData: parsed });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).json({ success: false });
  }
};


export const paymentStatus = async (req, res) => {
  res.send("Payment Success");
}

