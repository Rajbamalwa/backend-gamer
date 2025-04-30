import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { GameType } from "../../../models/gameType.model.js";

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

