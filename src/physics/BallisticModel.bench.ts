import { bench, describe } from "vitest";

import BallisticModel from "./BallisticModel.ts";
import { rockyPreset } from "./presets.ts";

describe("Ballistic simulation performance", () => {
    const model = new BallisticModel(rockyPreset);

    bench("Calculate trajectory", () => {
        model.simulate({turretAngle: 45, flywheelVelocity: 1800});
    }, {time: 1000, warmupTime: 100});
});