export interface Combination {
  [key: string]: number;
}

export interface Game {
  id: number;
  combinations: Combination[];
}
