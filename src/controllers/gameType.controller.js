import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import { GameType } from "../models/gameType.model.js";

export const createGameType = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json(new ApiResponse(400, '', 'Game type name is required'));
        }

        const existingGameType = await GameType.findOne({ name });
        if (existingGameType) {
            return res.status(400).json(new ApiResponse(400, '', 'Game type already exists'));
        }

        // Create a new GameType
        const newGameType = await GameType.create({ name });
        return res.status(200).json(new ApiResponse(200, newGameType, 'Game type created successfully!'));

     
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

export const getAllGameTypes = asyncHandler(async (req, res) => {
    try {
        const gameTypes = await GameType.find();
        return res.status(200).json(new ApiResponse(200, gameTypes));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});
