export const TAU = 2 * Math.PI

export function deg2rad(degrees: number): number {
    return degrees * Math.PI / 180
}

export function rad2deg(radians: number): number {
    return radians / Math.PI * 180
}

export function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value))
}
