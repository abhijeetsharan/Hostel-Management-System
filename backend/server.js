import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";

const app = express();

//Connect to the Database
connectDB();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true}))

//API Endpoints
app.get('/', (req, res) => {
    res.send('API Working')
})

//Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
