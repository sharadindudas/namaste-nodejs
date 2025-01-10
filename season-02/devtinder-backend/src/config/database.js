const mongoose = require("mongoose");

const connectMongoDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sharadindudas:7901G071EcXcS5YV@cluster0.m8szt.mongodb.net",
    {
      dbName: "devtinder",
    }
  );
};

module.exports = connectMongoDB;
