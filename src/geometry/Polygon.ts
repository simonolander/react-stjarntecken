import * as Point from "./Point";
import {Rectangle} from "./rectangle";
import {range} from "../misc";
import * as Matrix from "./Matrix";

export interface Polygon {
    points: Point.Point[]
}

export function copy(polygon: Polygon): Polygon {
    return {points: polygon.points.map(Point.copy)}
}

export function centroid({points}: Polygon): Point.Point {
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
    return {x: cx, y: cy};
}

export function bbox(polygon: Polygon): Rectangle {
    if (polygon.points.length === 0) {
        console.warn("bbox called on empty polygon")
        return {height: 0, width: 0, x: 0, y: 0}
    }

    const minX = Math.min(...polygon.points.map(({x}) => x))
    const minY = Math.min(...polygon.points.map(({y}) => y))
    const maxX = Math.max(...polygon.points.map(({x}) => x))
    const maxY = Math.max(...polygon.points.map(({y}) => y))
    return {
        height: maxY - minY,
        width: maxX - minX,
        x: minX,
        y: minY
    }
}

/**
 * Given a set of polygons that may be overlapping, separates them so that they are no longer overlapping.
 * @param polygons
 */
export function separate(polygons: Polygon[]) {
    const copies = polygons.map(copy)
    const matrices = range(polygons.length).map(Matrix.identity)
    const maxIterations = polygons.length * 30
    for (let _ = 0; _ < maxIterations; ++_) {
        for (let i1 = 0; i1 < copies.length; ++i1) {
            const p1 = copies[i1]
            const m1 = matrices[i1]
            const bbox1 = bbox(p1)
            for (let i2 = i1 + 1; i2 < copies.length; ++i2) {
                const p2 = copies[i2]
                const m2 = matrices[i2]
                const bbox2 = bbox(p2)
            }
        }
    }
}
