const express = require("express");

const app = express();
const PORT = 3000;

// Middlewares
app.use("/admin", (req, res, next) => {
  console.log("Admin auth is getting checked");
  const token = "abc";
  const isAdmin = token === "abc";
  if (!isAdmin) {
    res.status(401).send("User is not an admin");
  } else {
    next();
  }
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All data is sent");
});

app.delete("/admin/deleteData", (req, res) => {
  res.send("Deleted the data");
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
