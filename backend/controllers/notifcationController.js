import { Admin } from "../models/adminModel.js";
import Notification from "../models/notificationModel.js";

export const createNotification = async (req, res) => {
    try {
        const { title, message, recipient } = req.body;

        // Check if required firlds are provided
        if (!title || !message){
            return res.status(400).json({ message: "Title and message are required" });
        }

        const newNotification = new Notification({
            title,
            message,
            recipient: recipient || null, // If recipient is null, it's a global notification
        });

        await newNotification.save();
        res.status(201).json({ success: true, message: "Notification sent successfully", notification: newNotification });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const getNotifications = async(req, res) => {
    try {
        const adminId = req.body.adminId
    
        const notifications = await Notification.find({
          $or: [{ recipient: adminId }, { recipient: null }],
        }).sort({ dateSent: -1 })
        
        return res.json({ success: true, notifications })
    
      } catch (error) {
        res.status(500).json({ success: false, message: error.message })
      }
};

export const deleteNotification = async (req, res) => {
    try {
        const { id } =  req.params;

        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }

        await Notification.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Notification deleted successfully" });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}