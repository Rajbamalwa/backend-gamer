import mongoose, { now, Schema } from "mongoose";

const reviewsSchema = new Schema({
    title: {
        type: String,
    },
    rating: {
        type: Number,
    },
    groundId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ground',
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails',
    }
}, { timestamps: true });

export const Reviews = mongoose.model("Reviews", reviewsSchema);