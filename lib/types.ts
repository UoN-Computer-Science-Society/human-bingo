export type CellValue = {
  type: 'typed' | 'handwritten' | null;
  value: string; // Name for typed, or base64 image for handwritten
  timestamp?: number;
};

export type BoardState = {
  cells: (CellValue | null)[][];
  lastUpdated: number;
};

export type WinningLine = {
  type: 'row' | 'column' | 'diagonal';
  index: number; // row/column index, or 0/1 for diagonals
  cells: [number, number][];
};

export const BOARD_SIZE = 5;

export const BINGO_PROMPTS: string[][] = [
  ["Speaks more than three languages", "CS Society Committee", "Was in foundation in UNM", "Owns a mechanical keyboard", "Already skipped a lecture"],
  ["Coffee Nerd", "Born in the same month as you", "Uses light mode", "Can whistle", "In more than 10 Discord servers"],
  ["Has a Labubu", "Participated in a Hackathon", "Night owl", "Left handed", "50+ GitHub contributions in last year"],
  ["Wearing slippers", "Prefers sweet over savoury", "Uses Linux on desktop", "Has >50 tabs open right now", "Knows what binary means"],
  ["Travelled abroad alone before", "Solved a LeetCode hard problem", "Rhythm game player (maimai, OSU, DDR etc.)", "Knows what a monad is", "Only child"]
];
