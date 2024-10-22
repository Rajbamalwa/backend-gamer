import mongoose, { now, Schema } from "mongoose";

const GameFeaturesSchema = new Schema({
    name: {
        type: String,
    },
}, { timestamps: true });

export const GameFeatures = mongoose.model("GameFeatures", GameFeaturesSchema);