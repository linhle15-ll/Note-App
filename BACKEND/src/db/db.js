const mongoose = require('mongoose');
MONGODB_URI = process.env.MONGODB_URI;

const db = async() => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        
    }
}
 
module.exports = db;