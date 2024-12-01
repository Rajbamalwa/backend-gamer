import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import {UserDetails}  from '../models/userDetails.model.js'

export const addDetails = asyncHandler(async (req, res) => {

    const { phoneNumber } = req.user    
    const { name, imageUrl, locationName, lat, lng } = req.body;

    try {

        if (!phoneNumber || !name || !imageUrl || !locationName || !lat || !lng) {
            return res.status(400).json(new ApiResponse(400, '', 'Phone number, name, and image ,locationName,lat,lng URL are required'));
        }

        const user = await UserDetails.findOne({ phoneNumber });

        if (!user) {
            return res.status(404).json(new ApiResponse(404, '', 'User not found'));
        }

        // Update user details
        user.name = name;
        user.imageUrl = imageUrl;
        user.locationName = locationName
        user.lat = lat
        user.lng = lng


        await user.save();

        return res.status(200).json(new ApiResponse(200, '', 'User details updated successfully', { user }));
    } catch (error) {
        console.error('Error updating user details:', error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});