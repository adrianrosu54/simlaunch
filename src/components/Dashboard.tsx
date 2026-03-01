import { useMemo } from "react";
import { useStore } from "@nanostores/react";

import type { CompassAngle, FlywheelSliderInput } from "../utils/inputTypes.ts";
import { calculateError, redGoal } from "../physics/fieldPositions.ts";
import { plotLogger, type PlotLogs } from "../physics/plotLogging.ts";
import BallisticModel from "../physics/BallisticModel.ts";

import ControlPanel from "./dash/ControlPanel.tsx";
import SidePlots from "./dash/SidePlots.tsx";

import { $preset, $simLogs, updatePreset } from "../stores/physics.ts";

export default function Dashboard() {
  const preset = useStore( $preset );
  const data = useStore( $simLogs );

  // components data setup

  const flywheelInput: FlywheelSliderInput = useMemo(() => ({
    min: 1000, max: 4200, value: preset.control.flywheelVelocity,
    onChange: (value) => updatePreset({type: "control", payload: {flywheelVelocity: value}}),
  }), [preset.control.flywheelVelocity]);

  const compassInput: CompassAngle = useMemo(() => ({
    value: preset.control.turretAngle, 
    onChange: (value) => updatePreset({type: "control", payload: {turretAngle: value}}),
  }), [preset.control.turretAngle]);

  return (
    <main className="flex flex-col h-full max-w-360 w-full">
      <SidePlots simulationData={data}/>
      <ControlPanel flywheelInput={flywheelInput} compassInput={compassInput}/>
    </main>
  );
}