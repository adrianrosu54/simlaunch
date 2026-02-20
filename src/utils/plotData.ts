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
            distance: Math.sqrt(
                Math.pow(state.x-robotState.x, 2) + 
                Math.pow(state.y-robotState.y, 2)
            ),
            height: state.z,
            velocity: Math.sqrt(Math.pow(state.velX, 2) +
                Math.pow(state.velY, 2) +
                Math.pow(state.velZ, 2)
            ),
            acceleration: Math.sqrt(Math.pow(state.accX, 2) +
                Math.pow(state.accY, 2) + 
                Math.pow(state.accZ, 2)
            ),
        });
    };
}