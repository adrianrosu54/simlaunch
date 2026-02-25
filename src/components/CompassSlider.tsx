import type { NumericalInput } from '@/utils/inputTypes';
import { useState, useRef, useEffect, useCallback } from 'react';

export default function CompassSlider({ value, onChange }: NumericalInput) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateHeading = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    let angle = -Math.atan2(clientY - cy, clientX - cx);
    // normalize
    if (angle < 0) angle += Math.PI*2;
    
    onChange(angle);
  }, [onChange]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => isDragging && updateHeading(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => isDragging && updateHeading(e.touches[0].clientX, e.touches[0].clientY);
    const handleUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, updateHeading]);

  return (
    <div 
      ref={containerRef}
      className="relative w-60 h-60 bg-slate-900 rounded-full flex items-center 
                justify-center select-none cursor-crosshair touch-none"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full transform rotate-0">
        {/* Outer Ring */}
        <circle cx="100" cy="100" r="85" fill="none" stroke="#1e293b" 
                strokeWidth="2" strokeDasharray="4 4" />

        {/* Cardinal Spikes */}
        {[0, 90, 180, 270].map(deg => (
          <line
            key={deg}
            x1="100" y1="20" x2="100" y2="10"
            stroke="#475569"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${deg + 90} 100 100)`} // +90 to align spikes to cardinal points
          />
        ))}

        {/* Target Heading Needle (Interactive) */}
        <g style={{ transform: `rotate(${-value}rad)`, transformOrigin: 'center' }} 
            className="transition-transform duration-60 transform-gpu will-change-transform">
          <line x1="100" y1="100" x2="185" y2="100" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
          <circle cx="185" cy="100" r="4" fill="#ea580c" />
        </g>
        <circle cx="100" cy="100" r="4" fill="#3b82f6" opacity="0.5" />

        {/* Center Cap */}
        <circle cx="100" cy="100" r="10" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
      </svg>

      {/* Center Readout */}
      <div className="absolute top-[40%] pointer-events-none flex flex-col items-center">
        <span className="text-4xl font-mono font-black italic">
          {Math.round(value*180/Math.PI)}°
        </span>
        <span className="text-[13px] text-slate-500 font-bold tracking-widest mb-1 tabular-nums">
          Heading angle
        </span>
      </div>
    </div>
  );
};
