import mongoose, { Schema } from "mongoose";

const userDetailsSchema = new Schema(
    {
        name: {
            type: String,
            required: true

        },
        imageUrl: {
            type: String,
        },
        lat: {
            type: Number,

        },
        lng: {
            type: Number,

        },
        locationName: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    {
        timestamps: true
    }
)




export const UserDetails = mongoose.model("UserDetails", userDetailsSchema);