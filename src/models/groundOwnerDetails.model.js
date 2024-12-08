import mongoose, { Schema } from 'mongoose';

const groundOwnerDetails = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
    currentPhoneNo: {
      type: Number,
    },
    address:{
        type: String,
    },
    adharImage : {
        type: String,
    },
    isVerified:{
        type : Boolean,
        default : false
    }
    // userId: {
    //   //--
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'UserDetails',
    // },
  },
  {
    timestamps: true,
  },
);

export const GroundOwnerDetails = mongoose.model('GroundOwnerDetails', groundOwnerDetails);
