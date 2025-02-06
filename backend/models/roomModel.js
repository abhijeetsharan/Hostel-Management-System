import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: true
    },
    roomNumber: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        default: 2
    },
    allocatedStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

// Ensure room numbers are unique per hostel
roomSchema.index({ hostel: 1, roomNumber: 1 }, { unique: true });



const Room = mongoose.model("Room", roomSchema);
export default Room;