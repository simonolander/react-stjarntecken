export interface Point {
    x: number,
    y: number,
}

export function create(x: number = 0, y: number = 0): Point {
    return {x, y}
}

export function copy(point: Point): Point {
    return {...point}
}
