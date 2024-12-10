const fs = require("fs");

const a = 100;

setImmediate(() => console.log("setImmediate"));

fs.readFile("./file.txt", "utf-8", () => {
  console.log("File reading callback");
});

setTimeout(() => console.log("Timer expired"), 0);

function print() {
  console.log("A: ", a);
}

print()
console.log("Last line of the file")