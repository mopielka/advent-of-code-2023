import * as fs from "node:fs";
import {Combination, Game} from "./types";
import {parseRow} from "./parser";

const rawInput: string = fs.readFileSync(__dirname + '/input.txt').toString('utf8');

const games: Game[] = rawInput.split('\n').map(parseRow);

const result = games
  .filter(
    (game) => game.combinations.every(
      (combination) => !(combination.red > 12 || combination.green > 13 || combination.blue > 14))
  )
  .map((game) => game.id)
  .reduce((sum, cur) => sum + cur, 0);

console.log('Sum of IDs of games with too many balls of one color', result);

const result2 = games
  .map(
    ({ combinations }): Combination =>
      combinations.reduce(
        (result, cur) =>
          Object.fromEntries(
            ['green', 'red', 'blue']
              .map(color => [color, Math.max(cur[color] ?? 0, result[color] ?? 0)])
          ),
        {}
      )
  )
  .map(({ green, red, blue}) => (green ?? 0) * (red ?? 0) * (blue ?? 0))
  .reduce((sum, cur) => sum + cur, 0);

console.log('Sum of powers', result2);
