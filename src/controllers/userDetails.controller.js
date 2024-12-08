import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import {UserDetails}  from '../models/userDetails.model.js'


export const addDetails = asyncHandler(async (req, res) => {
  
    
    const { _id } = req.user; 
    const { name, imageUrl, locationName, lat, lng } = req.body;

    try {
        // Validate required fields
        if (!name || !imageUrl || !locationName || !lat || !lng) {
            return res.status(400).json(
                new ApiResponse(400, '', 'Name, imageUrl, locationName, lat, and lng are required')
            );
        }

        // Check if the user details already exist
        const existingDetails = await UserDetails.findOne({ userId: _id });

        if (existingDetails) {
            return res.status(400).json(
                new ApiResponse(400, '', 'User details have already been created')
            );
        }

        // Create new user details
        const newUserDetails = await UserDetails.create({
            name,
            imageUrl,
            locationName,
            lat,
            lng,
            userId: _id,
        });

        return res.status(201).json(
            new ApiResponse(201, { userDetails: newUserDetails }, 'User details created successfully')
        );
    } catch (error) {
        console.error('Error adding user details:', error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});
