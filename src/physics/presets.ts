import type {
    ControlInput, LauncherConfig,
    RobotState, SimulationSetup
} from "./simulationTypes.ts";

export type Preset = {
    config: LauncherConfig;
    sim: SimulationSetup;
    state: RobotState;
    control: ControlInput;
}

export const rockyPreset: Preset = {
    config: {
        launchPitchAngle: 60 * Math.PI / 180,
        // flywheel_radius * RPM_to_rad/s
        flywheelRadius: 0.1016 / 2,
        // air_density * area / (2 * mass)
        launchEfficiency: 0.52,
        ticksToRPM: 60 / 43.008,
    },
    sim: {
        launchHeight: 0.26,
        impactHeight: 0.98,
        timeStep: 0.002,
    },
    state: {
        x: 96 * 0.0254,
        y: 96 * 0.0254,
        velocityX: 0,
        velocityY: 0,
    },
    control: {
        turretAngle: 45 * Math.PI / 180,
        flywheelVelocity: 1770 / 60 * 2 * Math.PI,
    },
}
