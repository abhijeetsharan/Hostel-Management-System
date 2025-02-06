import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ["boys", "girls", "phd"],
        required: true,
    },
    totalRooms: {
        type: Number,
        required: true,
    },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
        }
    ]
});

// Virtual field to calculate available rooms dynamically
hostelSchema.virtual("availableRooms").get(function () {
    return this.totalRooms - this.rooms.length;
});

const Hostel = mongoose.model("Hostel", hostelSchema);
export default Hostel;