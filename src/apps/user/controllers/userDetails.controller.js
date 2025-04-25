import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import {UserDetails}  from '../../../models/userDetails.model.js'


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
            new ApiResponse(201,  newUserDetails , 'User details created successfully')
        );
    } catch (error) {
        console.error('Error adding user details:', error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});



// Get UserDetails by User ID
export const getUserDetailsById = asyncHandler(async (req, res) => {

    try {
        const { _id } = req.user
                
        const userDetails = await UserDetails.findOne({userId:_id }).populate('userId')
        
        
        if (!userDetails) {
            return res.status(404).json(new ApiResponse(404, '', 'No user details found'));
        }
        
        return res.status(200).json(new ApiResponse(200, userDetails));
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});
