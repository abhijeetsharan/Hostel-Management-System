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

// export const getNotifications = async(req, res) => {
//     try {
//         let notifications;

//         if(req.admin.role === "superadmin" || req.admin.role === "admin"){
//             // Admins can see all notifications
//             notifications = await Notification.find().populate("recipient", "name email");
//         } else {
//             // Users can only see their own notifications
//             notifications = await Notification.find({ recipient: req.admin._id });
//         }
        
//         res.status(200).json({ success: true, notifications });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server error", error: error.message })
//     }
// };

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