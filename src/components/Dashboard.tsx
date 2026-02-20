import { useMemo, useState } from "react";

import type { LauncherConfig, ControlInput, SimulationSetup, RobotState } from "../physics/simulationTypes.ts";
import { sidePlotLogger, type SidePlotData } from "../utils/plotData.ts";
import BallisticModel from "../physics/BallisticModel.ts";
import { rockyPreset } from "../physics/presets.ts";

import SidePlots from "./SidePlots.tsx";
import FlywheelSlider from "./FlywheelSlider.tsx";
import Controls from "./Controls.tsx";
import type { NumericalInput } from "../utils/inputs.ts";

export default function Dashboard() {
  const [config, setConfig]         = useState<LauncherConfig>(rockyPreset.config);
  const [sim, setSim]               = useState<SimulationSetup>(rockyPreset.sim);
  const [robotState, setRobotState] = useState<RobotState>(rockyPreset.state);
  const [input, setInput]           = useState<ControlInput>({turretAngle: 0, flywheelVelocity: 1800});

  const data = useMemo(() => {
      const model = new BallisticModel({config, sim, state: robotState});
      const data: SidePlotData = [];

      model.simulate(input, sidePlotLogger(robotState, data));

      return data;
  }, [config, sim, robotState, input]);

  const flywheelInput: NumericalInput = {
    min: 1000,
    max: 4200,
    value: input.flywheelVelocity,
    onChange: (value) => setInput({...input, flywheelVelocity: value})
  };

  return (
    <main className="flex flex-col max-w-360 w-full bg-slate-900">
      <SidePlots simulationData={data}/>
      <Controls flywheelInput={flywheelInput}/>
    </main>
  );
}