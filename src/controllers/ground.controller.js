import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import { Ground } from "../models/ground.model.js";

export const createGround = asyncHandler(async (req, res) => {

    const data = req.body

    try {
        const newGround = await Ground.create(data);
        return res.status(200).json(new ApiResponse(200, newGround, 'Ground created successfully!'));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

export const getAllGrounds = asyncHandler(async (req, res) => {

    const { gameType } = req.query

    try {

        const groundList = await Ground.aggregate([
            {
                $lookup: {
                    from: 'gametypes',
                    localField: 'gameTypeId',
                    foreignField: '_id',
                    as: 'gameType',
                },
            },
            {
                $unwind: {
                    path: '$gameType',
                },
            },
            {
                $match: {
                    ...(gameType && gameType !== "all" ? { 'gameType.name': gameType } : {}),
                },
              },
            {
                $lookup: {
                    from: 'gamefeatures',
                    localField: 'gameFeaturesId',
                    foreignField: '_id',
                    as: 'gameFeatures',
                },
            },
            {
                $unwind: {
                    path: '$gameFeatures',
                },
            },
            {
                $project : {
                    name : 1,
                    description : 1,
                    lat : 1,
                    lng : 1,
                    city : 1,
                    state : 1,
                    country : 1,
                    address : 1,
                    image : 1,
                    index : 1,
                    likes : 1,
                    equipmentProvide : 1,
                    toilet : 1,
                    changingRoom : 1,
                    parking : 1,
                    showers : 1,
                  
                }
            }
        ])

        if(groundList.length === 0){
            return res.status(404).json(new ApiResponse(404, '', 'No Data found'));

        }
        return res.status(200).json(new ApiResponse(200, groundList));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

export const getGroundDetails = asyncHandler(async (req, res) => {

    const { _id } = req.user

    try {

    } catch (error) {
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));

    }

})
