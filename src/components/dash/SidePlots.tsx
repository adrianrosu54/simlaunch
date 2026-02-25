import { lazy } from "react";
const Plot = lazy(() => import("react-plotly.js"));

import { sideViewLayout, plotConfig, velocityLayout, accelerationLayout } from "../../utils/layouts.ts";
import type { SidePlotData } from "../../utils/plotLogging.ts";

export default function SidePlots({simulationData}: {simulationData: SidePlotData}) {
  return (
    <section className="relative grow grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-4 p-2">
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
        className="md:col-span-3 row-span-2 md:row-span-3 min-w-0 min-h-0 relative bg-clk-primary
                  border-2 border-clk-secondary rounded-xl"
      />
      <div className="md:col-span-1 row-span-1 md:row-span-3 flex flex-row md:flex-col gap-4 min-h-0">
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
          className="flex-1 max-h-100 relative bg-clk-primary
                    border-2 border-clk-secondary rounded-xl"
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
          className="flex-1 max-h-100 relative bg-clk-primary
                    border-2 border-clk-secondary rounded-xl"
        />
      </div>
    </section>
  );
}