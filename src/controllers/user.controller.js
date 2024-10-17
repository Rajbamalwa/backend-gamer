import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import otpGenerator from 'otp-generator';
import axios from 'axios';
import { Otp } from "../models/otp.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

export const sendOtp = asyncHandler(async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        if (!phoneNumber) {
            return res.status(400).json(new ApiResponse(400, '', 'Phone number is required'));
        }

        const BULKSMS_API_KEY = 'dc3af28fef3271db3fec90dc6a9bdf55';
        const BULKSMS_SENDER_ID = 'TDRSFT';
        const BULKSMS_TEMPLET_ID = '1707167905076041847';

        const otp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const apiUrl = `https://bulksmsby.in/api/api.php?apikey=${BULKSMS_API_KEY}&to=${phoneNumber}&senderid=${BULKSMS_SENDER_ID}&msg=Thanks for payment Rs ${otp} for - TDR SOFTWARE PVT LTD&templateID=${BULKSMS_TEMPLET_ID}`;
        const response = await axios.get(apiUrl);

        if (response.status === 200) {

            const expiresAt = new Date();
            expiresAt.setMinutes(expiresAt.getMinutes() + 20);

            await Otp.create({
                phoneNumber,
                otp,
                expiresAt,
            });


            return res.status(200).json({
                success: true,
                otp: otp,
                msg: 'OTP sent successfully!',

            });

        } else {
            return res.status(500).json(new ApiResponse(500, '', 'Failed to send OTP'))
        }

    } catch (error) {
        console.log(error);

        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));

    }
})

export const verifyOtp = asyncHandler(async (req, res) => {

    try {
        const { phoneNumber, otp } = req.body;

        if (!phoneNumber || !otp) {
            return res.status(400).json(new ApiResponse(400, '', 'Phone number and OTP are required'));
        }

        const otpRecord = await Otp.findOne({ phoneNumber, otp });
        if (!otpRecord) {
            return res.status(400).json(new ApiResponse(400, '', 'Invalid OTP'));
        }

        if (Date.now() > otpRecord.expiresAt) {
            return res.status(400).json(new ApiResponse(400, '', 'OTP expired'));
        }

        let user = await User.findOne({ phoneNumber });

        if (!user) {
            user = await User.create({ phoneNumber });
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        // Set cookie options
        const options = {
            httpOnly: true,
            secure: true,
        };

        return res.status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(new ApiResponse(
                200,
                {
                    user,
                    accessToken,
                    refreshToken,
                },
                'User logged in successfully',
            ))


    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Errror'));

    }

});

export const addDetails = asyncHandler(async (req, res) => {

    const { phoneNumber } = req.user    

    const { name, imageUrl, locationName, lat, lng } = req.body;

    try {

        if (!phoneNumber || !name || !imageUrl || !locationName || !lat || !lng) {
            return res.status(400).json(new ApiResponse(400, '', 'Phone number, name, and image ,locationName,lat,lng URL are required'));
        }

        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(404).json(new ApiResponse(404, '', 'User not found'));
        }

        // Update user details
        user.name = name;
        user.imageUrl = imageUrl;
        user.locationName = locationName
        user.lat = lat
        user.lng = lng


        await user.save();

        return res.status(200).json(new ApiResponse(200, '', 'User details updated successfully', { user }));
    } catch (error) {
        console.error('Error updating user details:', error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});


