import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import otpGenerator from 'otp-generator';
import axios from 'axios';
import { Otp } from "../models/otp.model.js";
import { GroundOwnerDetails } from "../models/groundOwnerDetails.model.js";

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
        const { phoneNumber, otp, isOwner } = req.body;

        // Validate input
        if (!phoneNumber || !otp) {
            return res.status(400).json(new ApiResponse(400, '', 'Phone number and OTP are required'));
        }

        // Check if the user is an owner and if the owner is verified
        let groundDetails = null;
        if (isOwner) {
            groundDetails = await GroundOwnerDetails.findOne({ phoneNo: phoneNumber });
            if (!groundDetails) {
                return res.status(404).json(new ApiResponse(404, '', 'Ground owner details not found'));
            }
            if (!groundDetails.isVerified) {
                return res.status(400).json(new ApiResponse(400, '', 'User is not verified'));
            }
        }

        // Verify OTP
        const otpRecord = await Otp.findOne({ phoneNumber, otp });
        if (!otpRecord) {
            return res.status(400).json(new ApiResponse(400, '', 'Invalid OTP'));
        }

        if (Date.now() > new Date(otpRecord.expiresAt)) {
            return res.status(400).json(new ApiResponse(400, '', 'OTP expired'));
        }

        // Find or create user
        let user = await User.findOne({ phoneNumber, isOwner: isOwner || false });
        if (!user) {
            user = await User.create({ phoneNumber, isOwner: isOwner || false });

            // Link user to ground owner details if applicable
            if (isOwner && groundDetails) {
                await GroundOwnerDetails.findByIdAndUpdate(
                    groundDetails._id,
                    { userId: user._id },
                    { new: true }
                );
            }
        }

        // Generate tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        // Set cookie options
        const options = {
            httpOnly: true,
            secure: true,
        };

        // Respond with tokens and user info
        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { user, accessToken, refreshToken },
                    'User logged in successfully'
                )
            );
    } catch (error) {
        console.error('Error in verifyOtp:', error);
        return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
    }
});


