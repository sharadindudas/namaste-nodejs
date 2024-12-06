const fs = require("fs");

const a = 100;
setImmediate(() => console.log("setImmediate callback"));

fs.readFile("./file.txt", "utf-8", () => {
  console.log("File reading callback");
});

setTimeout(() => console.log("Timer expired"), 0);
function print() {
  console.log("A: ", a);
}
print();
console.log("Last line of the file");

/* 
  Output
  -------
  A: 100
  Last line of the file
  Timer expired
  setImmediate callback
  File reading callback
*/
