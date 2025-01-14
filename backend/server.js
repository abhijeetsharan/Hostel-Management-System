const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

//Load Environment Variables
dotenv.config();

//Connect to the Database
connectDB();

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/auth', require('./routes/auth'));

//Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on the port ${PORT}`));
