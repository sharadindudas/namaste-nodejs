const express = require("express");

const app = express();
const PORT = 3000;

app.get("/getData", (req, res) => {
  try {
    // Logic of db call and get data
    throw new Error("Error occurred");
  } catch (err) {
    res.status(500).send("Some error occurred");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
