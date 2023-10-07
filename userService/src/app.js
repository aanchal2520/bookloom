const express = require('express');
const app = express();
const PORT = 3003; // will move it to environment variables file

// middleware
app.use(express.json());

// importing database connection object and connecting to the database
const connectToDatabase = require('./dbConnect.js');
connectToDatabase();

// importing the routes
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

// route middlewares
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// listening
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});