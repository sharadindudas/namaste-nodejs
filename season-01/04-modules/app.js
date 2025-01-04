console.log("Main entry point of the backend...");
// const add = require("./add.js");
// console.log(`Sum of two nos are`, add(10, 20));

// const { calculateSub, calculateSum } = require("./add.js");
// console.log(`Sum of two nos are`, calculateSum(10, 20));
// console.log(`Sum of two nos are`, calculateSub(30, 10));

//! ES Module
// import { calculateSub, calculateSum } from "./add.js";
// console.log(`Sum of two nos are`, calculateSum(10, 20));
// console.log(`Sum of two nos are`, calculateSub(30, 10));

//! Importing from calculate module
const { SumOfTwoNos, SubOfTwoNos, MulOfTwoNos } = require("./calculate");
const a = 20,
  b = 10;

SumOfTwoNos(a, b);
SubOfTwoNos(a, b);
MulOfTwoNos(a, b);

//! Importing json file
const data = require("./data.json");
console.log(data);
