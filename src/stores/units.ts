import { map } from "nanostores";

export type UnitCategory = 
    "distance" | "position" | 
    "velocity" | 
    "rotation" | "angle" |
    "none";

export const $unitView = map<Record<UnitCategory, string>>({
    "distance": "m",
    "position": "m",
    "velocity": "m/s",
    "rotation": "rpm",
    "angle": "rad",
    "none": "none",
});

export const setUnitView = (category: UnitCategory, unit: string) => {
    $unitView.setKey(category, unit);
}

export const Conversions: Record<string, number> = {
    "m": 1,         // distance
    "in": 0.0254,
    "m/s": 1,       // veclocity
    "in/s": 0.0254,
    "rpm": 1,       // rotation
    "tps": 1,
    "rad": 1,       // angle
    "deg": Math.PI/180,
    "none": 1,
}

export const toDisplay = (value: number, unit: string) => value / (Conversions[unit] || 1);
export const fromDisplay = (value: number, unit: string) => value * (Conversions[unit] || 1);

