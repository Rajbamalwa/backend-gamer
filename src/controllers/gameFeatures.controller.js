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
        return res.status(400).json(new ApiResponse(400, newGameFeature, 'Game feature created successfully!'))

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

export const getAllGameFeatures = asyncHandler(async (req, res) => {
    try {
        const gameFeatures = await GameFeatures.find();
        if(gameFeatures.length > 0){
            return res.status(200).json(new ApiResponse(200, gameFeatures))

        }
        return res.status(400).json(new ApiResponse(400,'','No Data Found'))


    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});



export const deleteGameFeatures = asyncHandler(async (req, res) => {

    const { _id } = req.params;

    try {
        const gameFeatures = await GameFeatures.findById(_id)
        if(!gameFeatures){
            return res.status(404).json(new ApiResponse(404, '', 'No data found'));
        }

        await GameFeatures.findByIdAndDelete(_id);
        return res.status(200).json(new ApiResponse(200, '','Deleted Sucessfully'));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});