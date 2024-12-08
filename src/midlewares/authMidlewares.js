import { User } from '../models/user.model.js'
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from '../utils/ApiResponse.js';


const isAutheticated = asyncHandler(async (req, res, next) => {
    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
       
        if (!token) {
            return res.status(401).json(new ApiResponse(401, '', 'Unothorised Uers'));

        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        
        if (!user) {
            return res.status(401).json(new ApiResponse(401, '', 'Invalid Access Token'));

        }

        req.user = user;        
        next()
        
    } catch (error) {
        return res.status(401).json(new ApiResponse (401, error?.message || "Invalid access token"));

    }

})
const isUser = (isUser) => {
    
    return (req, _, next) => {
        const {isOwner} =  req.user
        console.log(isOwner);
        
        if (isOwner === false && isUser === true) {
           return next();
        }


        return new ApiError(401, 'Unauthorized: wrong user');
    };
};



export { isAutheticated,isUser }


