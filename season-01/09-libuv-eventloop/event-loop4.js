const fs = require("fs");

setImmediate(() => console.log("setImmediate"));

setTimeout(() => console.log("Timer expired"), 0);

Promise.resolve("Promise").then(console.log);

fs.readFile("./file.txt", "utf-8", () => console.log("File reading cb"));

process.nextTick(() => {
  process.nextTick(() => console.log("Inner nextTick"));
  
  console.log("Outer nextTick");
});

console.log("Last line");
