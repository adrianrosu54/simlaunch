import { atom, map } from "nanostores";
import { rockyPreset, type Preset } from "../physics/presets";
import type { LauncherConfig, SimulationSetup, RobotState, ControlInput } from "../physics/simulationTypes";
import BallisticModel from "../physics/BallisticModel";
import { plotLogger, type PlotLogs } from "../physics/plotLogging";
import type { Pose } from "../physics/fieldPositions";

// physics state
export const $preset = map(rockyPreset);
export const $simLogs = atom<PlotLogs>([]);
export const $simImpact = atom<Pose>({x: 0, y: 0});
let model = new BallisticModel(rockyPreset.config, rockyPreset.sim);

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