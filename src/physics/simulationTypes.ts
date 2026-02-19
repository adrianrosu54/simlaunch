export type LauncherConfig = {
    launchHeight: number;
    impactHeight: number;
    launchPitchAngle: number;
    launchFactor: number;
    dragFactor: number;
    timeStep: number;
}

export type RobotState = {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
}

export type ControlInput = {
    turretAngle: number;
    flywheelVelocity: number;
}

export type Preset = {
    config: LauncherConfig;
    state: RobotState;
}

export const rockyPreset: Preset = {
    config: {
        launchHeight: 0.26,
        impactHeight: 0.98,
        launchPitchAngle: 60 * Math.PI / 180,
        launchFactor: (0.1016/2) / 60 * 2*Math.PI * 0.52,
        dragFactor: 1.2 * (0.47+0.04) * ((0.127/2*0.127/2) * Math.PI) / (2 * 0.075),
        timeStep: 2e-3,
    },
    state: {
        x: 96 * 0.0254,
        y: 96 * 0.0254,
        velocityX: 0,
        velocityY: 0,
    }
}