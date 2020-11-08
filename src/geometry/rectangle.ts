export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

export function newRectangle(x: number = 0, y: number = 0, width: number = 0, height: number = 0): Rectangle {
    return {height, width, x, y}
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

export function center(rect: Rectangle): [number, number] {
    return [rect.x + rect.width / 2, rect.y + rect.height / 2];
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
