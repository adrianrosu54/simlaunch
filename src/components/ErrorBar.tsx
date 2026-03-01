import { useStore } from "@nanostores/react";
import { $impactError } from "../stores/target";

export default function ErrorBar() {
  const threshold = 0.2;
  const maxError = 2.0;
  const error = useStore($impactError);

  const totalSegments = 10;
  
  // Calculate how many segments should be "active"
  const absoluteError = Math.abs(error);
  const activeSegments = Math.round((absoluteError / maxError) * totalSegments);
  
  // Calculate where the threshold line sits
  const thresholdIndex = Math.round((threshold / maxError) * totalSegments);

  return (
    <div className="flex flex-col items-center p-1 rounded-xl w-20 h-full min-h-36">
      <span className="text-[13px] text-slate-500 font-bold tracking-tight mb-2 text-center">
        Error (m)
      </span>

      {/* The Bar Container */}
      <div className="grow flex flex-col-reverse justify-between w-full h-full px-0.5 md:px-1 relative">
        
        {/* Render Segments */}
        {Array.from({ length: totalSegments }).map((_, i) => {
          const isActive = i < activeSegments;

          return (
            <div
              key={i}
              className={`h-0.5 md:h-1 w-full\
                ${isActive
                  ? 'bg-rose-600' 
                  : 'bg-slate-800'
                }`}
            />
          );
        })}

        {/* Threshold Label */}
        <div 
          className="absolute -right-2.5 w-4 opacity-50 border"
          style={{ bottom: `${(thresholdIndex / totalSegments) * 100}%` }}
        />
      </div>

      {/* Digital Readout */}
      <div className="pt-4 flex flex-col items-center">
        <span className={`text-xl font-mono font-bold italic ${absoluteError > threshold ? 'text-rose-600' : 'text-clk-text-primary'}`}>
          {error.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
