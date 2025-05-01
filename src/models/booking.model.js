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
    }
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);
