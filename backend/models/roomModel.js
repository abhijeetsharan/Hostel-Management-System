import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true
    },
    roomType: {
        type: String,
        enum: ['single', 'double', 'triple'],
        required: true
    },
    roomStatus: {
        type: String,
        enum: ['available', 'occupied'],
        required: true
    },
    occupants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

const roomModel = mongoose.models.room || mongoose.model('room', roomSchema)

export default roomModel;