const express = require('express');
const app = express();
const proxy = require('express-http-proxy');

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.use('/contentService', proxy('http://localhost:3001'));
app.use('/userInteractionService', proxy('http://localhost:3002'));
app.use('/userService', proxy('http://localhost:3003'));

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});