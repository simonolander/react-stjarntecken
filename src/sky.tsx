import {Constellation, ConstellationEdge, Star} from "./constellation";
import {clamp} from "./math";

interface PlacedConstellation {
    constellation: Constellation
    x: number
    y: number
    angle: number
}

export interface Sky {
    constellations: PlacedConstellation[]
    extraStars: Star[]
    edges: ConstellationEdge[]
    hoveredStarId: string | null
    focusedStarId: string | null
    width: number
    height: number
    viewBox: {
        x: number
        y: number
        width: number
        height: number
    }
}

export function translate(sky: Sky, dx: number, dy: number) {
    sky.viewBox.x = clamp(sky.viewBox.x - dx, 0, sky.width - sky.viewBox.width)
    sky.viewBox.y = clamp(sky.viewBox.y - dy, 0, sky.height - sky.viewBox.height)
}

export function aspect(sky: Sky, width: number, height: number) {
    sky.viewBox.x = 0
    sky.viewBox.y = 0
    sky.viewBox.width = width
    sky.viewBox.height = height
}

export function zoom(sky: Sky, fx: number, fy: number, dz: number) {
    if
}