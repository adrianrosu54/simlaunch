import * as ty from "./simulationTypes.ts";

const GRAVITY: number = 9.81;

export class BallisticModel {
    public config: ty.LauncherConfig;
    public state: ty.RobotState;

    constructor(
        config: ty.LauncherConfig = ty.rockyPreset.config,
        state: ty.RobotState = ty.rockyPreset.state
    ) {
        this.config = config;
        this.state = state;
    }

    /**
     * Simulate the projectile trajectory
     * 
     * @param input control parameters of turret heading and flywheel velocity
     * @returns impact position in meters
     */
    public simulate(input: ty.ControlInput): {x: number, y: number} {
        const ts = this.config.timeStep;
        const drag = this.config.dragFactor;

        let x = this.state.x;
        let y = this.state.y;
        let z = this.config.launchHeight;

        let vel = input.flywheelVelocity * this.config.launchFactor;

        let velX = vel * Math.cos(this.config.launchPitchAngle) * Math.cos(input.turretAngle) 
                + this.state.velocityX;
        let velY = vel * Math.cos(this.config.launchPitchAngle) * Math.sin(input.turretAngle) 
                + this.state.velocityY;
        let velZ = vel * Math.sin(this.config.launchPitchAngle);

        let accX = -vel*velX * drag;
        let accY = -vel*velY * drag;
        let accZ = -GRAVITY - vel*velZ * drag;

        while (z > this.config.impactHeight || velZ >= 0) {
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
        }

        return {x, y};
    }

}