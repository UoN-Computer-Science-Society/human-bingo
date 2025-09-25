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
  const baseColor = isEven ? 'bg-white' : 'bg-gray-50';
  const filledColor = 'bg-gray-100';
  const winningColor = 'bg-gray-200';
  
  return (
    <>
      <div className="rounded-lg p-[1px] bg-gray-200" data-cell={`cell-${row}-${col}`}>
        <button
          onClick={handleClick}
          className={cn(
            'relative p-1.5 sm:p-2 rounded-lg transition-all duration-200 cursor-pointer',
            'hover:scale-[1.01] hover:shadow-sm active:scale-95 active:translate-y-[1px]',
            'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50',
            'w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px]',
            'flex flex-col items-center justify-center gap-2 border border-gray-200',
            value ? (isWinning ? winningColor : filledColor) : baseColor,
            isWinning && 'ring-2 ring-gray-400'
          )}
        >
        {/* Prompt area */}
        <div className="w-full min-w-0">
          <div
            className={cn(
              'w-full text-[13px] sm:text-sm md:text-base text-center text-gray-900 font-medium leading-snug tracking-tight px-1 break-anywhere hyphens-auto text-balance min-w-0',
              isWinning && 'line-through decoration-2 decoration-gray-600'
            )}
            title={prompt}
          >
            {prompt}
          </div>
        </div>
        
        {/* Name display */}
        {value && (
          <div className="w-full flex items-center justify-center px-1 overflow-hidden min-w-0">
            {value.type === 'typed' ? (
              <div className="flex items-center justify-center gap-1 w-full min-w-0">
                <span 
                  className={cn(
                    'text-sm md:text-base font-bold text-gray-900 truncate whitespace-nowrap max-w-full flex-1 min-w-0',
                    isWinning && 'line-through decoration-2 decoration-gray-600'
                  )}
                  title={value.value}
                >
                  {value.value}
                </span>
                <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold leading-none">✓</span>
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
          <div className="text-gray-400 text-lg sm:text-xl">+</div>
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
