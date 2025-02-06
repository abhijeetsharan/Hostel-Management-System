import express from "express";
import { createHostel, deleteHostel, getHostels, getRoomsByHostel } from "../controllers/hostelController.js";
import adminAuth from "../middleware/adminAuth.js";

const hostelRouter = express.Router();

hostelRouter.post("/create",adminAuth(["superadmin", "admin"]), createHostel);
hostelRouter.get("/", getHostels);
hostelRouter.delete("/:hostelId",adminAuth(["superadmin", "admin"]), deleteHostel);

hostelRouter.get("/:hostelId", getRoomsByHostel);

export default hostelRouter;