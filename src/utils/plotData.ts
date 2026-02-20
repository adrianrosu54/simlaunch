import type { RobotState } from "../physics/simulationTypes.ts";
import type { SimulationLogger } from "../physics/logger.ts";

export type SidePlotData = {
    distance: number;
    height: number;
}[];

export function sidePlotLogger(robotState: RobotState, data: SidePlotData): SimulationLogger {
    return (state) => {
        data.push({
            distance: Math.sqrt(
                Math.pow(state.x-robotState.x, 2) + 
                Math.pow(state.y-robotState.y, 2)
            ),
            height: state.z,
        });
    };
}