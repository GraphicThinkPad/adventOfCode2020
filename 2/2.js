const input = require("./input.json");

function transformPasswordPolicyToObject(passwordPolicy) {
  const minRegex = /^\d+/;
  const maxRegex = /-\d+/;
  const charRegex = /\w:/;
  const passwordRegex = /\w+$/;

  const min = Number(minRegex.exec(passwordPolicy)[0]);
  const max = Number(maxRegex.exec(passwordPolicy)[0].substring(1));
  const char = charRegex.exec(passwordPolicy)[0].slice(0, -1);
  const password = passwordRegex.exec(passwordPolicy)[0];

  return { min, max, char, password };
}

function countInstancesOfCharInString(char, string) {
  const regexNotMatchingChar = new RegExp(`[^${char}]`, "g");
  return string.replace(regexNotMatchingChar, "").length;
}

function passwordIsValidPuzzle1(objectifiedPasswordPolicy) {
  const { min, max, char, password } = objectifiedPasswordPolicy;
  const countOfCharInstancesInPassword = countInstancesOfCharInString(
    char,
    password
  );
  return (
    countOfCharInstancesInPassword <= max &&
    countOfCharInstancesInPassword >= min
  );
}

function passwordIsValidPuzzle2(objectifiedPasswordPolicy) {
  const { char, password } = objectifiedPasswordPolicy;
  // Just renaming the initial min-max values to fit our use case here. I know I'm being lazy.
  const firstPositionIndex = objectifiedPasswordPolicy.min;
  const secondPositionIndex = objectifiedPasswordPolicy.max;

  // Tobogganites don't use zero-based indexing. Sigh.
  const firstPositionInOneBasedIndex = firstPositionIndex - 1;
  const secondPositionInOneBasedIndex = secondPositionIndex - 1;

  const firstPositionHasChar = password[firstPositionInOneBasedIndex] === char;
  const secondPositionHasChar =
    password[secondPositionInOneBasedIndex] === char;

  // Needed to simulate an xor.
  return (
    (firstPositionHasChar && !secondPositionHasChar) ||
    (!firstPositionHasChar && secondPositionHasChar)
  );
}

let validPasswords = 0;
for (let passwordGuidelines of input) {
  const objectifiedPasswordPolicy = transformPasswordPolicyToObject(
    passwordGuidelines
  );
  if (passwordIsValidPuzzle2(objectifiedPasswordPolicy)) {
    validPasswords++;
  }
}

console.log(validPasswords);
