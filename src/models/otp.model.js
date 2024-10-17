import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

export const Otp = mongoose.model("Otp", otpSchema);