import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import { GameFeatures } from "../models/gameFeatures.model.js";

export const createGameFeature = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json(new ApiResponse(400, '', 'Game feature name is required'));
        }

        const existingGameFeature = await GameFeatures.findOne({ name });
        if (existingGameFeature) {
            return res.status(400).json(new ApiResponse(400, '', 'Game feature already exists'));
        }

        const newGameFeature = await GameFeatures.create({ name });

        return res.status(201).json({
            success: true,
            data: newGameFeature,
            msg: 'Game feature created successfully!',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

export const getAllGameFeatures = asyncHandler(async (req, res) => {
    try {
        const gameFeatures = await GameFeatures.find();

        return res.status(200).json({
            success: true,
            data: gameFeatures,
            msg: 'Game features fetched successfully!',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});
