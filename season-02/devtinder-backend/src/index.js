const app = require("./app");
const connectMongoDB = require("./config/mongodb");

const PORT = process.env.PORT;

// Connecting to mongodb
connectMongoDB()
    .then(() => {
        console.log("MongoDB is connected successfully");

        // Connecting to server
        app.listen(PORT, () => {
            console.log(`Server started at PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });
