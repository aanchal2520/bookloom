const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT; // will move it to environment variables file

// middleware
app.use(express.json());

// importing database connection object and connecting to the database
const connectToDatabase = require('./dbConnect.js');
connectToDatabase();

// importing the routes
const csvDataRoutes = require('./routes/csvDataRoutes.js');
const contentRoutes = require('./routes/contentRoutes.js');

// routes
app.use('/csv', csvDataRoutes);
app.use('/content', contentRoutes);


app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});