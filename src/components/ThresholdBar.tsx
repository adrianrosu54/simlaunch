import { useStore } from "@nanostores/react";
import { $impactError } from "../stores/target";
import { $confidence } from "../stores/confidence";

export default function ErrorBar({ type }: {
    type: "impactError" | "confidence"
}) {
    let maxValue;
    let valueStore;
    let color;

    switch (type) {
        case "impactError":
            valueStore = useStore($impactError);
            maxValue = 2.0;
            color = "bg-red"
            break;
        case "confidence":
            valueStore = useStore($confidence);
            maxValue = 1;
            color = "bg-green-600"
            break;
    }

    const totalSegments = 10;

    // Calculate active segments
    const absoluteError = Math.abs(valueStore);
    const activeSegments = Math.round((absoluteError / maxValue) * totalSegments);

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
                                    ? color
                                    : 'bg-clk-secondary'
                                }`}
                        />
                    );
                })}
            </div>
        </div>
    );
};
