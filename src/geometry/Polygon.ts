import * as Point from "./Point";
import * as Matrix from "./Matrix";
import * as Rectangle from "./rectangle";

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

export function bbox(polygon: Polygon): Rectangle.Rectangle {
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
export function separate(...polygons: Polygon[]): Matrix.Matrix[] {
    return Rectangle.separate(...polygons.map(bbox))
}
