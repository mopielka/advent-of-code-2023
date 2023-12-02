const fs = require('node:fs');

const input = fs.readFileSync('./input.txt').toString('utf8');

console.log(
  input.split('\n')
    .map(line => {
      const digits = line.replace(/[^0-9]/g, '');

      return Number(digits[0]) * 10 + Number(digits[digits.length - 1]);
    })
    .reduce((sum, cur) => sum + cur, 0)
);

