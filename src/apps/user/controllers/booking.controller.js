import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { Booking } from "../../../models/booking.model.js";

export const createBooking = asyncHandler(async (req, res) => {
    try {
        const { gameTypeId, date, schedulingTime,groundId } = req.body;
        const {_id} = req.user
        console.log(_id);
        

        if (!gameTypeId) {
            return res.status(400).json(new ApiResponse(400, '', 'Ground ID is required'));
        }

        if (!date) {
            return res.status(400).json(new ApiResponse(400, '', 'Date is required'));
        }
        if (!groundId) {
            return res.status(400).json(new ApiResponse(400, '', 'groundId is required'));
        }

        if (!schedulingTime || !Array.isArray(schedulingTime) || schedulingTime.length === 0) {
            return res.status(400).json(new ApiResponse(400, '', 'At least one scheduling time is required'));
        }

        const newBooking = await Booking.create({ gameTypeId, date, schedulingTime ,groundId, userId:_id});

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
export const getBooking = asyncHandler(async (req, res) => {
    const { groundId, date } = req.query;

    try {
        const allBookings = await Booking.find({ groundId, date });

        const updatedBookings = allBookings.map(booking => {
            // Add isBidding: true to each schedulingTime object
            const updatedSchedulingTime = booking.schedulingTime.map(slot => ({
                ...slot.toObject(), // Convert Mongoose subdoc to plain object
                isBidding: true
            }));

            return {
                ...booking.toObject(), // Convert full doc to plain object
                schedulingTime: updatedSchedulingTime
            };
        });

        return res.status(200).json(new ApiResponse(200, updatedBookings));

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});
// user bookig list
export const allBooking = asyncHandler(async (req, res) => {
    try {
        let { page, pageSize,date } = req.query;

        page = parseInt(page) || 1; // Default to page 1 if not provided
        pageSize = parseInt(pageSize) || 10; // Default to pageSize 10 if not provided
        const skip = (page - 1) * pageSize;

        let filter = {};
        if (date) {
            filter.date = date; 
        }
        const booking = await Booking.find(filter)
        .skip(skip)
        .limit(pageSize)
        // .sort({ _id: 1 })
        .select("schedulingTime"); // Select only the schedulingTime field

        const totalBooking = await Booking.countDocuments();
        const totalPages = Math.ceil(totalBooking / pageSize);

        if (page > totalPages) {
            return res.status(400).json(new ApiResponse(400, '', "Page doesn't exist"));
        }

        if (booking.length > 0) {
            return res.status(200).json(new ApiResponse(200, { bookings: booking, totalPages, totalBooking }));
        }
        
        return res.status(404).json(new ApiResponse(404, '', "No data found"));

    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, '', "Internal Server Error"));
    }
});
 

export const bookingDetails = asyncHandler(async (req, res) => {
    const { bookingId } = req.params; 

    try {
        const booking = await Booking.findById(bookingId).populate('groundId'); 

        if (!booking) {
            return res.status(400).json(new ApiResponse(400, null, 'Booking not found'));
        }

        return res.status(200).json(new ApiResponse(200, booking, 'Ground details fetched successfully'));
        
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, null, 'Something went wrong'));
    }
});


export const groundOwnerBookig = asyncHandler(async(req,res)=>{
    const {groundId} = req.parmss
    try {

        // const 
        
    } catch (error) {
        
    }
})