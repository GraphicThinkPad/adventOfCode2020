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

function passwordIsValid(objectifiedPasswordPolicy) {
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

let validPasswords = 0;
for (let passwordGuidelines of input) {
  const objectifiedPasswordPolicy = transformPasswordPolicyToObject(
    passwordGuidelines
  );
  if (passwordIsValid(objectifiedPasswordPolicy)) {
    validPasswords++;
  }
}

console.log(validPasswords);
