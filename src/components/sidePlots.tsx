import Plot from "react-plotly.js";

import { sideViewLayout, plotConfig, velocityLayout, accelerationLayout } from "../utils/layouts.ts";
import type { SidePlotData } from "../utils/plotData.ts";

export default function SidePlots({simulationData}: {simulationData: SidePlotData}) {
  return (
    <section className="relative grow grid grid-cols-4 gap-4 p-2">
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
              shape: "spline",
            },
          }
        ]}
        layout={ sideViewLayout } config={ plotConfig } useResizeHandler={true}
        style={{height: "100%"}} 
        className="col-span-3 min-w-0 min-h-0 relative border-2 border-slate-800"
      />
      <div className="col-span-1 flex flex-col gap-4 min-h-0">
        <Plot
          data={[
            {
              x: simulationData.map(p => p.time),
              y: simulationData.map(p => p.velocity),
              type: "scatter",
              mode: "lines",
              name: "Velocity magnitude",
              line: {
                color: "#22c55e",
                width: 2,
                shape: "spline",
              }
            }
          ]}
          layout={ velocityLayout } config={ plotConfig } useResizeHandler={true}
          style={{height: "100%"}}
          className="flex-1 max-h-100 relative border-2 border-slate-800"
        />
        <Plot
          data={[
            {
              x: simulationData.map(p => p.time),
              y: simulationData.map(p => p.acceleration),
              type: "scatter",
              mode: "lines",
              name: "Acceleration magnitude",
              line: {
                color: "#22c55e",
                width: 2,
                shape: "spline",
              }
            }
          ]}
          layout={ accelerationLayout } config={ plotConfig } useResizeHandler={true}
          style={{height: "100%"}}
          className="flex-1 max-h-100 relative border-2 border-slate-800"
        />
      </div>
    </section>
  );
}