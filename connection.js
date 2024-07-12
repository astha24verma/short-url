const mongoose = require('mongoose');
require('dotenv').config();
let isConnected = false;

const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('MongoDB is already connected !!');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "short-url",
    });
    isConnected = true;
    console.log('MongoDB connected !');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectToDB };