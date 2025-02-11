const crypto = require("crypto");
const fs = require("fs");

console.log("Blocking code execution started...");

var a = 23023923;
var b = 23123;

// Sync function
crypto.pbkdf2Sync("password12", "salt", 5000000, 50, "sha512");
console.log("First key is generated");
fs.readFileSync("./file.txt", "utf-8");

// Async function
crypto.pbkdf2("password123", "salt", 500000, 50, "sha512", (err, key) => {
    console.log("Second key is generated");
});
fs.readFile("./file.txt", "utf-8", (err, data) => {
    console.log("File is read successfully");
});

function multiply(x, y) {
    const result = x * y;
    return result;
}

var c = multiply(a, b);
console.log("Multiplication result is", c);
