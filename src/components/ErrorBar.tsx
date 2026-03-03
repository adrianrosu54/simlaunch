import { useStore } from "@nanostores/react";
import { $impactError } from "../stores/target";

export default function ErrorBar() {
  const maxError = 2.0;
  const error = useStore($impactError);

  const totalSegments = 10;
  
  // Calculate how many segments should be "active"
  const absoluteError = Math.abs(error);
  const activeSegments = Math.round((absoluteError / maxError) * totalSegments);

  return (
    <div className="flex flex-col items-center px-1 py-4 rounded-xl w-15 md:w-20 h-full min-h-36">
      <div className="grow flex flex-col-reverse justify-between w-full h-full px-0.5 relative">
        {Array.from({ length: totalSegments }).map((_, i) => {
          const isActive = i < activeSegments;

          return (
            <div
              key={i}
              className={`h-1 md:h-2 w-full\
                ${isActive
                  ? 'bg-rose-600' 
                  : 'bg-slate-800'
                }`}
            />
          );
        })}
      </div>
    </div>
  );
};
