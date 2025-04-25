import { asyncHandler } from "..//../../utils/asyncHandler.js";
import { ApiResponse } from "..//../../utils/ApiResponse.js";
import { Booking } from "..//../../models/booking.model.js";
import { ContactUs } from "..//../../models/contactUs.model.js";

// Create ContactUs Entry
export const createContactUs = asyncHandler(async (req, res) => {
    try {
        const { type, title, description, image } = req.body;
        const {_id} = req.user

        if (!title) {
            return res.status(400).json(new ApiResponse(400, '', 'Title is required'));
        }

        const newContactUs = await ContactUs.create({ userId:_id,type, title, description, image });
        return res.status(200).json(new ApiResponse(200, newContactUs, 'ContactUs entry created successfully!'));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

// Get All ContactUs Entries
export const getAllContactUs = asyncHandler(async (req, res) => {
    try {
        const contactUsEntries = await ContactUs.find();
        return res.status(200).json(new ApiResponse(200, contactUsEntries));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

// Get Single ContactUs Entry by ID
export const getContactUsById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const contactUsEntry = await ContactUs.findById(id);
        if (!contactUsEntry) {
            return res.status(404).json(new ApiResponse(404, '', 'ContactUs entry not found'));
        }
        return res.status(200).json(new ApiResponse(200, contactUsEntry));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

// Update ContactUs Entry
export const updateContactUs = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const {type,title,description,image} = req.body;

        const updateFields = {};
        if (type !== undefined) updateFields.type = type;
        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (image !== undefined) updateFields.image = image;
        
        const updatedContactUs = await ContactUs.findByIdAndUpdate(_id, updateFields, { new: true });
        if (!updatedContactUs) {
            return res.status(404).json(new ApiResponse(404, '', 'ContactUs entry not found'));
        }
        return res.status(200).json(new ApiResponse(200, updatedContactUs, 'ContactUs entry updated successfully!'));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

// Delete ContactUs Entry
export const deleteContactUs = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const contactUsEntry = await ContactUs.findByIdAndDelete(_id);
        if (!contactUsEntry) {
            return res.status(404).json(new ApiResponse(404, '', 'ContactUs entry not found'));
        }
        return res.status(200).json(new ApiResponse(200, '', 'ContactUs entry deleted successfully'));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});