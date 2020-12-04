const fs = require("fs");
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

function validateByr(num) {
  return num >= 1920 && num <= 2002;
}

function validateIyr(year) {
  return year >= 2010 && year <= 2020;
}

function validateEyr(year) {
  return year >= 2020 && year <= 2030;
}

function validateHgt(height) {
  const matchValidHeightInCmOrIn = /(\d+)(cm)|(\d+)(in)/;
  if (!matchValidHeightInCmOrIn.test(height)) {
    return false;
  }
  const [
    _fullMatch,
    cmNumber,
    _cmLabel,
    inNumber,
    _inLabel,
  ] = matchValidHeightInCmOrIn.exec(height);
  return (
    (cmNumber >= 150 && cmNumber <= 193) || (inNumber >= 59 && inNumber <= 76)
  );
}

function validateHcl(hairColor) {
  return /#([0-9]|[a-f]){6}/.test(hairColor);
}

function validateEcl(eyeColor) {
  const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  return validEyeColors.includes(eyeColor);
}

function validatePid(num) {
  if (num) {
    return num.toString().length === 9;
  } else return false;
}

function validatePassport(passport) {
  let validationArray = [];
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport;
  if (validateByr(byr)) {
    validationArray.push(true);
  } else validationArray.push(false);
  if (validateIyr(iyr)) {
    validationArray.push(true);
  } else validationArray.push(false);
  if (validateEyr(eyr)) {
    validationArray.push(true);
  } else validationArray.push(false);
  if (hgt && validateHgt(hgt)) {
    validationArray.push(true);
  } else validationArray.push(false);
  if (validateHcl(hcl)) {
    validationArray.push(true);
  } else validationArray.push(false);
  if (validateEcl(ecl)) {
    validationArray.push(true);
  } else validationArray.push(false);
  if (validatePid(pid)) {
    validationArray.push(true);
  } else validationArray.push(false);

  const isValid = validationArray.includes(false);

  return !isValid;
}

const blockified = blockifyInput(split);
const cleaned = blockified.map((item) => cleanFurther(item));
const objectified = cleaned.map((array) => {
  const holding = {};
  array.forEach((item) => {
    const [key, value] = item.split(":");
    holding[key] = value;
  });
  return holding;
});

let validCount = 0;
for (let object of objectified) {
  if (validatePassport(object)) {
    validCount++;
  }
}

console.log(validCount);
