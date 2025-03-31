import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Booking } from "../models/booking.model.js";

export const createBooking = asyncHandler(async (req, res) => {
    try {
        const { gameTypeId, date, schedulingTime } = req.body;

        if (!gameTypeId) {
            return res.status(400).json(new ApiResponse(400, '', 'Ground ID is required'));
        }

        if (!date) {
            return res.status(400).json(new ApiResponse(400, '', 'Date is required'));
        }

        if (!schedulingTime || !Array.isArray(schedulingTime) || schedulingTime.length === 0) {
            return res.status(400).json(new ApiResponse(400, '', 'At least one scheduling time is required'));
        }

        const newBooking = await Booking.create({ gameTypeId, date, schedulingTime });

        return res.status(200).json(new ApiResponse(200, newBooking, 'Booking created successfully!'));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});


export const checkBookingStatus = asyncHandler(async (req, res) => {
    try {

        const { date } = req.quey

        const allBookingScheduleing = await Booking.find({ date })

    } catch (error) {

    }
})

export const allBooking = asyncHandler(async (req, res) => {
    

    const { page, pageSize } = req.query
    const skip = (page - 1) * pageSize

    try {

        const booking = await Booking.find({}).skip(skip).limit(pageSize)
        
        if (page) {
            const totalBooking = await Booking.countDocuments();
            const totalPages = Math.ceil(totalBooking / pageSize);

            if (page > totalPages) {
                return res.status(500).json(new ApiResponse(500, '', "Page does't exesist"));
            }

            if (booking.length > 0) {
                return res.status(200).json(new ApiResponse(200, booking));

            }
            return res.status(400).json(new ApiResponse(400, '', "No data found"));
        }


    } catch (error) {

    }
})
