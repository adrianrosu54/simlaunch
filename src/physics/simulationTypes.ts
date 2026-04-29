/**
 * physical constant (robot-independent) parameters
 */
export type PhysicalConstants = {
    dragFactor: number;
    dragCoefficient: number;
}

/**
 * Launcher configuration values (robot-specific)
 */
export type LauncherConfig = {
    launchPitchAngle: number;
    flywheelRadius: number;
    launchEfficiency: number;
    ticksToRPM: number;
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
