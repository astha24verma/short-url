const mongoose = require('mongoose');

const connectToMongodb = async (url) => {
    mongoose.connect(url);
};

module.exports = { connectToMongodb, };