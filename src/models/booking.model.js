import mongoose, { Schema } from "mongoose";

const schedulingTimeSchema = new Schema({
    id: {
        type: Number,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    mode: {
        type: String,
    },

});

const bookingSchema = new Schema({
    gameTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameType',
    },
    date: {
        type: Date,
    },
    schedulingTime: {
        type: [schedulingTimeSchema],
    },
    groundId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ground',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    bookingStatus: {
        type: String,
        enum: ['Pending', 'Booked', 'Bidding Refund Initiated'],
        default: 'Pending'
    },
    transactionId: {
        type: String,
        default: null,
    },
    isBiding: {
        type: Boolean,
        default: false,
    },
    slotCost: {
        type: Number,
        default: 0
    },
    bidingCost: {
        type: Number,
        default: 0

    },
    serviceFee: {
        type: Number,
        default: 0

    },
    payableAmount: {
        type: Number,
        default: 0

    }
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);
