import {ViewPort} from "./viewPort";
import {chooseN} from "./misc";
import {TAU} from "./math";
import * as Matrix from "./geometry/Matrix";
import {merge, create, pad} from "./geometry/rectangle";
import {bbox} from "./geometry/Polygon";
import {Star} from "./model/star";
import {Constellation, ConstellationEdge, edgeEquals} from "./model/constellation";

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

function placeConstellations(constellations: Constellation[]) {
    const placedConstellations: PositionedConstellation[] = [];
    for (const constellation of constellations) {
        placedConstellations.push({
            constellation,
            matrix: Matrix.rotate(
                Matrix.translate(
                    Matrix.identity(),
                    Math.random() * 100, Math.random() * 100
                ),
                Math.random() * TAU / 4 - TAU / 8
            )
        });
    }
    // for (let i = 0; i < 200; ++i) {
    //   let intersects = false;
    //   for (const c1 of placedConstellations) {
    //     let polygon1 = new Flatten.Polygon(c1.constellation.convexHull).transform(
    //       c1.matrix
    //     );
    //     let centroid1 = centroid(c1.constellation.convexHull).transform(
    //       c1.matrix
    //     );
    //     for (const c2 of placedConstellations.filter((c2) => c2 !== c1)) {
    //       let polygon2 = new Flatten.Polygon(
    //         c2.constellation.convexHull
    //       ).transform(c2.matrix);
    //       let centroid2 = centroid(c2.constellation.convexHull).transform(
    //         c2.matrix
    //       );
    //       if (Flatten.Relations.intersect(polygon1, polygon2)) {
    //         const v1 = new Flatten.Vector(centroid2, centroid1).multiply(0.1);
    //         c1.matrix = c1.matrix.translate(v1);
    //         polygon1 = polygon1.translate(v1);
    //         centroid1 = centroid1.translate(v1);
    //         const v2 = v1.invert();
    //         c2.matrix = c2.matrix.translate(v2);
    //         polygon2 = polygon2.translate(v2);
    //         centroid2 = centroid2.translate(v2);
    //         intersects = true;
    //       }
    //     }
    //   }
    //   if (!intersects) {
    //     break;
    //   }
    // }
    return placedConstellations;
}

export function makeSky(aspectRatio: number): Sky {
    const numberOfConstellations = allConstellations.length;
    const constellations: PositionedConstellation[] = placeConstellations(
        chooseN(allConstellations, numberOfConstellations)
    );

    const bounds = create()
    for (const constellation of constellations) {
        merge(bounds, bbox(constellation.constellation.convexHull))
    }
    pad(bounds, 50)

    return {
        positionedConstellations: constellations,
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
