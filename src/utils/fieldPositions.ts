export type Pose = {
    x: number;
    y: number;
}

export const redGoal: Pose = {
    x: 134 * 0.0254,
    y: 134 * 0.0254,
};
export const blueGoal: Pose = {
    x: 10  * 0.0254,
    y: 134 * 0.0254,
};

export function calculateError(target: Pose, current: Pose) {
    return Math.sqrt(
        Math.pow(target.x - current.x, 2) + 
        Math.pow(target.y - current.y, 2)
    );
}
