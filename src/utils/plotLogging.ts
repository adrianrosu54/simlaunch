import type { RobotState } from "../physics/simulationTypes.ts";
import type { SimulationLogger } from "../physics/logger.ts";

export type SidePlotData = {
    time: number,
    distance: number;
    height: number;
    velocity: number;
    acceleration: number;
}[];

export function sidePlotLogger(robotState: RobotState, data: SidePlotData): SimulationLogger {
    return (state) => {
        data.push({
            time: state.time,
            distance: Math.sqrt((state.x-robotState.x)**2 + (state.y-robotState.y)**2),
            height: state.z,
            velocity: state.vel,
            acceleration: Math.sqrt(state.accX**2 + state.accY**2 + state.accZ**2),
        });
    };
}