import { useStore } from '@nanostores/react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { $preset, updatePreset } from '../stores/physics.ts';
import { $unitView, fromDisplay, toDisplay } from '../stores/units.ts';

export default function FlywheelSlider() {
    const value = useStore($preset).control.flywheelVelocity;
    const unit = useStore($unitView)["rotation"];
    const min = toDisplay(104.719755, unit);
    const max = toDisplay(439.822971, unit);

    const onChange = (value: number) => updatePreset({ type: "control", payload: { flywheelVelocity: value } });

    const svgRef = useRef<SVGSVGElement>(null);
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

        onChange(fromDisplay(newValue, unit));
    }, [max, min, onChange]);

    // Global listeners for dragging outside the SVG
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => isDragging && updateValue(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => isDragging && updateValue(e.touches[0].clientX, e.touches[0].clientY);
        const handleUp = () => {
            setIsDragging(false);
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
    }, [isDragging, updateValue, onChange]);

    const pct = (toDisplay(value, unit) - min) / (max - min);
    const dashOffset = circumference * (1 - pct);

    // dynamic colors
    const hue = 180 - (pct * 180);
    const dynamicColor = `hsl(${hue}, 70%, 45%)`;

    return (
        <div className="flex flex-col items-center justify-start h-full min-h-33 w-full">
            <div className="relative w-full">
                <svg
                    ref={svgRef}
                    viewBox="0 0 180 110"
                    className="w-full cursor-pointer touch-none"
                    onMouseDown={() => setIsDragging(true)}
                    onTouchStart={() => setIsDragging(true)}
                >
                    {/* background arc */}
                    <path
                        d={`M 10,100 A 80,80 0 0 1 170,100`}
                        fill="none"
                        className="stroke-clk-secondary"
                        strokeWidth="12"
                        strokeLinecap="round"
                    />
                    {/* progress arc */}
                    <path
                        d={`M 10,100 A 80,80 0 0 1 170,100`}
                        fill="none"
                        stroke={dynamicColor}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                    />
                </svg>

                {/* Value Overlay */}
                <div className="absolute top-[50%] inset-x-0 flex flex-col items-center pointer-events-none font-semibold">
                    <span className="text-4xl font-mono font-black text-clk-text-primary italic tracking-tighter">
                        {toDisplay(value, unit).toFixed(0)}
                    </span>
                    <span className="text-sm md:text-md text-clk-text-secondary 
                          tracking-widest mb-1 tabular-nums">
                        Flywheel {unit.toUpperCase()}
                    </span>
                </div>
            </div>
        </div>
    );
};
