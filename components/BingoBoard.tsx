'use client';

import { useState, useEffect } from 'react';
import { BoardState, WinningLine, BOARD_SIZE, BINGO_PROMPTS } from '@/lib/types';
import { checkForWin } from '@/lib/bingo';
import { saveToLocalStorage, loadFromLocalStorage, createEmptyBoardState } from '@/lib/storage';
import BingoCell from './BingoCell';
import StrikeLayer from './StrikeLayer';
import Toolbar from './Toolbar';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function BingoBoard() {
  const [boardState, setBoardState] = useState<BoardState>(createEmptyBoardState());
  const [winningLines, setWinningLines] = useState<WinningLine[]>([]);
  const [showCongrats, setShowCongrats] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved) {
      setBoardState(saved);
      const wins = checkForWin(saved);
      setWinningLines(wins);
    }
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    saveToLocalStorage(boardState);
    
    // Check for wins
    const wins = checkForWin(boardState);
    setWinningLines(wins);
    
    // Show congratulations if new win detected
    if (wins.length > 0 && !showCongrats) {
      setShowCongrats(true);
      toast.success('🎉 Congratulations! You got BINGO! 🎉', {
        duration: 5000,
        style: {
          background: 'var(--mint)',
          color: 'var(--charcoal)',
          border: '3px solid var(--magenta)',
          fontSize: '1.1rem',
          fontWeight: 'bold',
        },
      });
    } else if (wins.length === 0) {
      setShowCongrats(false);
    }
  }, [boardState, showCongrats]);

  const handleCellUpdate = (row: number, col: number, value: any) => {
    const newState = { ...boardState };
    newState.cells[row][col] = value;
    newState.lastUpdated = Date.now();
    setBoardState(newState);
  };

  const handleReset = () => {
    setBoardState(createEmptyBoardState());
    setWinningLines([]);
    setShowCongrats(false);
    toast.success('Board reset! Let\'s play again! 🎮');
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Toolbar onReset={handleReset} />
      
      {/* Monitor-style frame (shadcn-clear) */}
      <div className="relative mx-auto">
        {/* Bezel / monitor body - light card with subtle border */}
        <div className="relative rounded-xl border border-violet/30 bg-white shadow-md p-2 sm:p-3 md:p-4">
          {/* Camera dot */}
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-black/10 rounded-full border border-black/10"
            aria-hidden
          />
          {/* Screen area */}
          <div className="relative rounded-lg border border-lavender/30 bg-white p-0 overflow-hidden">
            <div className="relative bingo-scroll overflow-y-auto scroll-area max-h-[65vh] sm:max-h-[70vh] p-2 sm:p-4 pr-3">
              {/* Bingo Grid */}
              <div className="relative grid grid-cols-5 gap-[2px] sm:gap-2">
                {BINGO_PROMPTS.map((row, rowIndex) => 
                  row.map((prompt, colIndex) => (
                    <BingoCell
                      key={`${rowIndex}-${colIndex}`}
                      row={rowIndex}
                      col={colIndex}
                      prompt={prompt}
                      value={boardState.cells[rowIndex][colIndex]}
                      onUpdate={handleCellUpdate}
                      isWinning={winningLines.some(line => 
                        line.cells.some(([r, c]) => r === rowIndex && c === colIndex)
                      )}
                    />
                  ))
                )}
              </div>

              {/* Strike lines overlay */}
              {winningLines.length > 0 && (
                <StrikeLayer winningLines={winningLines} />
              )}
            </div>
          </div>
        </div>
        {/* Stand - light style */}
        <div className="mx-auto mt-2 h-3 w-12 sm:w-16 bg-white border border-violet/30 rounded-md shadow-sm" />
        <div className="mx-auto mt-1 h-2.5 w-24 sm:w-32 bg-white border border-violet/30 rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.15)]" />
      </div>
      
      {/* Helper instructions (hidden on small to save space) */}
      <div className="hidden sm:block mt-4 p-[2px] rounded-xl bg-gradient-to-r from-lavender via-magenta to-violet">
        <div className="p-4 bg-white/90 backdrop-blur rounded-xl text-center text-sm text-charcoal">
          <p className="font-semibold">How to play</p>
          <p className="mt-1">Tap a square to add a person's name who matches that description.</p>
          <p className="mt-1">Complete a row, column, or diagonal to win! 🎉</p>
        </div>
      </div>
    </div>
  );
}
