import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    dateSent: {
        type: Date,
        default: Date.now
    },
})

const notificationModel = mongoose.models.notification || mongoose.model('notification', notificationSchema)

export default notificationModel;