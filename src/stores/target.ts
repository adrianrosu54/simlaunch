import { atom } from "nanostores";
import { redGoal, type Pose } from "../physics/fieldPositions";

export const $simImpact = atom<Pose>({x: 0, y: 0});
export const $simTarget = atom<Pose>(redGoal);
export const $impactError = atom(0);

export function calculateError(target: Pose, impact: Pose) {
    return Math.sqrt(
        (target.x - impact.x)**2 + (target.y - impact.y)**2
    );
}

$simImpact.listen((value) => {
    $impactError.set(calculateError($simTarget.value, value));
})
$simTarget.listen((value) => {
    $impactError.set(calculateError(value, $simImpact.value));
});