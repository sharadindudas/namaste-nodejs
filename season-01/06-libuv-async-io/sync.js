console.log("Synchronous code");

var a = 23023923;
var b = 23123;

function multiply(x, y) {
    const result = x * y;
    return result;
}

var c = multiply(a, b);
console.log("Multiplication result is", c);
