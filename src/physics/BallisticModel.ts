import type { ControlInput, LauncherConfig, RobotState, SimulationSetup } from "./simulationTypes.ts";
import type { SimulationLogger } from "./logger.ts";
import type { Pose } from "./fieldPositions.ts";

const GRAVITY: number = 9.81;

export default class BallisticModel {
    public config: LauncherConfig;
    public sim: SimulationSetup;

    constructor(config: LauncherConfig, sim: SimulationSetup) {
        this.config = config;
        this.sim = sim;
    }

    /**
     * Simulate the projectile trajectory
     * 
     * @param input control parameters of turret heading and flywheel velocity
     * @param state robot state parameters of position and velocity
     * @param logger optional logging function for projectile state
     * @returns impact position in meters
     */
    public simulate(
        input: ControlInput,
        state: RobotState,
        logger?: SimulationLogger
    ): Pose {
        const ts = this.sim.timeStep;
        const drag = this.config.dragFactor * this.config.dragCoefficient;

        let x = state.x;
        let y = state.y;
        let z = this.sim.launchHeight;

        let vel = input.flywheelVelocity * this.config.launchFactor
                * this.config.launchEfficiency;

        let velX = vel * Math.cos(this.config.launchPitchAngle) * Math.cos(input.turretAngle) 
                + state.velocityX;
        let velY = vel * Math.cos(this.config.launchPitchAngle) * Math.sin(input.turretAngle) 
                + state.velocityY;
        let velZ = vel * Math.sin(this.config.launchPitchAngle);
        
        // for initial logging
        vel = Math.sqrt(velX*velX + velY*velY + velZ*velZ)
        let accX = -vel*velX * drag;
        let accY = -vel*velY * drag;
        let accZ = -GRAVITY - vel*velZ * drag;
        
        let time = 0;
        if (logger)
            logger({
                time, x, y, z, 
                vel,
                accX, accY, accZ
            });

        while (z > this.sim.impactHeight || velZ >= 0) {
            vel = Math.sqrt(velX*velX + velY*velY + velZ*velZ);

            accX = -vel*velX * drag;
            accY = -vel*velY * drag;
            accZ = -GRAVITY - vel*velZ * drag;

            velX += accX * ts;
            velY += accY * ts;
            velZ += accZ * ts;

            x += velX * ts;
            y += velY * ts;
            z += velZ * ts;

            if (logger) {
                time += ts;
                logger({
                    time, x, y, z,
                    vel, accX, accY, accZ
                });
            }
        }

        return {x, y};
    }

}