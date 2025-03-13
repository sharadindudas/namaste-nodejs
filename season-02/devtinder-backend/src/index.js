const app = require("./app");
const connectMongoDB = require("./utils/mongodb");

const PORT = process.env.PORT;

// Connection to mongodb
connectMongoDB()
    .then(() => {
        // Connection to server
        app.listen(PORT, () => {
            console.log(`Server started at PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });
