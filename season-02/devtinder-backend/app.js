const express = require("express");

const app = express();
const PORT = 3000;

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Route handler 1");
//     res.send("Route handler 1");
//     next();
//   },
//   (req, res) => {
//     console.log("Route handler 2");
//     res.send("Route handler 2");
//   }
// );

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Route handler 1");
//     next();
//     res.send("Route handler 1");
//   },
//   (req, res) => {
//     console.log("Route handler 2");
//     res.send("Route handler 2");
//   }
// );

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
