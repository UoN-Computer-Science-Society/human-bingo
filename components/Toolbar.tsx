'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ToolbarProps {
  onReset: () => void;
}

export default function Toolbar({ onReset }: ToolbarProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  
  const handleResetClick = () => {
    setShowConfirm(true);
  };
  
  const confirmReset = () => {
    onReset();
    setShowConfirm(false);
  };
  
  const cancelReset = () => {
    setShowConfirm(false);
  };
  
  return (
    <>
      <div className="mb-4 w-full">
        <div className="rounded-2xl p-[2px] bg-gradient-to-r from-lavender via-magenta to-violet shadow-md">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-between items-center p-3 bg-white/90 backdrop-blur rounded-2xl">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className={cn(
                'px-4 py-2 rounded-lg font-semibold transition-all',
                'bg-gradient-to-r from-lavender to-violet text-white hover:opacity-90',
                'flex items-center gap-2 shadow-sm'
              )}
            >
              <span className="text-lg">ℹ️</span>
              Instructions
            </button>
            
            <button
              onClick={handleResetClick}
              className={cn(
                'px-4 py-2 rounded-lg font-semibold transition-all',
                'bg-error text-white hover:bg-error/90',
                'flex items-center gap-2 shadow-sm'
              )}
            >
              <span className="text-lg">🔄</span>
              Reset Board
            </button>
          </div>
        </div>
      </div>
      
      {/* Instructions Panel */}
      {showInstructions && (
        <div className="mb-4 p-[2px] rounded-xl bg-gradient-to-r from-lavender via-magenta to-violet animate-fade-in">
          <div className="p-4 bg-white/90 backdrop-blur rounded-xl">
          <h3 className="font-bold text-lg text-charcoal mb-2">How to Play Human Bingo! 🎮</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-charcoal/80">
            <li>Find people who match each square's description</li>
            <li>Click/tap a square to add their name</li>
            <li>You can type the name or try handwriting it!</li>
            <li>Complete a full row, column, or diagonal to win</li>
            <li>When you get BINGO, a line will appear and you'll see congratulations! 🎉</li>
            <li>Try to get multiple BINGOs for extra fun!</li>
          </ol>
          <p className="mt-3 text-xs text-charcoal/60">
            Tip: Names are saved automatically, so you can close and come back later!
          </p>
          </div>
        </div>
      )}
      
      {/* Reset Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white/95 rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-lavender/30">
            <h3 className="text-lg font-bold text-charcoal mb-2">Reset Board?</h3>
            <p className="text-sm text-charcoal/70 mb-6">
              This will clear all names from the board. Your progress will be lost!
            </p>
            <div className="flex gap-2">
              <button
                onClick={cancelReset}
                className="flex-1 px-4 py-2 bg-gray-100 text-charcoal rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-error to-magenta text-white rounded-lg hover:opacity-90 transition-colors font-medium"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
