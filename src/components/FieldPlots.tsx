import { lazy } from "react";
import { useStore } from "@nanostores/react";
const Plot = lazy(() => import("react-plotly.js"));

import { $simLogs } from "../stores/physics";
import { FieldLayout, plotConfig } from "../utils/layouts";
import { $view } from "../stores/settings";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Card from "./Card";
import { blueColor } from "../utils/theme";

export default function FieldPlots() {
  const isMobile = useMediaQuery("(max-width: 784px)");
  const view = useStore($view);

  const simulationData = useStore($simLogs);

  if (isMobile && view !== "field")
    return null;
  
  return (
    <Card className="relative grow col-span-2 row-span-2">
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
              color: blueColor,
            },
          }
        ]}
        layout={FieldLayout} config={plotConfig}
        style={{height: "100%"}}
        className="relative size-full"
      />
    </Card>
  );
}