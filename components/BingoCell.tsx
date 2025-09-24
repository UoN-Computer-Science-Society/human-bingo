'use client';

import { useState } from 'react';
import { CellValue } from '@/lib/types';
import { cn } from '@/lib/utils';
import NameEditor from './NameEditor';

interface BingoCellProps {
  row: number;
  col: number;
  prompt: string;
  value: CellValue | null;
  onUpdate: (row: number, col: number, value: CellValue | null) => void;
  isWinning: boolean;
}

export default function BingoCell({ row, col, prompt, value, onUpdate, isWinning }: BingoCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleClick = () => {
    setIsEditing(true);
  };
  
  const handleSave = (newValue: CellValue | null) => {
    onUpdate(row, col, newValue);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
  };
  
  // Determine cell color based on position for checkerboard pattern
  const isEven = (row + col) % 2 === 0;
  const baseColor = isEven ? 'bg-lavender/20' : 'bg-violet/20';
  const filledColor = 'bg-mint/30';
  const winningColor = 'bg-magenta/40';
  
  return (
    <>
      <div className="rounded-2xl sm:rounded-xl p-[1px] bg-gradient-to-br from-lavender via-magenta to-violet" data-cell={`cell-${row}-${col}`}>
        <button
          onClick={handleClick}
          className={cn(
            'relative p-1.5 sm:p-2 rounded-2xl sm:rounded-xl transition-all duration-200 cursor-pointer',
            'hover:scale-[1.01] hover:shadow-md active:scale-95 active:translate-y-[1px]',
            'focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-opacity-50',
            'min-h-[80px] sm:min-h-[96px] md:min-h-[110px]',
            'flex flex-col items-center justify-between gap-1 w-full min-w-0 shadow-sm border border-lavender/30',
            value ? (isWinning ? winningColor : filledColor) : baseColor,
            isWinning && 'ring-2 ring-magenta animate-pulse'
          )}
        >
        {/* Prompt area (natural height) */}
        <div className="w-full flex-1 min-w-0">
          <div
            className={cn(
              'w-full text-[13px] sm:text-sm md:text-base text-center text-charcoal font-medium leading-snug tracking-tight px-1 break-anywhere hyphens-auto text-balance min-w-0',
            )}
            title={prompt}
          >
            {prompt}
          </div>
        </div>
        
        {/* Name display */}
        {value && (
          <div className="w-full h-6 sm:h-7 flex items-center justify-center px-1 overflow-hidden min-w-0">
            {value.type === 'typed' ? (
              <div className="flex items-center justify-center gap-1 w-full min-w-0">
                <span 
                  className={cn(
                    'text-sm md:text-base font-bold text-charcoal truncate whitespace-nowrap max-w-full flex-1 min-w-0',
                  )}
                  title={value.value}
                >
                  {value.value}
                </span>
                <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-mint/80 text-charcoal text-[10px] font-bold leading-none">✓</span>
              </div>
            ) : value.type === 'handwritten' ? (
              <div className="flex items-center justify-center w-full min-w-0">
                <img 
                  src={value.value} 
                  alt="Handwritten name"
                  className="max-w-full max-h-6 sm:max-h-7 object-contain rounded"
                />
              </div>
            ) : null}
          </div>
        )}
        
        {/* Add indicator for empty cells */}
        {!value && (
          <div className="text-magenta/60 text-lg sm:text-xl">+</div>
        )}
        </button>
      </div>
      
      {/* Name Editor Modal */}
      {isEditing && (
        <NameEditor
          prompt={prompt}
          currentValue={value}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}
