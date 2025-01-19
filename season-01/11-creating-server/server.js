// const http = require("node:http");
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Namaste Node.js");
});

server.listen(7000, () => {
  console.log("Server started at PORT 7000");
});
