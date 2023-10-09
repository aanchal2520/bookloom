const mongoose = require('mongoose');

const dbConnectionURI = process.env.DB_CONNECTION_URI;

const connectToDatabase = async () => {
    try {
      await mongoose.connect(dbConnectionURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Successfully connected to the database');
    } catch (error) {
      console.error(`Error connecting to the database: ${error.message}`);
      process.exit(1); // Exit with failure
    }
};

module.exports = connectToDatabase;