import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { Ground } from '../../../models/ground.model.js'
import mongoose from "mongoose";

export const toggleLikeGround = async (req, res) => {
    try {
        const { groundId } = req.body;
        const { _id } = req.user;

        if (!mongoose.Types.ObjectId.isValid(groundId)) {
            return res.status(400).json(new ApiResponse(400, '', 'Invalid Ground ID'));
        }

        const ground = await Ground.findById(groundId);
        if (!ground) {
            return res.status(404).json(new ApiResponse(404, '', 'Ground not found'));
        }

        const alreadyLiked = ground.likedBy.includes(_id);

        const updateQuery = alreadyLiked
            ? { $pull: { likedBy: _id } }  // Unlike: Remove user from likedBy
            : { $addToSet: { likedBy: _id } };  // Like: Add user to likedBy

        const updatedGround = await Ground.findByIdAndUpdate(
            groundId,
            updateQuery,
            { new: true }
        );

        return res.status(200).json(
            new ApiResponse(200, '', {
                message: alreadyLiked ? "Unliked" : "Liked",
                likes: updatedGround.likedBy.length,
            })
        );

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
};


export const getAllLikeGround = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    try {
        const likedGrounds = await Ground.find({ likedBy: _id })
        if (likedGrounds.length === 0) {
            return res.status(404).json(new ApiResponse(404, '', 'No liked grounds found'));
        }
        return res.status(200).json(new ApiResponse(200, likedGrounds));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));

    }
})