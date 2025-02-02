import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { addAdmin, allocateRoom, deleteAdmin, deleteContactMessage, getAllAdmins, getApplications, getContactMessages, isAuthenticated, loginAdmin, logout, updateApplicationStatus } from '../controllers/adminController.js';

const adminRouter = express.Router();

// Admin routes
adminRouter.post('/login', loginAdmin)
adminRouter.post('/logout', logout)
adminRouter.get("/is-admin", isAuthenticated)
adminRouter.get("/all-admins", adminAuth(["superadmin"]), getAllAdmins)

// Super Admin adds a new admin
adminRouter.post('/add-admin', adminAuth(["superadmin"]), addAdmin);

// delete admin
adminRouter.delete('/delete-admin/:id', adminAuth(["superadmin"]), deleteAdmin);

//Contact Form Routes
adminRouter.get("/messages", getContactMessages);
adminRouter.delete("/delete/:id", deleteContactMessage);


// Get all applications (Admin only)
adminRouter.get('/applications', adminAuth(["superadmin", "admin", "warden"]), getApplications)

// Approve or Reject Application (Admin only)
adminRouter.put('/applications/:id/status', adminAuth(["superadmin", "admin"]), updateApplicationStatus);

// Allocate Hostel & Room (Admin only)
adminRouter.put('/applications/:id/allocate', adminAuth(["superadmin", "admin"]), allocateRoom);


export default adminRouter;
