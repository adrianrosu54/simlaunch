import { lazy } from "react";
const Plot = lazy(() => import("react-plotly.js"));

import { FieldLayout, plotConfig } from "../../utils/layouts";
import type { PlotLogs } from "../../physics/plotLogging";

export default function FieldView({simulationData}: {simulationData: PlotLogs}) {
  return (
    <section className="relative grow">
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
      />
    </section>
  );
}