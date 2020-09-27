import {
  allConstellations,
  Constellation,
  ConstellationEdge,
  edgeEquals,
  Star,
} from "./constellation";
import { ViewPort } from "./viewPort";
import { chooseN } from "./misc";
import Flatten from "@flatten-js/core";
import { TAU } from "./math";

export interface PlacedConstellation {
  constellation: Constellation;
  matrix: Flatten.Matrix;
}

export interface Sky {
  constellations: PlacedConstellation[];
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

function placedConstellationsIntersect(
  c1: PlacedConstellation,
  c2: PlacedConstellation
) {
  if (c1 === c2) {
    return false;
  }
}

function centroid(points: Flatten.Point[]) {
  let cx = 0;
  let cy = 0;
  let area = 0;
  for (let i = 0; i < points.length; i += 1) {
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    const areaIncrement = p1.x * p2.y - p2.x * p1.y;
    cx += (p1.x + p2.x) * areaIncrement;
    cy += (p1.y + p2.y) * areaIncrement;
    area += areaIncrement;
  }
  area /= 2;
  cx /= 6 * area;
  cy /= 6 * area;
  return new Flatten.Point(cx, cy);
}

function placeConstellations(constellations: Constellation[]) {
  const placedConstellations: PlacedConstellation[] = [];
  for (const constellation of constellations) {
    placedConstellations.push({
      constellation,
      matrix: new Flatten.Matrix()
        .translate(Math.random() * 100, Math.random() * 100)
        .rotate((Math.random() * TAU) / 4 - TAU / 8),
    });
  }
  for (let i = 0; i < 200; ++i) {
    let intersects = false;
    for (const c1 of placedConstellations) {
      let polygon1 = new Flatten.Polygon(c1.constellation.convexHull).transform(
        c1.matrix
      );
      let centroid1 = centroid(c1.constellation.convexHull).transform(
        c1.matrix
      );
      for (const c2 of placedConstellations.filter((c2) => c2 !== c1)) {
        let polygon2 = new Flatten.Polygon(
          c2.constellation.convexHull
        ).transform(c2.matrix);
        let centroid2 = centroid(c2.constellation.convexHull).transform(
          c2.matrix
        );
        if (Flatten.Relations.intersect(polygon1, polygon2)) {
          const v1 = new Flatten.Vector(centroid2, centroid1).multiply(0.1);
          c1.matrix = c1.matrix.translate(v1);
          polygon1 = polygon1.translate(v1);
          centroid1 = centroid1.translate(v1);
          const v2 = v1.invert();
          c2.matrix = c2.matrix.translate(v2);
          polygon2 = polygon2.translate(v2);
          centroid2 = centroid2.translate(v2);
          intersects = true;
        }
      }
    }
    if (!intersects) {
      break;
    }
  }
  return placedConstellations;
}

export function makeSky(aspectRatio: number): Sky {
  const numberOfConstellations = allConstellations.length;
  const constellations: PlacedConstellation[] = placeConstellations(
    chooseN(allConstellations, numberOfConstellations)
  );

  let box = new Flatten.Box();
  for (const c of constellations) {
    box = box.merge(
      new Flatten.Polygon(c.constellation.convexHull).transform(c.matrix).box
    );
  }
  const padding = 50;
  const x = box.xmin - padding;
  const y = box.ymin - padding;
  let width = box.xmax - x + padding;
  let height = box.ymax - y + padding;
  // if (width / height > aspectRatio) {
  //     height = width / aspectRatio;
  // } else {
  //     width = aspectRatio * height;
  // }
  const bounds = { x, y, width, height };

  return {
    constellations,
    edges: [],
    extraStars: [],
    focusedStarId: null,
    hoveredStarId: null,
    viewPort: {
      bounds: { ...bounds },
      viewBox: bounds,
    },
  };
}
