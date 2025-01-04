const fs = require("fs");
const a = 100;

setImmediate(() => console.log("setImmediate"));

Promise.resolve("Promise").then(console.log);

fs.readFile("./file.txt", "utf-8", () => {
  console.log("File reading cb");
});

setTimeout(() => console.log("Timer expired"), 0);

process.nextTick(() => console.log("process.nextTick"));

function print() {
  console.log("A:", a);
}
print();

console.log("Last line of the file");

/*
  Output
  ------
  A: 100
  Last line of the file
  process.nextTick
  Promise
  Timer expired
  setImmediate
  file reading cb
*/
