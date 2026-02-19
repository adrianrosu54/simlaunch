import { useMemo, useState } from "react";

import type { LauncherConfig, ControlInput, SimulationSetup, RobotState } from "../physics/simulationTypes.ts";
import type { SimulationLogger } from "../physics/logger.ts";
import type { SidePlotData } from "./plotData.ts";
import BallisticModel from "@/physics/BallisticModel";
import SidePlots from "./sidePlots.tsx";
import { rockyPreset } from "../physics/presets.ts";

export default function Dashboard() {
  const [config, setConfig]         = useState<LauncherConfig>(rockyPreset.config);
  const [sim, setSim]               = useState<SimulationSetup>(rockyPreset.sim);
  const [robotState, setRobotState] = useState<RobotState>(rockyPreset.state);
  const [input, setInput]           = useState<ControlInput>({turretAngle: 0, flywheelVelocity: 1800});

  const data: SidePlotData = useMemo(() => {
      const model = new BallisticModel({config, sim, state: robotState});

      const data: {distance: number, height: number}[] = [];
      const log: SimulationLogger = (state) => {
        data.push({
          distance: Math.sqrt(state.x*state.x + state.y*state.y),
          height: state.z,
        });
      }

      model.simulate(input, log);

      return data;
  }, [config, sim, robotState, input]);

  return (
    <main className="max-w-360 bg-slate-900">
      <SidePlots simData={data}/>
    </main>
  );
}