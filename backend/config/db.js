require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI; // Fetch MONGO_URI from environment variables
    await mongoose.connect(dbURI); // No need for options anymore
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database connection failed:', error);
    process.exit(1); // Exit if the connection fails
  }
};

module.exports = connectDB;
