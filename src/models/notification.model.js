import mongoose, { Schema } from 'mongoose';

const notificationSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    }
})

export const Notification = mongoose.model('Notification', notificationSchema);
