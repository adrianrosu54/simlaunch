import { useStore } from "@nanostores/react";
import { $confidence, $errorScore, $stabilityScore } from "../stores/confidence"

export default function ConfidenceReading() {
    const confidence = useStore($confidence);
    const errorScore = useStore($errorScore);
    const stabilityScore = useStore($stabilityScore);

    return (
        <div className="flex flex-col size-full justify-center text-center font-sans text-sm md:text-md lg:text-lg font-semibold text-clk-text-secondary">
            <article className="text-md lg:text-lg p-3 lg:py-6">
                <span>Confidence &nbsp;</span>
                <span className="font-mono text-lg lg:text-xl text-clk-text-primary">
                    {(confidence * 100).toFixed(1)}%
                </span>
            </article>
            <article className="py-1 px-3">
                <span>Error score &nbsp;</span>
                <span className="font-mono text-clk-text-primary">
                    {(errorScore * 100).toFixed(1)}%
                </span>
            </article>
            <article className="py-1 px-3">
                <span>Stability score &nbsp;</span>
                <span className="font-mono text-clk-text-primary">
                    {(stabilityScore * 100).toFixed(1)}%
                </span>
            </article>
        </div>
    )
}
