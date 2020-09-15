import {Constellation, ConstellationEdge, allConstellations, edgeEquals, Star} from "./constellation";
import {ViewPort} from "./viewPort";
import {chooseN} from "./misc";
import {TAU} from "./math";

export interface PlacedConstellation {
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

export function makeSky(aspectRatio: number): Sky {
    const numberOfConstellations = 1
    const constellations = chooseN(allConstellations, numberOfConstellations)
        .map(constellation => ({
            constellation,
            x: Math.random() * 500,
            y: Math.random() * 500,
            angle: Math.random() * TAU
        }))

    return {
        constellations,
        edges: [],
        extraStars: [],
        focusedStarId: null,
        hoveredStarId: null,
        viewPort: {
            bounds: {
                x: 0,
                y: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            },
            viewBox: {
                x: 0,
                y: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            },
        }
    }
}
