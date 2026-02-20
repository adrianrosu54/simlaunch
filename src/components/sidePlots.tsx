import Plot from "react-plotly.js";

import { sideViewLayout, plotConfig } from "../utils/layouts.ts";
import type { SidePlotData } from "../utils/plotData.ts";

export default function SidePlots({simulationData}: {simulationData: SidePlotData}) {
  return (
    <section className="w-full">
      <Plot
        data={[
          {
            x: simulationData.map(p => p.distance),
            y: simulationData.map(p => p.height),
            type: "scatter",
            mode: "lines",
            name: "Predicted trajectory",
            line: {
              color: "#2563eb",
              width: 2,
              shape: "spline"
            },
          }
        ]}
        layout={ sideViewLayout } config={ plotConfig } 
        style={{height: "100%"}} className="max-h-200"
      />
    </section>
  );
}