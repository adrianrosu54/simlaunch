import { atom, map } from "nanostores";

import type { LauncherConfig, SimulationSetup, RobotState, ControlInput } from "../physics/simulationTypes";
import { rockyPreset, type Preset } from "../physics/presets";
import { plotLogger, type PlotLogs } from "../physics/plotLogging";
import BallisticModel from "../physics/BallisticModel";
import { $simImpact } from "./target";

// physics state
export const $preset = map<Preset>(rockyPreset);
export const $simLogs = atom<PlotLogs>([]);
let model = new BallisticModel(rockyPreset.config, rockyPreset.sim);

$preset.listen((value, _, key) => {
    switch (key) {
        case "config": 
        case "sim":
            model = new BallisticModel(value.config, value.sim);
            break;
    }

    const data: PlotLogs = [];
    const impact = model.simulate(value.control, value.state, plotLogger(value.state, data));

    $simLogs.set(data);
    $simImpact.set(impact);
});

// initialise all
updatePreset({type: "control", payload: rockyPreset.control});

export type PresetAction =
    | { type: "all", payload: Preset }
    | { type: "config", payload: Partial<LauncherConfig> }
    | { type: "sim", payload: Partial<SimulationSetup> }
    | { type: "state", payload: Partial<RobotState> }
    | { type: "control", payload: Partial<ControlInput> };

export function updatePreset(action: PresetAction) {
    switch (action.type) {
        case "all":
            $preset.set(action.payload);
            break;
        case "config": 
            $preset.setKey(action.type, {...$preset.value.config, ...action.payload});
            break;
        case "sim":
            $preset.setKey(action.type, {...$preset.value.sim, ...action.payload});
            break;
        case "state":
            $preset.setKey(action.type, {...$preset.value.state, ...action.payload});
            break;
        case "control":
            $preset.setKey(action.type, {...$preset.value.control, ...action.payload});
            break;
    }
}
