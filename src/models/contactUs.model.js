import mongoose, { Schema } from 'mongoose';

const contactUsSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    type: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    }
})

export const ContactUs = mongoose.model('ContactUs', contactUsSchema);
