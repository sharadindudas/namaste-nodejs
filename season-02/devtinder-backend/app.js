const express = require("express");

const app = express();
const PORT = 3000;

app.use("/", (req, res) => {
  res.send("Namaste Sharadindu!");
});

app.use("/test", (req, res) => {
  res.send("Testing");
});

app.use("/hello", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
