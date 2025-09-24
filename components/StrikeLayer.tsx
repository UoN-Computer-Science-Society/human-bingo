'use client';

import { WinningLine, BOARD_SIZE } from '@/lib/types';
import { useEffect, useMemo, useRef, useState } from 'react';

interface StrikeLayerProps {
  winningLines: WinningLine[];
}

export default function StrikeLayer({ winningLines }: StrikeLayerProps) {
  type PixelLine = { x1: number; y1: number; x2: number; y2: number };
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [pixelLines, setPixelLines] = useState<PixelLine[]>([]);

  const endpoints = useMemo(() => {
    return winningLines.map((line) => {
      if (line.type === 'row') return { a: [line.index, 0], b: [line.index, BOARD_SIZE - 1] } as const;
      if (line.type === 'column') return { a: [0, line.index], b: [BOARD_SIZE - 1, line.index] } as const;
      if (line.type === 'diagonal' && line.index === 0) return { a: [0, 0], b: [BOARD_SIZE - 1, BOARD_SIZE - 1] } as const;
      return { a: [0, BOARD_SIZE - 1], b: [BOARD_SIZE - 1, 0] } as const;
    });
  }, [winningLines]);

  useEffect(() => {
    const compute = () => {
      const svgRect = svgRef.current?.getBoundingClientRect();
      if (!svgRect) return;
      const lines: PixelLine[] = [];
      endpoints.forEach(({ a, b }) => {
        const elA = document.querySelector(`[data-cell="cell-${a[0]}-${a[1]}"]`) as HTMLElement | null;
        const elB = document.querySelector(`[data-cell="cell-${b[0]}-${b[1]}"]`) as HTMLElement | null;
        if (!elA || !elB) return;
        const ra = elA.getBoundingClientRect();
        const rb = elB.getBoundingClientRect();
        const cx1 = ra.left + ra.width / 2 - svgRect.left;
        const cy1 = ra.top + ra.height / 2 - svgRect.top;
        const cx2 = rb.left + rb.width / 2 - svgRect.left;
        const cy2 = rb.top + rb.height / 2 - svgRect.top;
        lines.push({ x1: cx1, y1: cy1, x2: cx2, y2: cy2 });
      });
      setPixelLines(lines);
    };

    compute();
    window.addEventListener('resize', compute);
    // Recompute while scrolling the grid container
    const scrollEl = svgRef.current?.parentElement as HTMLElement | null;
    scrollEl?.addEventListener('scroll', compute, { passive: true });
    const id = setInterval(compute, 300); // recompute during transitions/initial render
    return () => {
      window.removeEventListener('resize', compute);
      scrollEl?.removeEventListener('scroll', compute as EventListener);
      clearInterval(id);
    };
  }, [endpoints]);
  
  return (
    <svg 
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Subtle shadow to lift the line off white backgrounds */}
        <filter id="strikeShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodColor="#000000" floodOpacity="0.18" />
        </filter>
      </defs>
      {pixelLines.map((coords, index) => {
        return (
          <g key={index}>
            {/* Underlay for contrast (light neutral) */}
            <line
              x1={coords.x1}
              y1={coords.y1}
              x2={coords.x2}
              y2={coords.y2}
              stroke="#e5e7eb"
              strokeOpacity="1"
              strokeWidth="10"
              strokeLinecap="round"
              className="animate-strike"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
              }}
            />

            {/* Main strike line (neutral, rounded) */}
            <line
              x1={coords.x1}
              y1={coords.y1}
              x2={coords.x2}
              y2={coords.y2}
              stroke="#0f172a"
              strokeWidth="6"
              strokeLinecap="round"
              className="animate-strike"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
                filter: 'url(#strikeShadow)'
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}
