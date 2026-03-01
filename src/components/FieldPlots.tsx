import { lazy } from "react";
import { useStore } from "@nanostores/react";
const Plot = lazy(() => import("react-plotly.js"));

import { $simLogs } from "../stores/physics";
import { FieldLayout, plotConfig } from "../utils/layouts";

export default function FieldPlots() {
  const simulationData = useStore($simLogs);
  
  return (
    <section className="relative grow h-full w-full">
      <Plot
        data={[
          {
            x: simulationData.map((value) => value.x),
            y: simulationData.map((value) => value.y),
            type: "scatter",
            mode: "lines",
            line: {
              shape: "linear",
              width: 3,
            },
          }
        ]}
        layout={FieldLayout} config={plotConfig}
        style={{height: "100%"}}
        className="relative"
      />
    </section>
  );
}