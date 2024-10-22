import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    
    orderNo: {
        type: String,
    },
    groundId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ground',
    },
    charges: {
        type: Number,
    },
    conveniceFees: {
        type: Number,
    },
    totalAmount: {
        type: Number,
    },
    groundCharge: {
        type: Number,
    },
    platformFee: {
        type: Number,
    },
    startTime: {
        type: Number,
    },
    endTime: {
        type: Number,
    },
    bookingDate: {
        type: Number,
    },
    isBid :{
        type: Boolean,
    },
    bookingStatus: {
        type: Number,
    },
    paymentStatus: {
        type: Number,
    },
    gameType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameType',
    }


}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);