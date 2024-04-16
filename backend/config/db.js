const mongoose = require('mongoose');
const config = require('config');
const database = config.get('secret');

const connectDB = async () => {
    try {
        console.log("[LOG] - In DB Connect");
        await mongoose.connect(database);
        console.log(`[INFO] - Database Connected Successfully!`)
    } catch (error) {
        console.error('[ERROR] - '+error.message);
        process.exit(1);
    }
}

module.exports = connectDB; 