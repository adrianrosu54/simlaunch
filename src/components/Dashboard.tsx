import { useMemo, useReducer } from "react";

import type { ErrorBarData, CompassAngle, FlywheelSliderInput } from "../utils/inputTypes.ts";
import { calculateError, redGoal } from "../utils/fieldPositions.ts";
import { sidePlotLogger, type SidePlotData } from "../utils/plotLogging.ts";
import BallisticModel from "../physics/BallisticModel.ts";
import { presetReducer, rockyPreset } from "../physics/presets.ts";

import ControlPanel from "./dash/ControlPanel.tsx";
import { useApp } from "../context/AppProvider.tsx";
import SidePlots from "./dash/SidePlots.tsx";
import FieldView from "./dash/FieldPlots.tsx";

export default function Dashboard() {
  const { view } = useApp();
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

  const flywheelInput: FlywheelSliderInput = useMemo(() => ({
    min: 1000, max: 4200, value: preset.control.flywheelVelocity,
    onChange: (value) => presetDispatch({type: "control", payload: {flywheelVelocity: value}}),
  }), [preset.control.flywheelVelocity]);

  const errorInput: ErrorBarData = useMemo(() => ({ 
    error: error, maxError: 2, threshold: 0.1 
  }), [error]);

  const compassInput: CompassAngle = useMemo(() => ({
    value: preset.control.turretAngle, 
    onChange: (value) => presetDispatch({type: "control", payload: {turretAngle: value}}),
  }), [preset.control.turretAngle]);

  return (
    <main className="flex flex-col h-full max-w-360 w-full">
      {view === "Side View" && <SidePlots simulationData={data}/>}
      {view === "Top View" && <FieldView simulationData={data}/>}
      
      <ControlPanel flywheelInput={flywheelInput} errorInput={errorInput} compassInput={compassInput}/>
    </main>
  );
}