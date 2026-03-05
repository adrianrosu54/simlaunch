import { useStore } from "@nanostores/react"
import { $impactError, $simImpact } from "../stores/target"

export default function ImpactReading() {
  const impact = useStore($simImpact);
  const error = useStore($impactError);

  return (
    <div className="size-full flex flex-col justify-center">
      <div className="w-full flex flex-col text-center font-sans text-md md:text-lg font-semibold text-clk-text-secondary">
        <article className="flex flex-col p-2">
          <span>Impact point</span>
          <span className="font-mono text-sm md:text-lg italic text-clk-text-primary">
            ({impact.x.toFixed(2)} m, {impact.y.toFixed(2)} m)
          </span>
        </article>
        <article className="flex flex-col p-2">
          <span>Error reading</span>
          <span className="font-mono text-xl md:text-2xl italic text-clk-text-primary">
            {error.toFixed(2)} m
          </span>
        </article>
      </div>
    </div>
  )
}