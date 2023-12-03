import * as fs from "node:fs";

const rawInput: string = fs.readFileSync(__dirname + '/input.txt').toString('utf8');
const numberRegex = /[0-9]+/g;
const symbolRegex = /[^0-9.]/;

const lines = rawInput.split('\n');

const numbers: number[] = lines.reduce<number[]>((result, line, lineIndex) => {
  const loopNumberRegex = new RegExp(numberRegex);
  let numberMatch: RegExpMatchArray | null;
  while ((numberMatch = loopNumberRegex.exec(line)) !== null) {
    const numberStr = numberMatch[0];
    const checkStr = (lines[lineIndex - 1] ?? '').substring(Math.max(numberMatch.index! - 1, 0), numberMatch.index! + numberStr.length + 1)
      + (line[numberMatch.index! - 1] ?? '')
      + (line[numberMatch.index! + numberStr.length] ?? '')
      + (lines[lineIndex + 1] ?? '').substring(Math.max(numberMatch.index! - 1, 0), numberMatch.index! + numberStr.length + 1);

    console.log(numberMatch[0], checkStr);

    if (checkStr.match(symbolRegex)) {
      result.push(Number(numberStr));
    }
  }

  return result;
}, []);

const result = numbers.reduce((sum, cur) => sum + cur, 0);

console.log(result);
