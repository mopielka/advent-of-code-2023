import * as fs from "node:fs";

const rawInput: string = fs.readFileSync(__dirname + '/input.txt').toString('utf8');

const lineResults = rawInput.split('\n').map(line => {
  const winningNumbers = line
    .replace(/^.*:/, '')
    .replace(/\|.*/, '')
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter(v => v.length)
    .map(Number);

  const myNumbers = line
    .replace(/.*\|/, '')
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter(v => v.length)
    .map(Number);

  return winningNumbers.filter(n => myNumbers.includes(n)).length;
});

const result1 = lineResults.map(v => Math.floor(2 ** (v - 1))).reduce((sum, cur) => sum + cur, 0);
console.log('result 1', result1);

const cardsResults = Array.from({ length: lineResults.length }, () => 1);

for (let a = 0; a < cardsResults.length; a++) {
  for (let c = a + 1; c < a + 1 + lineResults[a]; c++) {
    cardsResults[c] += cardsResults[a];
  }
}
console.log(cardsResults);

console.log('result 2', cardsResults.reduce((sum, cur) => sum + cur, 0));
