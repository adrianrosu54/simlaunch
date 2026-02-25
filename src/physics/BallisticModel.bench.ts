import { bench, describe } from "vitest";

import BallisticModel from "./BallisticModel.ts";
import { rockyPreset } from "./presets.ts";
import { sidePlotLogger, type SidePlotData } from "../utils/plotLogging.ts";

describe("Ballistic simulation performance", () => {
    const preset = rockyPreset;
    const model = new BallisticModel(preset.config, preset.sim);
    preset.control.flywheelVelocity = 1800;

    bench("Calculate trajectory", () => {
        model.simulate(preset.control, preset.state);
    }, {time: 1000, warmupTime: 100});

    const data: SidePlotData = [];
    const logger = sidePlotLogger(preset.state, data);

    bench("Log trajectory, velocity and acceleration", () => {
        model.simulate(preset.control, preset.state, logger);
    }, {time: 2000, warmupTime: 100} );
});