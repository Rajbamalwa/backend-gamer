import { asyncHandler } from "..//../../utils/asyncHandler.js";
import { ApiResponse } from "..//../../utils/ApiResponse.js";
import { GameType } from "..//../../models/gameType.model.js";

export const createGameType = asyncHandler(async (req, res) => {
    try {
        const { name,image,hexColour } = req.body;

        if (!name) {
            return res.status(400).json(new ApiResponse(400, '', 'Game type name is required'));
        }

        const existingGameType = await GameType.findOne({ name });
        if (existingGameType) {
            return res.status(400).json(new ApiResponse(400, '', 'Game type already exists'));
        }

        // Create a new GameType
        const newGameType = await GameType.create({ name,image,hexColour });
        return res.status(200).json(new ApiResponse(200, newGameType, 'Game type created successfully!'));

     
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

export const getAllGameTypes = asyncHandler(async (req, res) => {
    
    try {
        const gameTypes = await GameType.find({});
        if(gameTypes.length > 0){
            return res.status(200).json(new ApiResponse(200, gameTypes));
        }
        return res.status(404).json(new ApiResponse(404, '', 'No data found'));


    } catch (error) { 
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});



export const deleteGameTypes = asyncHandler(async (req, res) => {

    const { _id } = req.params;

    try {
        const gameType = await GameType.findById(_id)
        if(!gameType){
            return res.status(404).json(new ApiResponse(404, '', 'No data found'));
        }

        const gameTypes = await GameType.findByIdAndDelete(_id);
        return res.status(200).json(new ApiResponse(200, '','Deleted Sucessfully'));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

