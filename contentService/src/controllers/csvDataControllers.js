const mongoose = require('mongoose');
const csvtojson = require('csvtojson');
const path = require('path');

const Book = require('../models/Book');

// exports.insertFromCSV = async (req, res) => {
//     csvtojson()
//         .fromFile('data.csv')
//         .then(csvData => {
//             Book.insertMany(csvData).then(() => {
//                 res.status(200).json({ message: 'CSV Data successfully added to the database' });
//             }).catch((err) => {
//                 // add status
//                 res.json({ message: 'Could not upload data from csv to database', err: err });
//             })
//         })
// }

exports.insertFromCSV = async (req, res) => {
    try {
        const filePath = path.resolve(__dirname, '../data.csv');
        const csvData = await csvtojson().fromFile(filePath);

        // Convert user_id strings to ObjectId
        csvData.forEach(item => {
            item.user_id = new mongoose.Types.ObjectId(item.user_id);
        });

        await Book.insertMany(csvData);
        res.status(200).json({ message: 'CSV Data successfully added to the database' });
    } catch (error) {
        console.log(error);
        console.error('Error inserting data from CSV:', error);
        res.status(500).json({ message: 'Could not upload data from csv to database', error: error.message });
    }
}