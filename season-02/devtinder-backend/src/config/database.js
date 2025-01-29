const mongoose = require("mongoose");

const connectMongoDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
        dbName: "devtinder"
    });
};

module.exports = connectMongoDB;
