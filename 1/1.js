const input = require("./input.json");

function twoNumbersSumTo2020(x, y) {
  return x + y === 2020;
}

function threeNumbersSumTo2020(x, y, z) {
  return x + y + z === 2020;
}

for (let i = 0; i <= input.length - 1; i++) {
  const first = input[i];
  for (let j = 1; j <= input.length - 1; j++) {
    const second = input[j];
    for (let z = 2; z <= input.length - 1; z++) {
      const third = input[z];
      if (threeNumbersSumTo2020(first, second, third)) {
        console.log(first * second * third);
      }
    }
  }
}
