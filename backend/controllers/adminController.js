import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Admin } from "../models/adminModel.js";
import Contact from "../models/contactModel.js";

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

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production'? 'none' :'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days cookie expiration time
            });
            
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

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none' :'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days cookie expiration time
        });

        res.json({ success: true, token, role: admin.role });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        if (!name ||!email ||!password ||!role) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

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

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none' :'strict',
        });

        return res.status(200).json({ success: true, message: "Logged out" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const isAuthenticated = (req, res) => {
    // Check if admin is authenticated
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).json({
            success: true,
            message: "Authenticated",
            user: { id: decoded.id, email: decoded.email, role: decoded.role }
        });
        
    } catch (error) {
        return res.json({ success: false, message: "Server error" });
    }
}

export const getAllAdmins = async (req, res) => {
    try {
       const admins = await Admin.find({}, "-password");
       res.status(200).json({ success: true, data: admins || [] });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }
        await Admin.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getContactMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ dateSent: -1 });
        res.status(200).json({ success: true, data: messages || [] });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching messages" });
    }
}

export const deleteContactMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Contact.findById(id);
        if(!message) {
            return res.status(404).json({ success: false, message: "Message not found" });
        }
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}