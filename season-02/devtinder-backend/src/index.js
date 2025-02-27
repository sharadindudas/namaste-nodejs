const app = require("./app");
const connectMongoDB = require("./config/mongodb");

const PORT = process.env.PORT;

connectMongoDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started at PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err.message);
    });
