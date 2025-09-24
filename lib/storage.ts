import { BoardState, BOARD_SIZE } from './types';

const STORAGE_KEY = 'human-bingo-state';

export function saveToLocalStorage(boardState: BoardState): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boardState));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function loadFromLocalStorage(): BoardState | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
  
  return null;
}

export function clearLocalStorage(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}

export function createEmptyBoardState(): BoardState {
  return {
    cells: Array.from({ length: BOARD_SIZE }, () => 
      Array.from({ length: BOARD_SIZE }, () => null)
    ),
    lastUpdated: Date.now()
  };
}
