import { lazy } from "react";
const Plot = lazy(() => import("react-plotly.js"));
import { useStore } from "@nanostores/react";

import { sideViewLayout, plotConfig, velocityLayout, accelerationLayout } from "../utils/layouts.ts";
import { $simLogs } from "../stores/physics.ts";
import Card from "./Card.tsx";
import { useMediaQuery } from "../hooks/useMediaQuery.ts";
import { $view } from "../stores/settings.ts";

export default function SidePlots() {
  const isMobile = useMediaQuery("(max-width: 784px)");
  const view = useStore($view);

  const simulationData = useStore($simLogs);

  if (isMobile && view !== "side")
    return null;


  return (
    <section className="relative col-span-2 row-span-2 hidden md:grid grid-cols-2 grid-rows-3 gap-2">
      <Card className="order-3 col-span-2 row-span-2">
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
        className="min-w-0 min-h-0 relative"/>
      </Card>
      <Card>
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
        className="max-h-100 relative"
      />
      </Card>
      <Card>
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
        className="max-h-100 relative"
      />
      </Card>
    </section>
  );
}