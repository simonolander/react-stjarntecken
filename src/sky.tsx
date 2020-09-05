import {Constellation, ConstellationEdge, Star} from "./constellation";
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