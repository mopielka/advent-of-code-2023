import {Combination, Game} from "./types";

const parseCombination = (rawCombination: string): Combination => {
  const result: Combination = {};
  const tokens = rawCombination.split(' ');
  for (let i = 0; i < tokens.length; i += 2) {
    if (Number.isNaN(tokens[i]) || tokens[i + 1] === undefined) {
      throw new Error(`Invalid line: "${rawCombination}"`);
    }

    result[tokens[i + 1]] = Number(tokens[i]);
  }

  return result;
}

const parseRow = (row: string): Game => {
  const gameId = Number(row.replace(/^\D+(\d+).*$/, '$1'));
  const combinations: Combination[] =
    row.replace(/^.*: (.*)$/, '$1')
      .replace(/,/g, '')
      .split(';')
      .map(v => v.trim())
      .map(parseCombination);

  return {
    id: gameId,
    combinations,
  };
}

export { parseCombination, parseRow };
