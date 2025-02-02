import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { createNotification, deleteNotification, getNotifications } from "../controllers/notifcationController.js";

const router = express.Router();

// Route to create a notifivation
router.post("/create", adminAuth(["admin", "superadmin"]), createNotification);

// Route to get all notifications (admins can view all, users can view their own)
router.get("/view", adminAuth(["admin", "superadmin"]), getNotifications);

router.delete("/delete/:id", adminAuth(["admin", "superadmin"]), deleteNotification);

export default router;