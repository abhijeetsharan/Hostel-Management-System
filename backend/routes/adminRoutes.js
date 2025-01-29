import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { addAdmin, isAuthenticated, loginAdmin, logout } from '../controllers/adminController.js';

const adminRouter = express.Router();

// Admin routes
adminRouter.post('/login', loginAdmin)
adminRouter.post('/logout', logout)
adminRouter.get("/is-admin", isAuthenticated)

// Super Admin adds a new admin
adminRouter.post('/add-admin', adminAuth(["superadmin"]), addAdmin);


export default adminRouter;
