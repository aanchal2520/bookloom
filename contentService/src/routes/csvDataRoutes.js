const express = require('express');
const router = express.Router();
const { insertFromCSV } = require('../controllers/csvDataControllers');

router.post('/insertFromCSV', insertFromCSV);

module.exports = router;