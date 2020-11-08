import {ViewPort} from "./viewPort";
import {chooseN} from "./misc";
import {TAU} from "./math";
import * as Matrix from "./geometry/Matrix";
import * as Rectangle from "./geometry/rectangle";
import * as Polygon from "./geometry/Polygon";
import {Star} from "./model/star";
import {allConstellations, Constellation, ConstellationEdge, edgeEquals} from "./model/constellation";

export interface PositionedConstellation {
    constellation: Constellation;
    matrix: Matrix.Matrix;
}

export interface Sky {
    positionedConstellations: PositionedConstellation[];
    extraStars: Star[];
    edges: ConstellationEdge[];
    hoveredStarId: string | null;
    focusedStarId: string | null;
    viewPort: ViewPort;
}

export function hasEdge(sky: Sky, starId1: string, starId2: string) {
    return sky.edges.some(
        ([id1, id2]) =>
            (id1 === starId1 && id2 === starId2) ||
            (id1 === starId2 && id2 === starId1)
    );
}

export function toggleEdge(sky: Sky, starId1: string, starId2: string) {
    const e1: ConstellationEdge = [starId1, starId2];
    const index = sky.edges.findIndex((e2) => edgeEquals(e1, e2));
    if (index === -1) {
        sky.edges.push(e1);
    } else {
        sky.edges.splice(index, 1);
    }
}
export function makeSky(aspectRatio: number): Sky {
    const positionedConstellations: PositionedConstellation[] = chooseN(allConstellations, 10)
        .map(constellation => ({
            constellation,
            matrix: Matrix.identity()
        }))

    for (const positionedConstellation of positionedConstellations) {
        const angle = Math.random() * TAU / 4 - TAU / 8
        const dx = Math.random() * 100
        const dy = Math.random() * 100
        Matrix.rotate(positionedConstellation.matrix, angle)
        Matrix.translate(positionedConstellation.matrix, dx, dy)
    }

    const bounds = Polygon.bbox(positionedConstellations[0].constellation.convexHull)
    for (const constellation of positionedConstellations) {
        Rectangle.merge(bounds, Polygon.bbox(constellation.constellation.convexHull))
    }
    Rectangle.pad(bounds, 50)

    return {
        positionedConstellations: positionedConstellations,
        edges: [],
        extraStars: [],
        focusedStarId: null,
        hoveredStarId: null,
        viewPort: {
            bounds: {...bounds},
            viewBox: bounds,
        },
    };
}
