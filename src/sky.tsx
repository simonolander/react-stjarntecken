import {Constellation, ConstellationEdge, edgeEquals, Star} from "./constellation";
import {ViewPort} from "./viewPort";

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
    viewPort: ViewPort
}

export function hasEdge(sky: Sky, starId1: string, starId2: string) {
    return sky.edges.some(([id1, id2]) => (id1 === starId1 && id2 === starId2) || (id1 === starId2 && id2 === starId1))
}

export function toggleEdge(sky: Sky, starId1: string, starId2: string) {
    const e1: ConstellationEdge = [starId1, starId2]
    const index = sky.edges.findIndex(e2 => edgeEquals(e1, e2))
    if (index === -1) {
        sky.edges.push(e1)
    }
    else {
        sky.edges.splice(index, 1)
    }
}