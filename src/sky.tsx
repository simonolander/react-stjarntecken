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
    } else {
        sky.edges.splice(index, 1)
    }
}

export function makeSky(aspectRatio: number): Sky {
    const numberOfConstellations = allConstellations.length
    const constellations = chooseN(allConstellations, numberOfConstellations)
        .map(constellation => ({
            constellation,
            x: Math.random() * 2000,
            y: Math.random() * 2000,
            angle: Math.random() * TAU * 0
        }))

    const padding = 50
    let x = Math.min(...constellations.map(constellation => constellation.x))
    let y = Math.min(...constellations.map(constellation => constellation.y))
    let width = Math.max(...constellations.map(constellation => constellation.x + constellation.constellation.width)) - x
    let height = Math.max(...constellations.map(constellation => constellation.y + constellation.constellation.height)) - y
    x -= padding
    y -= padding
    width += padding
    height += padding
    if (width / height > aspectRatio) {
        height = width / aspectRatio
    }
    else {
        width = aspectRatio * height
    }
    const bounds = {x, y, width, height}

    console.log(bounds)
    return {
        constellations,
        edges: [],
        extraStars: [],
        focusedStarId: null,
        hoveredStarId: null,
        viewPort: {
            bounds: {...bounds},
            viewBox: bounds,
        }
    }
}
