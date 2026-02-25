import { Suspense, useMemo, useReducer } from "react";

import type { ErrorBarData, NumericalInput, SliderInput } from "../utils/inputTypes.ts";
import { calculateError, redGoal } from "../utils/fieldPositions.ts";
import { sidePlotLogger, type SidePlotData } from "../utils/plotLogging.ts";
import BallisticModel from "../physics/BallisticModel.ts";
import { presetReducer, rockyPreset } from "../physics/presets.ts";

import SidePlots from "./dash/SidePlots.tsx";
import ControlPanel from "./dash/Controls.tsx";

export default function Dashboard() {
  const [preset, presetDispatch] = useReducer(presetReducer, rockyPreset);

  // model update  
  const model = useMemo(() => {
    return new BallisticModel(preset.config, preset.sim);
  }, [preset.config, preset.sim]);

  // simulation data update
  const { data, error } = useMemo(() => {
    const data: SidePlotData = [];
    const impact = model.simulate(preset.control, preset.state, sidePlotLogger(preset.state, data));

    const error = calculateError(redGoal, impact);

    return {data, error};
  }, [model, preset.state, preset.control]);

  // components data setup

  const flywheelInput: SliderInput = {
    min: 1000, max: 4200, value: preset.control.flywheelVelocity,
    onChange: (value) => presetDispatch({type: "control", payload: {flywheelVelocity: value}}),
  };
  const errorInput: ErrorBarData = {
    error: error, maxError: 2, threshold: 0.1
  };
  const compassInput: NumericalInput = {
    value: preset.control.turretAngle, 
    onChange: (value) => presetDispatch({type: "control", payload: {turretAngle: value}}),
  };

  return (
    <main className="flex flex-col h-full max-w-360 w-full bg-clk-background">
      <Suspense fallback={
        <div className="text-2xl font-bold text-clk-text-secondary text-center h-full">
          <span>Loading Graphs...</span>
        </div>
      }>
        <SidePlots simulationData={data}/>
      </Suspense>
      <ControlPanel flywheelInput={flywheelInput} errorInput={errorInput} compassInput={compassInput}/>
    </main>
  );
}