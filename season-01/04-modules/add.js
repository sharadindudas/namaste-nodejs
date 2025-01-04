console.log("Add module is imported...");

function calculateSub(a, b) {
  return a - b;
}

function calculateSum(a, b) {
  return a + b;
}

// module.exports = calculateSum;
// module.exports = { calculateSub, calculateSum };
export { calculateSum, calculateSub };
