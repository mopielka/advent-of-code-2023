const fs = require('node:fs');

const rawInput = fs.readFileSync('./input.txt').toString('utf8');
let input = rawInput;

if (process.argv[2] === 'plus') {
  const digitNames = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];

  for (let i = 0; i < digitNames.length; i++) {
    input = input.replaceAll(digitNames[i], `${digitNames[i]}${i}${digitNames[i]}`);
  }
}

console.log(
  input.split('\n')
    .map(line => {
      const digits = line.replace(/[^0-9]/g, '');

      return Number(digits[0]) * 10 + Number(digits[digits.length - 1]);
    })
    .reduce((sum, cur) => sum + cur, 0)
);

