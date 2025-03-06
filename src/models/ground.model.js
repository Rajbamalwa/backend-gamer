import mongoose, { Schema } from "mongoose";

const groundSchema = new Schema({
    name: { //
        type: String,
    },
    description: { //
        type: String,
    },
    lat: { //
        type: Number,
    },
    lng: { //
        type: Number,
    },
    city: { //
        type: String,
    },
    state: { //
        type: String,
    },
    country: { //
        type: String,
    },
    address: { //
        type: String,
        required: true
    },
    index: { //
        type: Number,
    },
    image: [{ //
        type: String,
    }],
    likes: { //
        type: Number,
        default: 0
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    bookingStatus: { //-------
        type: Boolean,
        default: true
    },
    listed: {
        type: Boolean,
        default: false
    },
    equipmentProvide: { //--//
        type: Boolean,
        default: false
    },
    pricing: {
        type: Number,
        require: true
    },
    discountAmount: {
        type: Number,
        require: true
    },
    discountText: {
        type: String,
        require: true
    },
    groundRules: [{
        type: String
    }],

    toilet: {  //--//
        type: Boolean,
        default: false
    },
    changingRoom: {  //--//
        type: Boolean,
        default: false
    },
    parking: {  //--//
        type: Boolean,
        default: false
    },
    showers: {  //--//
        type: Boolean,
        default: false
    },
    cancelPolicy: { // --
        type: String,
    },
    refundPolicy: {  // --
        type: String,
    },
    hostStatus: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    gameTypeId: [{ //--
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameType',
    }],
    gameFeaturesId: [{ //--
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameFeatures',
    }],

}, { timestamps: true });


export const Ground = mongoose.model("Ground", groundSchema);
