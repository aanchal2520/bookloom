const express = require('express');
const app = express();
const PORT = 3002; // will move it to environment variables file

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