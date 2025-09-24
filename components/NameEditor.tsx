'use client';

import { useState, useRef, useEffect } from 'react';
import { CellValue } from '@/lib/types';
import { cn } from '@/lib/utils';

interface NameEditorProps {
  prompt: string;
  currentValue: CellValue | null;
  onSave: (value: CellValue | null) => void;
  onCancel: () => void;
}

export default function NameEditor({ prompt, currentValue, onSave, onCancel }: NameEditorProps) {
  const [inputMode, setInputMode] = useState<'typed' | 'handwritten'>('typed');
  const [typedName, setTypedName] = useState(currentValue?.type === 'typed' ? currentValue.value : '');
  const [handwrittenData, setHandwrittenData] = useState<string | null>(
    currentValue?.type === 'handwritten' ? currentValue.value : null
  );
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDrawing = useRef(false);
  
  useEffect(() => {
    if (inputMode === 'typed' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputMode]);
  
  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (inputMode !== 'handwritten' || !canvasRef.current) return;
    
    isDrawing.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;
    
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'var(--charcoal)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };
  
  const stopDrawing = () => {
    if (isDrawing.current && canvasRef.current) {
      isDrawing.current = false;
      setHandwrittenData(canvasRef.current.toDataURL());
    }
  };
  
  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHandwrittenData(null);
  };
  
  const handleSave = () => {
    if (inputMode === 'typed' && typedName.trim()) {
      onSave({
        type: 'typed',
        value: typedName.trim(),
        timestamp: Date.now()
      });
    } else if (inputMode === 'handwritten' && handwrittenData) {
      onSave({
        type: 'handwritten',
        value: handwrittenData,
        timestamp: Date.now()
      });
    }
  };
  
  const handleClear = () => {
    onSave(null);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold text-charcoal mb-2">Add Name</h3>
        <p className="text-sm text-charcoal/70 mb-4">{prompt}</p>
        
        {/* Input Mode Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setInputMode('typed')}
            className={cn(
              'flex-1 py-2 px-4 rounded-lg font-medium transition-all',
              inputMode === 'typed' 
                ? 'bg-lavender text-white' 
                : 'bg-gray-100 text-charcoal hover:bg-gray-200'
            )}
          >
            Type Name
          </button>
          <button
            onClick={() => setInputMode('handwritten')}
            className={cn(
              'flex-1 py-2 px-4 rounded-lg font-medium transition-all',
              inputMode === 'handwritten' 
                ? 'bg-lavender text-white' 
                : 'bg-gray-100 text-charcoal hover:bg-gray-200'
            )}
          >
            Handwrite (Beta)
          </button>
        </div>
        
        {/* Input Area */}
        <div className="mb-6">
          {inputMode === 'typed' ? (
            <input
              ref={inputRef}
              type="text"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter name..."
              className="w-full px-4 py-3 border-2 border-lavender/30 rounded-lg focus:border-lavender focus:outline-none text-charcoal"
              maxLength={30}
            />
          ) : (
            <div className="space-y-2">
              <canvas
                ref={canvasRef}
                width={350}
                height={150}
                className="w-full border-2 border-lavender/30 rounded-lg bg-white cursor-crosshair touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              <button
                onClick={clearCanvas}
                className="text-sm text-violet hover:text-lavender underline"
              >
                Clear Drawing
              </button>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-error/20 text-error rounded-lg hover:bg-error/30 transition-colors font-medium"
          >
            Remove
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-100 text-charcoal rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={(inputMode === 'typed' && !typedName.trim()) || 
                     (inputMode === 'handwritten' && !handwrittenData)}
            className={cn(
              'flex-1 px-4 py-2 rounded-lg transition-colors font-medium',
              ((inputMode === 'typed' && typedName.trim()) || 
               (inputMode === 'handwritten' && handwrittenData))
                ? 'bg-mint text-charcoal hover:bg-mint/80'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            )}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
