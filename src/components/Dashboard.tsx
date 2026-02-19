import { useMemo, useState } from "react";
import Plot from "react-plotly.js";

import type { ControlInput } from "../physics/simulationTypes.ts";
import { rockyPreset } from "../physics/presets.ts";
import { type SimulationLogger } from "../physics/logger.ts";
import BallisticModel from "@/physics/BallisticModel";
import { sideViewLayout, config } from "./layouts.ts";

export default function Dashboard() {
  const [model, setModel] = useState<BallisticModel>(new BallisticModel(rockyPreset));
  const [input, setInput] = useState<ControlInput>({turretAngle: 0, flywheelVelocity: 1800});

  const simData = useMemo(() => {
      const data: {distance: number, height: number}[] = [];
      const log: SimulationLogger = (state) => {
        data.push({
          distance: Math.sqrt(state.x*state.x + state.y*state.y),
          height: state.z,
        });
      }

      model.simulate(input, log);

      return data;
  }, [model, input]);

  return (
    <section className="max-w-360 bg-slate-900">
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
        layout={ sideViewLayout }
        config={ config }
        style={{height: "100%"}}
        className="max-h-200"
      />
    </section>
  );
}