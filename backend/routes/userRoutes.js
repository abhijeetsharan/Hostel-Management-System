import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getNotifications, getUserData, submitApplication, submitContactForm } from '../controllers/userController.js';
import {upload} from "../middleware/multer.js"

const userRouter = express.Router();

userRouter.route("/submit").post(
    upload.fields([
        {
            name: "admissionReceipt",
            maxCount: 1
        },
        {
            name: "feeReceipt",
            maxCount: 1
        }
    ]),
    submitApplication
)

userRouter.get('/data', userAuth, getUserData);

//fetch notifications for the logged in user
userRouter.get('/notifications', userAuth, getNotifications);
userRouter.post('/contact', userAuth, submitContactForm)

export default userRouter;