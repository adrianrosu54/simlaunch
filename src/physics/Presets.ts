import type { 
    ControlInput,
    LauncherConfig, 
    RobotState, 
    SimulationSetup 
} from "./simulationTypes.ts";

export type Preset = {
    config: LauncherConfig;
    sim: SimulationSetup;
    state: RobotState;
    control: ControlInput;
}
export type PresetAction = 
    | { type: "config", payload: Partial<LauncherConfig> }
    | { type: "sim", payload: Partial<SimulationSetup> }
    | { type: "state", payload: Partial<RobotState> }
    | { type: "control", payload: Partial<ControlInput> };

export function presetReducer(state: Preset, action: PresetAction): Preset {
    switch (action.type) {
        case "config": 
            return {...state, config: {...state.config, ...action.payload}};
        case "sim":
            return {...state, sim: {...state.sim, ...action.payload}};
        case "state":
            return {...state, state: {...state.state, ...action.payload}};
        case "control":
            return {...state, control: {...state.control, ...action.payload}};
        default:
            return state;
    }
}

export const rockyPreset: Preset = {
    config: {
        launchPitchAngle: 60 * Math.PI / 180,
        launchFactor: (0.1016 / 2) / 60 * 2 * Math.PI,
        dragFactor: 1.2 * (Math.pow(0.127 / 2, 2) * Math.PI) / (2 * 0.075),
        launchEfficiency: 0.52,
        dragCoefficient: 0.47 + 0.04,
        ticksToRPM: (tps) => tps * 60 / 43.008,
    },
    sim: {
        launchHeight: 0.26,
        impactHeight: 0.98,
        timeStep: 2e-3,
    },
    state: {
        x: 96 * 0.0254,
        y: 96 * 0.0254,
        velocityX: 0,
        velocityY: 0,
    },
    control: {
        turretAngle: 45*Math.PI/180,
        flywheelVelocity: 1770,
    },
}
