const input = require("./input.json");

function twoNumbersSumTo2020(x, y) {
  return x + y === 2020;
}

for (let i = 0; i <= input.length - 1; i++) {
  const current = input[i];
  for (let j = 0; j <= input.length - 1; j++) {
    const comparator = input[j];
    if (twoNumbersSumTo2020(current, comparator)) {
      console.log(current * comparator);
    }
  }
}
