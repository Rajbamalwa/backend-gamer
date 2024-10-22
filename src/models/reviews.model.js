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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

export const Reviews = mongoose.model("Reviews", reviewsSchema);