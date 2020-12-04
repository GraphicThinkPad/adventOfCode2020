const fs = require("fs");
const { difference } = require("lodash");

const input = fs.readFileSync("./input.txt", "ascii");

// If there is a single non-whitespace character, return false.
function isEmptyLine(string) {
  return !/\S/.test(string);
}

// First, we must chunk the input into blocks separated by whitespace. Array of strings?

const split = input.split("\n");

const test = split.slice(0, 17);

// Challenge 1: Transform these strings into little pods.

function blockifyInput(arrayOfStrings) {
  const blockifiedInput = [];
  let lastSeparatorPosition = 0;
  for (let i = 0; i <= arrayOfStrings.length - 1; i++) {
    const currentString = arrayOfStrings[i];
    if (isEmptyLine(currentString)) {
      // Rather than this, I'll need to make it an array.
      const chunked = arrayOfStrings.slice(lastSeparatorPosition, i);
      blockifiedInput.push(chunked);
      // Avoid putting an empty line in there
      lastSeparatorPosition = i + 1;
    }
  }
  return blockifiedInput;
}

function cleanFurther(array) {
  const pretty = [];
  array.forEach((string) => {
    const splitString = string.split(" ");
    splitString.forEach((thing) => pretty.push(thing));
  });
  return pretty;
}

function removeFurther(array) {
  return array.map((item) => item.split(":")[0]);
}

const blockified = blockifyInput(split);
const cleaned = blockified.map((item) => cleanFurther(item));
const simplified = cleaned.map((item) => removeFurther(item));

function validatePassport(passport) {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  return difference(requiredFields, passport).length === 0;
}

let valid = 0;
for (let item of simplified) {
  if (validatePassport(item)) {
    valid++;
  }
}
console.log(valid);
