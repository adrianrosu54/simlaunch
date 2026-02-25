export type ProjectileState = {
    time: number;
    x: number;      // position
    y: number;
    z: number;
    vel: number;    // velocity
    accX: number;   // acceleration
    accY: number;
    accZ: number;
}

export type SimulationLogger = (state: ProjectileState) => void
