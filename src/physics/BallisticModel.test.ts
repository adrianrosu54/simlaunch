import { expect, test, describe } from "vitest";
import { BallisticModel } from "./BallisticModel.ts";
import { rockyPreset } from "./simulationTypes.ts";

describe('Ballistic Model Logic', () => {
    test("Should have an accurate impact point.", () => {
        const config = rockyPreset.config;
        const state = rockyPreset.state;
        state.x = 0;
        state.y = 0;

        const model = new BallisticModel(config, state);
        const {x, y} = model.simulate({turretAngle: 0, flywheelVelocity: 1800});

        // console.log(config);
        // console.log(state);
        // console.log(`Impact \tx: ${x} m\ty: ${y} m`);

        expect(y).toBeCloseTo(0, 6);
        expect(x).toBeLessThan(1.45);
        expect(x).toBeGreaterThan(1.40);
    })

    test("Should handle 45 degree angles correctly", () => {
        const config = rockyPreset.config;
        const state = rockyPreset.state;
        state.x = 0;
        state.y = 0;

        const model = new BallisticModel(config, state);
        const {x, y} = model.simulate({turretAngle: 45*Math.PI/180, flywheelVelocity: 1800});

        expect(y).toBeCloseTo(x, 6);
    })
})