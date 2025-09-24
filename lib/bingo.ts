import { BoardState, WinningLine, BOARD_SIZE } from './types';

export function checkForWin(boardState: BoardState): WinningLine[] {
  const winningLines: WinningLine[] = [];
  
  // Check rows
  for (let row = 0; row < BOARD_SIZE; row++) {
    if (isLineComplete(boardState.cells[row])) {
      winningLines.push({
        type: 'row',
        index: row,
        cells: Array.from({ length: BOARD_SIZE }, (_, col) => [row, col])
      });
    }
  }
  
  // Check columns
  for (let col = 0; col < BOARD_SIZE; col++) {
    const column = Array.from({ length: BOARD_SIZE }, (_, row) => boardState.cells[row][col]);
    if (isLineComplete(column)) {
      winningLines.push({
        type: 'column',
        index: col,
        cells: Array.from({ length: BOARD_SIZE }, (_, row) => [row, col])
      });
    }
  }
  
  // Check main diagonal (top-left to bottom-right)
  const mainDiagonal = Array.from({ length: BOARD_SIZE }, (_, i) => boardState.cells[i][i]);
  if (isLineComplete(mainDiagonal)) {
    winningLines.push({
      type: 'diagonal',
      index: 0,
      cells: Array.from({ length: BOARD_SIZE }, (_, i) => [i, i])
    });
  }
  
  // Check anti-diagonal (top-right to bottom-left)
  const antiDiagonal = Array.from({ length: BOARD_SIZE }, (_, i) => boardState.cells[i][BOARD_SIZE - 1 - i]);
  if (isLineComplete(antiDiagonal)) {
    winningLines.push({
      type: 'diagonal',
      index: 1,
      cells: Array.from({ length: BOARD_SIZE }, (_, i) => [i, BOARD_SIZE - 1 - i])
    });
  }
  
  return winningLines;
}

function isLineComplete(line: any[]): boolean {
  return line.every(cell => cell !== null && cell?.value);
}
