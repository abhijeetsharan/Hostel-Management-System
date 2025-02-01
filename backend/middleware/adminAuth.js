import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const adminAuth = (allowedRoles = []) => (req, res, next) => {
    try {
        const token = req.cookies?.token || 
                      req.headers["x-auth-token"] || 
                      req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded; // Attach admin info to the request

        // 🟢 Super Admin Authentication
        const isSuperAdmin = decoded.role === "superadmin" && decoded.email === process.env.SUPER_ADMIN_EMAIL;
        if (isSuperAdmin) {
            return next(); // Grant access immediately
        }

        // 🔴 Ensure `allowedRoles` is an array & check authorization
        if (!Array.isArray(allowedRoles) || !allowedRoles.includes(decoded.role)) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        next(); // Proceed if authorized
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        res.status(401).json({ success: false, message: "Token is not valid" });
    }
};

export default adminAuth;
