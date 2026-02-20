import { useMemo, useState } from "react";

import type { LauncherConfig, ControlInput, SimulationSetup, RobotState } from "../physics/simulationTypes.ts";
import type { NumericalInput, SliderInput } from "../utils/inputTypes.ts";
import { sidePlotLogger, type SidePlotData } from "../utils/plotData.ts";
import BallisticModel from "../physics/BallisticModel.ts";
import { rockyPreset } from "../physics/presets.ts";

import SidePlots from "./SidePlots.tsx";
import Controls from "./Controls.tsx";

export default function Dashboard() {
  const [config, setConfig]         = useState<LauncherConfig>(rockyPreset.config);
  const [sim, setSim]               = useState<SimulationSetup>(rockyPreset.sim);
  const [robotState, setRobotState] = useState<RobotState>(rockyPreset.state);
  const [input, setInput]           = useState<ControlInput>({turretAngle: 45*Math.PI/180, flywheelVelocity: 1800});

  const data = useMemo(() => {
      const model = new BallisticModel({config, sim, state: robotState});
      const data: SidePlotData = [];

      model.simulate(input, sidePlotLogger(robotState, data));
      // console.log(impact);
      return data;
  }, [config, sim, robotState, input]);

  const flywheelInput: SliderInput = {
    min: 1000,
    max: 4200,
    value: input.flywheelVelocity,
    onChange: (value) => setInput({...input, flywheelVelocity: value})
  };
  const compassInput: NumericalInput = {
    value: input.turretAngle, 
    onChange: (value) => setInput({...input, turretAngle: value})
  };

  return (
    <main className="flex flex-col h-full max-w-360 w-full bg-slate-900">
      <SidePlots simulationData={data}/>
      <Controls flywheelInput={flywheelInput} compassInput={compassInput}/>
    </main>
  );
}