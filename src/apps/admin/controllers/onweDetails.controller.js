import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { GroundOwnerDetails } from "../../../models/groundOwnerDetails.model.js";


export const verifyGroundOwner = asyncHandler(async (req, res) => {
    const { groundOwnerId, isVerified } = req.body;

    try {
        // Validate input
        if (!groundOwnerId) {
            return res.status(400).json(new ApiResponse(400, '', 'Ground Owner ID is required'));
        }

        if (typeof isVerified !== 'boolean') {
            return res.status(400).json(new ApiResponse(400, '', 'isVerified must be a boolean'));
        }

        // Find and update ground owner details
        const updatedGroundOwner = await GroundOwnerDetails.findByIdAndUpdate(
            groundOwnerId,
            { isVerified },
            { new: true }
        );

        if (!updatedGroundOwner) {
            return res.status(404).json(new ApiResponse(404, '', 'Ground Owner not found'));
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedGroundOwner,
                `Ground Owner verification status updated successfully`
            )
        );
    } catch (error) {
        console.error('Error in verifyGroundOwner:', error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});