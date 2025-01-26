import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
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
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
})

const roomModel = mongoose.models.room || mongoose.model('room', roomSchema)

export default roomModel;