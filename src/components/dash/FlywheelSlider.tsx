import type { SliderInput } from '../../utils/inputTypes.ts';
import { useState, useRef, useEffect, useCallback } from 'react';

export default function FlywheelSlider({ 
  min, max, value, onChange
}: SliderInput) {
  const svgRef = useRef<SVGSVGElement>(null);
  // const [uiValue, setUiValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);

  // const cx = 100;
  // const cy = 100;
  const r = 80;
  const circumference = Math.PI * r;

  const updateValue = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height); // center at bottom (semicircle)

    const angle = Math.atan2(y, x); 
    
    // normalize to a percentage
    let pct = (angle + Math.PI) / Math.PI;
    // clamp
    if (pct < 0) pct = (pct > -0.5) ? 1 : 0;
    if (pct > 1) pct = (pct < 1.5) ? 1 : 0;

    const newValue = Math.round(pct * (max - min) + min);
    onChange(newValue);
  }, [max, min, onChange]);

  // Global listeners for dragging outside the SVG
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => isDragging && updateValue(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => isDragging && updateValue(e.touches[0].clientX, e.touches[0].clientY);
    const handleUp = () => {
      setIsDragging(false);
      // onChange(uiValue);
    }

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
  }, [isDragging, updateValue]);

  const pct = (value - min) / (max - min);
  const dashOffset = circumference * (1 - pct);

  // dynamic colors
  const hue = 200 - (pct * 200);
  const dynamicColor = `hsl(${hue}, 80%, 50%)`;

  return (
    <div className="flex flex-col items-center justify-start h-50">
      <div className="relative w-full" style={{ height: '150px' }}>
        <svg
          ref={svgRef}
          viewBox="0 0 200 110"
          className="w-full cursor-pointer touch-none"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* background arc */}
          <path
            d={`M 20,100 A 80,80 0 0 1 180,100`}
            fill="none"
            stroke="#1e293b"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* progress arc */}
          <path
            d={`M 20,100 A 80,80 0 0 1 180,100`}
            fill="none"
            stroke={dynamicColor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-60 ease-out transform-gpu 
                      will-change-transform"
          />
        </svg>

        {/* Value Overlay */}
        <div className="absolute bottom-3 inset-x-0 flex flex-col items-center pointer-events-none">
          <span className="text-4xl font-mono font-black text-clk-text-primary italic tracking-tighter" 
                style={{ textShadow: `0 0 15px ${dynamicColor}66` }}>
            {value}
          </span>
          <span className="text-[13px] text-clk-text-secondary font-bold 
                          tracking-widest mb-1 tabular-nums">
            Flywheel RPM
          </span>
        </div>
      </div>
    </div>
  );
};