export interface Rectangle {
    x: number
    y: number
    width: number
    height: number
}

export function toViewBoxString({height, width, x, y}: Rectangle) {
    return `${x} ${y} ${width} ${height}`
}

export function rectangleArea({height, width}: Rectangle) {
    return width * height
}

