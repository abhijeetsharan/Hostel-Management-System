import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Admin } from "../models/adminModel.js";

dotenv.config();

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Super Admin Login
        if (email === process.env.SUPER_ADMIN_EMAIL && password === process.env.SUPER_ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email, role: "superadmin" },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );
            return res.json({ success: true, token, role: "superadmin" });
        }

        // Regular Admin Login
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
            return res.status(401).json({ success: false, message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ success: true, token, role: admin.role });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Ensure admin doesn't already exist
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: "Admin already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newAdmin.save();
        res.status(201).json({ success: true, message: "Admin created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};