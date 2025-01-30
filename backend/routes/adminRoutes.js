import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { addAdmin, deleteAdmin, getAllAdmins, isAuthenticated, loginAdmin, logout } from '../controllers/adminController.js';

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


export default adminRouter;
