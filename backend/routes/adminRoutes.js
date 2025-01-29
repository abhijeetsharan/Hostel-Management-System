import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { addAdmin, loginAdmin } from '../controllers/adminController.js';

const adminRouter = express.Router();

// Admin routes
adminRouter.post('/login', loginAdmin)

// Super Admin adds a new admin
adminRouter.post('/add-admin', adminAuth(["superadmin"]), addAdmin);

export default adminRouter;