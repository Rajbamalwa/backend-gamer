import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { Notification } from "../../../models/notification.model.js";


// Get All Notifications
export const getAllNotifications = asyncHandler(async (req, res) => {
    try {
        const notifications = await Notification.find();
        return res.status(200).json(new ApiResponse(200, notifications));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});
