import Plot from "react-plotly.js";

import { sideViewLayout, plotConfig } from "./layouts.ts";
import type { SidePlotData } from "./plotData.ts";

export default function SidePlots({simData}: {simData: SidePlotData}) {
  return (
    <div>
      <Plot
        data={[
          {
            x: simData.map(p => p.distance),
            y: simData.map(p => p.height),
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
    </div>
  );
}