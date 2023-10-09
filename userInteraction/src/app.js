const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

// middleware
app.use(express.json());

// importing database connection object and connecting to the database
const connectToDatabase = require('./dbConnect.js');
connectToDatabase();

// importing the routes
const userInteractionRoutes = require('./routes/userInteractionRoutes');

// route middlewares
app.use('/userInteraction', userInteractionRoutes);

// listening
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});