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
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const grounds = await Ground.find()
            .populate('gameTypeId')
            .populate('gameFeaturesId')
            .skip(skip)
            .limit(Number(limit));

        // Get total ground count
        const totalGrounds = await Ground.countDocuments();

        return res.status(200).json({
            success: true,
            data: grounds,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(totalGrounds / limit),
                totalItems: totalGrounds,
            },
            msg: 'Grounds fetched successfully!',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

export const getGroundDetails = asyncHandler(async (req, res) => {

    const {_id} = req.user

    try {

    } catch (error) {
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));

    }

})
