import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const adminAuth = (allowedRoles) => (req, res, next) => {
    try {
        const token = req.headers["x-auth-token"];
        if (!token) {
            return res.status(401).json({ success: false, message: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;

        // Super Admin Authentication
        if (decoded.role === "superadmin" && decoded.email === process.env.SUPER_ADMIN_EMAIL) {
            return next();
        }

        // Check if the role is allowed
        if (!allowedRoles.includes(decoded.role)) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Token is not valid" });
    }
};

export default adminAuth;
