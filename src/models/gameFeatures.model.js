import mongoose, { Schema } from "mongoose";

const gameFeaturesSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

export const GameFeatures = mongoose.model("GameFeatures", gameFeaturesSchema);
