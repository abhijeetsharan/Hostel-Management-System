import mongoose from 'mongoose';

const vacateRoomRequestSchema = new mongoose.Schema({
    rollNumber: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        enum: ['internship', 'medical', 'personal'],
        required: true,
    },
    additionalDetails: {
        type: String,
        default: '',
    },
    vacateDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const VacateRoomRequest = mongoose.model('VacateRoomRequest', vacateRoomRequestSchema);

export default VacateRoomRequest;