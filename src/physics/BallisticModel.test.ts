import { expect, test, describe } from "vitest";
import BallisticModel from "./BallisticModel.ts";
import { rockyPreset } from "./presets.ts";

describe('Ballistic Model Logic', () => {
    test("Should have an accurate impact point.", () => {
        const preset = rockyPreset;
        preset.state.x = 0;
        preset.state.y = 0;
        preset.control = {turretAngle: 0, flywheelVelocity: 1800};

        const model = new BallisticModel(preset.config, preset.sim);
        const {x, y} = model.simulate(preset.control, preset.state);

        // console.log(config);
        // console.log(state);
        // console.log(`Impact \tx: ${x} m\ty: ${y} m`);

        expect(y).toBeCloseTo(0, 6);
        expect(x).toBeLessThan(1.45);
        expect(x).toBeGreaterThan(1.40);
    });

    test("Should handle 45 degree angles correctly", () => {
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
        expect(maxHeight).toBeCloseTo(1.1, 1);
    });
})