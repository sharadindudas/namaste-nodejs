const app = require("./app");
const connectMongoDB = require("./config/database");
const PORT = process.env.PORT;

// Connection to database
connectMongoDB()
    .then(() => {
        // Connection to server
        app.listen(PORT, () => {
            console.log(`Server started at PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err.message);
    });
