export type LauncherConfig = {
    launchPitchAngle: number;
    launchFactor: number;
    dragFactor: number;
}

export type SimulationSetup = {
    launchHeight: number;
    impactHeight: number;
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