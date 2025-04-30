import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { ContactUs } from "../../../models/contactUs.model.js";

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
