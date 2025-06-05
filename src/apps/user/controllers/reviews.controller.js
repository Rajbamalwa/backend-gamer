import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { Reviews } from "../../../models/reviews.model.js";
import { UserDetails } from "../../../models/userDetails.model.js";

export const createReview = asyncHandler(async (req, res) => {

    const { title, rating, groundId } = req.body;
    const userId = req.user

    try {

        if (!title || !rating || !groundId) {
            return res.status(400).json(new ApiResponse(400, '', 'All fields (title, rating, groundId, userId) are required'));
        }

        // Fetch UserDetails
        const userDetails = await UserDetails.findOne({ userId: user._id });
        if (!userDetails) {
            return res
                .status(404)
                .json(new ApiResponse(404, '', 'User profile not found'));
        }

        const newReview = await Reviews.create({
            title,
            rating,
            groundId,
            userId,
            profileId: userDetails._id,

        });

        return res.status(201).json({
            success: true,
            data: newReview,
            msg: 'Review created successfully!',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});

export const getAllReviewsById = asyncHandler(async (req, res) => {

    const { groundId } = req.body

    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const reviews = await Reviews.find({ groundId: groundId })
            .populate('userId')
            .populate('profileId')
            // .populate('groundId', 'name') 
            // .populate('userId', 'name') 
            .skip(skip)
            .limit(Number(limit));

        const totalReviews = await Reviews.countDocuments();

        return res.status(200).json({
            success: true,
            data: reviews,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(totalReviews / limit),
                totalItems: totalReviews,
            },
            msg: 'Reviews fetched successfully!',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});
