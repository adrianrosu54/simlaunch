import { useStore } from "@nanostores/react"
import { $impactError, $simImpact } from "../stores/target"
import { $unitView, toDisplay } from "../stores/units";

export default function ImpactReading() {
    const impact = useStore($simImpact);
    const error = useStore($impactError);
    const unit = useStore($unitView).distance;

    return (
        <div className="size-full flex flex-col justify-center">
            <div className="w-full flex flex-col text-center font-sans text-md md:text-lg font-semibold text-clk-text-secondary">
                <article className="flex flex-col p-2">
                    <span>Impact point</span>
                    <span className="font-mono text-sm md:text-lg italic text-clk-text-primary">
                        ({toDisplay(impact.x, unit).toFixed(2)}, {toDisplay(impact.y, unit).toFixed(2)}) {unit}
                    </span>
                </article>
                <article className="flex flex-col p-2">
                    <span>Error reading</span>
                    <span className="font-mono text-md md:text-xl italic text-clk-text-primary">
                        {toDisplay(error, unit).toFixed(2)} {unit}
                    </span>
                </article>
            </div>
        </div>
    )
}
