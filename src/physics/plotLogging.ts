import type { RobotState } from "./simulationTypes.ts";
import type { SimulationLogger } from "./logger.ts";

export type PlotLogs = {
    time: number;
    x: number;
    y: number;
    distance: number;
    height: number;
    velocity: number;
    acceleration: number;
}[];

export function plotLogger(robotState: RobotState, data: PlotLogs): SimulationLogger {
    return (state) => {
        data.push({
            time: state.time,
            x: state.x,
            y: state.y,
            distance: Math.sqrt((state.x-robotState.x)**2 + (state.y-robotState.y)**2),
            height: state.z,
            velocity: state.vel,
            acceleration: Math.sqrt(state.accX**2 + state.accY**2 + state.accZ**2),
        });
    };
}