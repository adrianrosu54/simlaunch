import type { ErrorBarData } from '../utils/inputTypes.ts';

export default function ErrorBar({ 
  error, maxError, threshold,
}: ErrorBarData) {
  const totalSegments = 20;
  
  // Calculate how many segments should be "active"
  const absoluteError = Math.abs(error);
  const activeSegments = Math.round((absoluteError / maxError) * totalSegments);
  
  // Calculate where the threshold line sits
  const thresholdIndex = Math.round((threshold / maxError) * totalSegments);

  return (
    <div className="flex flex-col items-center p-1 rounded-xl w-20 h-full min-h-48">
      <span className="text-[13px] text-slate-500 font-bold tracking-tight mb-2 text-center">
        Error (m)
      </span>

      {/* The Bar Container */}
      <div className="grow flex flex-col-reverse justify-between w-full px-1 gap-1 relative">
        
        {/* Render Segments */}
        {Array.from({ length: totalSegments }).map((_, i) => {
          const isActive = i < activeSegments;

          return (
            <div
              key={i}
              className={`h-1 w-full rounded-sm transition-all duration-120 transform-gpu ${
                isActive
                  ? 'bg-rose-600 shadow-[0_0_6px_rgba(239,68,68,0.6)]' 
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
      <div className="mt-4 flex flex-col items-center">
        <span className={`text-xl font-mono font-bold italic ${absoluteError > threshold ? 'text-rose-600' : 'text-slate-100'}`}>
          {error.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
