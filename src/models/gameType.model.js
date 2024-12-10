import mongoose, {Schema } from "mongoose";

const gameTypeSchema = new Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    hexColour: {
        type: String,
    },
}, { timestamps: true });

export const GameType = mongoose.model("GameType", gameTypeSchema);