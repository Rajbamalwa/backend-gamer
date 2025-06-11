import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { Booking } from "../../../models/booking.model.js";
import { Reviews } from "../../../models/reviews.model.js";
import moment from 'moment';
import { Ground } from "../../../models/ground.model.js";


export const createBooking = asyncHandler(async (req, res) => {

    /// checking if booking is a avaliable than store isBiding ture and previous booking refuncd incitive 
    try {
        const { gameTypeId, date, schedulingTime, groundId, slotCost, serviceFee, payableAmount } = req.body;
        const { _id } = req.user

        if (!gameTypeId || !date || !groundId || !schedulingTime?.length) {
            return res.status(400).json(new ApiResponse(400, '', 'Required fields missing'));
        }

        const parsedDate = moment(date, 'DD/MM/YYYY').startOf('day').toDate();
        // 1. Find the latest booking with a bidingCost (for this ground and date)
        const lastBooking = await Booking.findOne({
            groundId,
            date: parsedDate,
        }).sort({ createdAt: -1 });

        let isBiding = false;
        let bidingCost = 0; // default starting

        if (lastBooking) {
            bidingCost = (lastBooking.bidingCost || 0) + 100;
        }

        // 1. Find conflicting bookings
        const existingBooking = await Booking.findOne({
            groundId,
            date: parsedDate,
            "schedulingTime.id": { $in: schedulingTime.map(st => st.id) },
        });


        // 2. If conflict found, mark new booking as biding and update old one
        if (existingBooking) {
            isBiding = true;
            // Update old booking status
            await Booking.findByIdAndUpdate(existingBooking._id, {
                bookingStatus: 'Bidding Refund Initiated'
            });
        }

        // 3. Create new booking with or without bidding info
        const newBooking = await Booking.create({
            gameTypeId,
            date: parsedDate,
            schedulingTime,
            groundId,
            userId: _id,
            isBiding,
            bidingCost,
            slotCost,
            serviceFee,
            payableAmount: slotCost + serviceFee + bidingCost,
            // bookingStatus: isBiding ? 'Pending' : 'Booked',
            bookingStatus: 'Pending',
        });


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


// user bookig list
export const allBooking = asyncHandler(async (req, res) => {
    try {
        let { page, pageSize, date } = req.body;
        const [day, month, year] = date.split('/').map(Number);
        const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
        const endOfDay = new Date(Date.UTC(year, month - 1, day + 1, 0, 0, 0));

        page = parseInt(page) || 1; // Default to page 1 if not provided
        pageSize = parseInt(pageSize) || 10; // Default to pageSize 10 if not provided
        const skip = (page - 1) * pageSize;

        let filter = {};
        if (date) {
            filter.$gte = startOfDay;
            filter.$lt = endOfDay;
        }
        const booking = await Booking.find()
            .skip(skip)
            .limit(pageSize)
            .sort({ date: -1 })
            // .select("schedulingTime bookingStatus date transactionId")
            .populate({ path: 'gameTypeId' })
            .populate({ path: 'groundId' });

        const totalBooking = await Booking.countDocuments();
        const totalPages = Math.ceil(totalBooking / pageSize);

        if (page > totalPages) {
            return res.status(400).json(new ApiResponse(400, '', "No data found"));
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
    const { bookingId } = req.body;
    const { _id } = req.user


    try {
        const booking = await Booking.findById(bookingId)
            .populate({ path: 'gameTypeId' })
            .populate({ path: 'groundId' });

        if (!booking) {
            return res.status(400).json(new ApiResponse(400, null, 'Booking not found'));
        }

        const reviews = await Reviews.findOne({ groundId: booking.groundId._id, userId: _id }).select('title rating')

        // Convert Mongoose doc to plain object before modifying
        const bookingObj = booking.toObject();
        bookingObj.reviews = !!reviews; // true if found, false if not


        if (!booking) {
            return res.status(400).json(new ApiResponse(400, null, 'Booking not found'));
        }

        return res.status(200).json(new ApiResponse(200, { bookingObj, reviews }, 'Ground details fetched successfully'));

    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, null, 'Something went wrong'));
    }
});


export const getBooking = asyncHandler(async (req, res) => {
    const { groundId, date } = req.body;

    try {
        if (!groundId || !date) {
            return res.status(400).json(new ApiResponse(400, '', "Missing groundId or date"));
        }

        // Convert 'dd/mm/yyyy' to JS Date Range
        const [day, month, year] = date.split('/').map(Number);
        const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
        const endOfDay = new Date(Date.UTC(year, month - 1, day + 1, 0, 0, 0));

        const ground = await Ground.findById(groundId)
        console.log(ground.pricing);
        

        const allBookings = await Booking.find({
            groundId,
            bookingStatus: 'Booked',
            date: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        })        

        if (!allBookings.length) {
            return res.status(404).json(new ApiResponse(404, '', "No Data found"));
        }

        const flatSchedulingSlots = allBookings.flatMap(booking =>
            booking.schedulingTime.map(slot => ({
                ...slot.toObject(),
                bookingId: booking._id,
                isBidding: booking.isBiding,
                groundId: booking.groundId._id,
                userId: booking.userId,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt,
                __v: booking.__v
            }))
        );

        return res.status(200).json(
            new ApiResponse(200, {
                schedulingTime: flatSchedulingSlots,
                price  : ground.pricing
            }, "Success")
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});


