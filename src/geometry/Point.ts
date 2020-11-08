export interface Point {
    x: number,
    y: number,
}

export function copy(point: Point): Point {
    return {...point}
}
