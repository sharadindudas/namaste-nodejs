const fs = require("fs");
const https = require("https");

console.log("Asynchronous + Synchronous code");

var a = 23023923;
var b = 23123;

https.get("https://dummyjson.com/products/1", (res) => {
    console.log("Fetched data successfully");
});

setTimeout(() => {
    console.log("setTimeout is called after 5 seconds");
}, 5000);

fs.readFile("./file.txt", "utf-8", (err, data) => {
    console.log("File Data: ", data);
});

function multiply(x, y) {
    const result = x * y;
    return result;
}

var c = multiply(a, b);
console.log("Multiplication result is", c);
