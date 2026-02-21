import Plot from "react-plotly.js";

import { sideViewLayout, plotConfig, velocityLayout, accelerationLayout } from "../utils/layouts.ts";
import type { SidePlotData } from "../utils/plotLogging.ts";

export default function SidePlots({simulationData}: {simulationData: SidePlotData}) {
  return (
    <section className="relative grow grid grid-cols-1 md:grid-cols-4 gap-4 p-2">
      <Plot
        data={[
          {
            x: simulationData.map(p => p.distance),
            y: simulationData.map(p => p.height),
            type: "scatter",
            mode: "lines",
            name: "side view",
            line: {
              color: "#0891b2",
              width: 2,
              shape: "spline",
            },
          }
        ]}
        layout={ sideViewLayout } config={ plotConfig } useResizeHandler={true}
        style={{height: "100%"}} 
        className="md:col-span-3 min-w-0 min-h-0 relative border-2 border-slate-800"
      />
      <div className="md:col-span-1 flex flex-row md:flex-col gap-4 min-h-0">
        <Plot
          data={[
            {
              x: simulationData.map(p => p.time),
              y: simulationData.map(p => p.velocity),
              type: "scatter",
              mode: "lines",
              name: "velocity",
              line: {
                color: "#ca8a04",
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
              name: "acceleration",
              line: {
                color: "#7c3aed",
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