import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"


const groundUserSchema = new Schema(
    {
      

    },
    {
        timestamps: true
    }
)

groundUserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
groundUserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}




export const GroundUser = mongoose.model("GroundUser", groundUserSchema);