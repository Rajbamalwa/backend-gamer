import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { GameType } from '../../../models/gameType.model.js';

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


export const updateGameType = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, hexColour, description } = req.body;

        if (!id) {
            return res.status(400).json(new ApiResponse(400, '', 'Game type ID is required'));
        }

        const existingGameType = await GameType.findById(id);

        if (!existingGameType) {
            return res.status(404).json(new ApiResponse(404, '', 'Game type not found'));
        }

        // Optional: check for duplicate name
        if (name && name !== existingGameType.name) {
            const duplicate = await GameType.findOne({ name });
            if (duplicate) {
                return res.status(400).json(new ApiResponse(400, '', 'Game type name already exists'));
            }
        }

        // Update fields
        existingGameType.name = name || existingGameType.name;
        existingGameType.image = image || existingGameType.image;
        existingGameType.hexColour = hexColour || existingGameType.hexColour;
        existingGameType.description = description || existingGameType.description;

        const updatedGameType = await existingGameType.save();

        return res.status(200).json(new ApiResponse(200, updatedGameType, 'Game type updated successfully!'));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

