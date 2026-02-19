export type ProjectileState = {
    time: number;
    x: number;      // position
    y: number;
    z: number;
    velX: number;   // velocity
    velY: number;
    velZ: number;
    accX: number;   // acceleration
    accY: number;
    accZ: number;
}

export type SimulationLogger = (state: ProjectileState) => void
