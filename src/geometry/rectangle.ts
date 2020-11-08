import * as Point from "./Point";
import * as Matrix from "./Matrix";
import {bbox} from "./Polygon";
import {range} from "../misc";

export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

export function create(x: number = 0, y: number = 0, width: number = 0, height: number = 0): Rectangle {
    return {height, width, x, y}
}

export function copy(rectangle: Rectangle): Rectangle {
    return {...rectangle}
}

export function merge(r1: Rectangle, r2: Rectangle): Rectangle {
    const minX = Math.min(r1.x, r2.x)
    const minY = Math.min(r1.y, r2.y)
    const maxX = Math.max(r1.x, r2.x)
    const maxY = Math.max(r1.y, r2.y)
    r1.x = minX
    r1.y = minY
    r1.width = maxX - minX
    r1.height = maxY - minY
    return r1
}

export function pad(rectangle: Rectangle, padding: number) {
    rectangle.x -= padding
    rectangle.y -= padding
    rectangle.width += 2 * padding
    rectangle.height += 2 * padding
    return rectangle
}

export function toViewBoxString({height, width, x, y}: Rectangle) {
    return `${x} ${y} ${width} ${height}`;
}

export function area({height, width}: Rectangle) {
    return width * height;
}

export function radius({height, width}: Rectangle): number {
    return Math.hypot(width / 2, height / 2);
}

export function center(rect: Rectangle): Point.Point {
    const x = rect.x + rect.width / 2
    const y = rect.y + rect.height / 2
    return {x, y}
}

export function overlaps(r1: Rectangle, r2: Rectangle): boolean {
    if (r1.x >= r2.x + r2.width) {
        return false
    }

    if (r1.y >= r2.y + r2.height) {
        return false
    }

    if (r2.x >= r1.x + r1.width) {
        return false
    }

    if (r2.y >= r1.y + r1.height) {
        return false
    }

    return true
}

export function separate(...rectangles: Rectangle[]): Matrix.Matrix[] {
    const copies = rectangles.map(copy);
    const matrices = range(rectangles.length).map(Matrix.identity)
    const maxIterations = rectangles.length * 30;
    for (let iteration = 0; iteration <= maxIterations; iteration += 1) {
        for (let i1 = 0; i1 < copies.length; ++i1) {
            const r1 = copies[i1]
            const m1 = matrices[i1]
            for (let i2 = i1 + 1; i2 < copies.length; ++i2) {
                const r2 = copies[i2]
                const m2 = matrices[i2]
                if (!overlaps(r1, r2)) {
                    continue
                }
                const dx = r1.x + r1.width - r2.x
                const dx2 = dx/2
                const dx1 = -dx2
                r1.x += dx1
                Matrix.translate(m1, dx1, 0)
                r2.x += dx2
                Matrix.translate(m2, dx2, 0)
            }
        }
    }
    return matrices
}
