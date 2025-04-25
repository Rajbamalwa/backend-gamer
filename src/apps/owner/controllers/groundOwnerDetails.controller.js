import { asyncHandler } from "..//../../utils/asyncHandler.js";
import { ApiResponse } from "..//../../utils/ApiResponse.js";
import { GroundOwnerDetails } from "../../../models/groundOwnerDetails.model.js";


export const registerGroundOwner = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            email,
            phoneNo,
            currentPhoneNo,
            address,
            adharImage,
        } = req.body;

        // const existingOwner = await GroundOwnerDetails.findOne({ phoneNo });

        // if (existingOwner) {
        //     return res.status(400).json(new ApiResponse(400, '', 'Ground Owner already exists with this phone number'));
        // }

        const groundOwner = await GroundOwnerDetails.create({
            name,
            email,
            phoneNo,
            currentPhoneNo,
            address,
            adharImage,
        });

        return res.status(201).json(new ApiResponse(201, groundOwner, 'Ground Owner registered successfully'));
    } catch (error) {
        console.error('Error in registerGroundOwner:', error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});
