import { asyncHandler } from "..//../../utils/asyncHandler.js";
import { ApiResponse } from "..//../../utils/ApiResponse.js";
import { Notification } from "..//../../models/notification.model.js";

// Create Notification
export const createNotification = asyncHandler(async (req, res) => {
    try {
        const { name, description, image, link } = req.body;

        if (!name) {
            return res.status(400).json(new ApiResponse(400, '', 'Notification name is required'));
        }

        const newNotification = await Notification.create({ name, description, image, link });
        return res.status(200).json(new ApiResponse(200, newNotification, 'Notification created successfully!'));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

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

// Get Single Notification by ID
export const getNotificationById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json(new ApiResponse(404, '', 'Notification not found'));
        }
        return res.status(200).json(new ApiResponse(200, notification));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

// Update Notification
export const updateNotification = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const {name,description,image,link} = req.body;
        
        
        const updateFields = {};
        if (name !== undefined) updateFields.name = name;
        if (description !== undefined) updateFields.description = description;
        if (image !== undefined) updateFields.image = image;
        if (link !== undefined) updateFields.link = link;

        const updatedNotification = await Notification.findByIdAndUpdate(_id, updateFields, { new: true });
        if (!updatedNotification) {
            return res.status(404).json(new ApiResponse(404, '', 'Notification not found'));
        }
        return res.status(200).json(new ApiResponse(200, updatedNotification, 'Notification updated successfully!'));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

// Delete Notification
export const deleteNotification = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const notification = await Notification.findByIdAndDelete(_id);
        if (!notification) {
            return res.status(404).json(new ApiResponse(404, '', 'Notification not found'));
        }
        return res.status(200).json(new ApiResponse(200, '', 'Notification deleted successfully'));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});
