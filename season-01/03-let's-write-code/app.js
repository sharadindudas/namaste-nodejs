var name = "Namaste Nodejs";
var a = 10,
    b = 20;
console.log(name);
console.log(a + b);

console.log(global); // Nodejs global object
console.log(this); // Empty object
console.log(globalThis); // Standard global object
console.log(globalThis === global);
