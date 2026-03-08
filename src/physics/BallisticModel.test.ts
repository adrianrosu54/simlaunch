import { expect, test, describe } from "vitest";
import BallisticModel from "./BallisticModel.ts";
import { rockyPreset } from "./presets.ts";

describe('Ballistic Model Logic', () => {
    test("Should reach target height", () => {
        const preset = rockyPreset;
        preset.sim.impactHeight = 1;

        const model = new BallisticModel(preset.config, preset.sim);
        let impactHeight = 0;
        model.simulate(preset.control, preset.state, (state) => {
            impactHeight = state.z;
        })

        expect(impactHeight).toBeCloseTo(1, 2);
    })

    test("Should handle 45 degree heading angles correctly", () => {
        const preset = rockyPreset;
        preset.state.x = 0;
        preset.state.y = 0;
        preset.control = {turretAngle: 45*Math.PI/180, flywheelVelocity: 1800};

        const model = new BallisticModel(preset.config, preset.sim);
        const {x, y} = model.simulate(preset.control, preset.state);

        expect(y).toBeCloseTo(x, 6);
    });

    test("Should log height information", () => {     
        const preset = rockyPreset;   
        const model = new BallisticModel(preset.config, preset.sim);
        preset.control = {turretAngle: 0, flywheelVelocity: 1800};
        
        let maxHeight = 0;
        model.simulate(preset.control, preset.state, (state) => {
            if (state.z > maxHeight) maxHeight = state.z;
        });

        // console.log(`Max height reached:\t${maxHeight} m`);
        expect(maxHeight !== 0).toBeTruthy();
        expect(maxHeight > 0).toBeTruthy();
        expect(maxHeight < 3).toBeTruthy();
    });
})