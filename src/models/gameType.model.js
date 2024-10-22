import mongoose, {Schema } from "mongoose";

const gameTypeSchema = new Schema({
    name: {
        type: String,
    },
}, { timestamps: true });

export const GameType = mongoose.model("GameType", gameTypeSchema);