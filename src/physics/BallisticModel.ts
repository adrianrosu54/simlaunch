import * as ty from "./simulationTypes.ts";
import { rockyPreset, type Preset } from "./presets.ts";
import type { SimulationLogger } from "./logger.ts";

const GRAVITY: number = 9.81;

export default class BallisticModel {
    public config: ty.LauncherConfig;
    public sim: ty.SimulationSetup;
    public state: ty.RobotState;

    constructor(preset: Preset = rockyPreset) {
        this.config = preset.config;
        this.sim = preset.sim;
        this.state = preset.state;
    }

    /**
     * Simulate the projectile trajectory
     * 
     * @param input control parameters of turret heading and flywheel velocity
     * @param logger optional logging function for projectile state
     * @returns impact position in meters
     */
    public simulate(
        input: ty.ControlInput,
        logger?: SimulationLogger
    ): {x: number, y: number} {
        const ts = this.sim.timeStep;
        const drag = this.config.dragFactor * this.config.dragCoefficient;

        let x = this.state.x;
        let y = this.state.y;
        let z = this.sim.launchHeight;

        let vel = input.flywheelVelocity * this.config.launchFactor
                * this.config.launchEfficiency;

        let velX = vel * Math.cos(this.config.launchPitchAngle) * Math.cos(input.turretAngle) 
                + this.state.velocityX;
        let velY = vel * Math.cos(this.config.launchPitchAngle) * Math.sin(input.turretAngle) 
                + this.state.velocityY;
        let velZ = vel * Math.sin(this.config.launchPitchAngle);

        let accX = -vel*velX * drag;
        let accY = -vel*velY * drag;
        let accZ = -GRAVITY - vel*velZ * drag;

        let time = 0;
        if (logger)
            logger({
                time, x, y, z, 
                velX, velY, velZ, 
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
                    velX, velY, velZ,
                    accX, accY, accZ
                });
            }
        }

        return {x, y};
    }

}