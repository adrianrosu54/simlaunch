import { atom } from "nanostores";
import type { Pose } from "../physics/fieldPositions";
import { $impactError, $simTarget, calculateError } from "./target";
import { fromDisplay } from "./units";

export const $errorScore = atom(0);
export const $stabilityScore = atom(0);
export const $confidence = atom(0);

// magnitude for computing the error sensitivty
export const flywheelExpectedNoise = fromDisplay(20, "rpm");

// error tolerance (roughly around the goal radius)
export const goalErrorTolerance = fromDisplay(0.2, "m");

export function computeConfidence(overshootImpact: Pose, undershootImpact: Pose) {
    const overshootError = calculateError($simTarget.value, overshootImpact);
    const undershootError = calculateError($simTarget.value, undershootImpact);

    const errorSensitivity = Math.abs(overshootError - undershootError) / (2 * flywheelExpectedNoise);
    const expectedMiss = errorSensitivity * flywheelExpectedNoise;

    $errorScore.set(Math.max(0, 1 - $impactError.value / goalErrorTolerance));
    $stabilityScore.set(Math.max(0, 1 - expectedMiss / goalErrorTolerance));

    $confidence.set($errorScore.value * $stabilityScore.value);
}
