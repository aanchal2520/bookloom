// const swaggerUI = require('swagger-ui-express');
// const YAML = require('yamljs');
// const swaggerJsDocs = YAML.load('api.yaml');
const express = require('express');
const app = express();
const proxy = require('express-http-proxy');


const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.use('/contentService', proxy('http://content_service:3001'));
app.use('/userInteractionService', proxy('http://user_interaction_service:3002'));
app.use('/userService', proxy('http://user_service:3003'));

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});