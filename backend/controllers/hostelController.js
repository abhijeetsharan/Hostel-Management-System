import Hostel from "../models/hostelModel.js";
import Room from "../models/roomModel.js";

export const createHostel = async (req, res) => {
    try {
        const { name, type, totalRooms } = req.body;

        //Check if hostel with the same name exists
        const existingHostel = await Hostel.findOne({ name });
        if (existingHostel) {
            return res.status(400).json({ message: "Hostel with the same name already exists" });
        }

        // Create the hostel
        const newHostel = new Hostel({ name, type, totalRooms });
        await newHostel.save();

        // Automatically generate rooms
        const rooms = [];
        for (let i = 1; i <= totalRooms; i++) {
            rooms.push({ hostel: newHostel._id, roomNumber: i });;
        }
        
        // Save all rooms in database
        const createdRooms = await Room.insertMany(rooms);

        // Update hostel with room references
        newHostel.rooms = createdRooms.map(room => room._id);
        await newHostel.save();

        res.status(201).json({
            success: true,
            message: "Hostel created with rooms",
            hostel: newHostel,
            rooms: createdRooms
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getHostels = async (req, res) => {
    try {
        const hostels = await Hostel.find();
        res.status(200).json({ success: true, hostels });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const deleteHostel = async (req, res) => {
    try {
        const { hostelId } = req.params;

        const deletedHostel = await Hostel.findByIdAndDelete(hostelId);
        if (!deletedHostel) {
            return res.status(404).json({ success: false, message: "Hostel not found" });
        }

        await Room.deleteMany({ hostel: hostelId });

        res.status(200).json({ success: true, message: "Hostel and its rooms deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getRoomsByHostel = async (req, res) => {
    try {
        const { hostelId } = req.params;
        const { page = 1, limit = 20 } = req.query; // Default to page 1, limit 10 per page

        // Find the hostel
        const hostel = await Hostel.findById(hostelId);
        if (!hostel) {
            return res.status(404).json({ success: false, message: "Hostel not found" });
        }

        // Paginate rooms
        const totalRooms = await Room.countDocuments({ hostel: hostelId });
        const rooms = await Room.find({ hostel: hostelId })
            .populate("allocatedStudents", "name rollNumber") // Populate student details
            .skip((page - 1) * limit) // Skip rooms based on page
            .limit(parseInt(limit)); // Limit the number of results per page

        res.status(200).json({
            success: true,
            hostelName: hostel.name,
            rooms,
            totalPages: Math.ceil(totalRooms / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
