import { map } from "nanostores";

export type UnitCategory =
    "distance" | "length" |
    "velocity" |
    "rotation" | "angle" |
    "none";

export const $unitView = map<Record<UnitCategory, string>>({
    "distance": "m",
    "length": "cm",
    "velocity": "m/s",
    "rotation": "rpm",
    "angle": "deg",
    "none": "none",
});

export const setUnitView = (category: UnitCategory, unit: string) => {
    $unitView.setKey(category, unit);
}

export const Conversions: Record<string, number> = {
    "m": 1,         // distance
    "cm": 0.01,
    "in": 0.0254,
    "m/s": 1,       // veclocity
    "in/s": 0.0254,
    "rad/s": 1,     // rotation
    "rpm": Math.PI * 2 / 60,
    "tps": Math.PI * 2 / 60 * 60 / 43.008,
    "rad": 1,       // angle
    "deg": Math.PI / 180,
    "none": 1,
}

export const toDisplay = (value: number, unit: string) => value / (Conversions[unit] || 1);
export const fromDisplay = (value: number, unit: string) => value * (Conversions[unit] || 1);

