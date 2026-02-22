import { Suspense, lazy, useMemo, useState } from "react";

import type { LauncherConfig, ControlInput, SimulationSetup, RobotState } from "../physics/simulationTypes.ts";
import type { ErrorBarData, NumericalInput, SliderInput } from "../utils/inputTypes.ts";
import { calculateError, redGoal, type Pose } from "../utils/fieldPositions.ts";
import { sidePlotLogger, type SidePlotData } from "../utils/plotLogging.ts";
import BallisticModel from "../physics/BallisticModel.ts";
import { rockyPreset } from "../physics/presets.ts";

const SidePlots = lazy(() => import("./SidePlots.tsx"));
import Controls from "./Controls.tsx";

export default function Dashboard() {
  const [config]      = useState<LauncherConfig>(rockyPreset.config);
  const [sim]         = useState<SimulationSetup>(rockyPreset.sim);
  const [robotState]  = useState<RobotState>(rockyPreset.state);

  const [input, setInput] = useState<ControlInput>({turretAngle: 45*Math.PI/180, flywheelVelocity: 1800});

  const {data, error} = useMemo(() => {
    const model = new BallisticModel({config, sim, state: robotState});
    const data: SidePlotData = [];

    const impact: Pose = model.simulate(input, sidePlotLogger(robotState, data));
    const error = calculateError(impact, redGoal);

    return {data, error};
  }, [config, sim, robotState, input]);

  // components data setup
  const flywheelInput: SliderInput = {
    min: 1000,
    max: 4200,
    value: input.flywheelVelocity,
    onChange: (value) => setInput({...input, flywheelVelocity: value})
  };
  const errorInput: ErrorBarData = {
    error: error,
    maxError: 2,
    threshold: 0.1,
  }
  const compassInput: NumericalInput = {
    value: input.turretAngle, 
    onChange: (value) => setInput({...input, turretAngle: value})
  };

  return (
    <main className="flex flex-col h-full max-w-360 w-full bg-slate-900">
      <Suspense fallback={<div className="text-2xl font-bold text-slate-600 text-center h-full">Loading Graphs...</div>}>
        <SidePlots simulationData={data}/>
      </Suspense>
      <Controls flywheelInput={flywheelInput} errorInput={errorInput} compassInput={compassInput}/>
    </main>
  );
}