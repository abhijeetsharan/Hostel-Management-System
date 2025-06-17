import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import hostelRouter from "./routes/hostelRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

//Connect to the Database
connectDB();


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(
    cors({
        origin: [
            "https://bit-mesra-hostel.vercel.app",
            "https://bit-mesra-hostel-admin.vercel.app"
        ],
        credentials: true,
        methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        allowedHeaders: "Content-Type,Authorization",
    })
);

//API Endpoints
app.get('/', (req, res) => {
    res.send('API Working')
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/notifications', notificationRoutes)
app.use('/api/hostel', hostelRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
