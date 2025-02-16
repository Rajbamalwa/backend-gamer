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
    }
});

const bookingSchema = new Schema({
    gameTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameType',
    },
    date: {
        type: String,
    },
    schedulingTime: {
        type: [schedulingTimeSchema],
    }
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);
