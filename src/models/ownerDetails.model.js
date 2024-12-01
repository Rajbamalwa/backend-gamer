import mongoose, { Schema } from "mongoose";

const ownerDetailsSchema = new Schema(
    // {
    //     imageUrl: {
    //         type: String,
    //     },
    //     lat: {
    //         type: Number,

    //     },
    //     lng: {
    //         type: Number,

    //     },
    //     locationName: {
    //         type: String,
    //     },
    // userId: { //--
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'UserDetails',
    // }
    // },
    {
        timestamps: true
    }
)




export const OwnerDetails = mongoose.model("OwnerDetails", ownerDetailsSchema);