import {Rectangle, rectangleArea} from "./rectangle";
import {clamp} from "./math";

export interface ViewPort {
    bounds: Rectangle
    viewBox: Rectangle
}

export function translate(viewPort: ViewPort, dx: number, dy: number) {
    viewPort.viewBox.x = clamp(viewPort.viewBox.x + dx, viewPort.bounds.x, viewPort.bounds.width - viewPort.viewBox.width + viewPort.bounds.x)
    viewPort.viewBox.y = clamp(viewPort.viewBox.y + dy, viewPort.bounds.y, viewPort.bounds.height - viewPort.viewBox.height + viewPort.bounds.y)
}

export function scale(viewPort: ViewPort, fx: number, fy: number, ds: number) {
    const minimumSize = 5
    ds = clamp(ds, minimumSize / viewPort.viewBox.width, viewPort.bounds.width / viewPort.viewBox.width)
    ds = clamp(ds, minimumSize / viewPort.viewBox.height, viewPort.bounds.height / viewPort.viewBox.height)

    const dx = (fx - viewPort.viewBox.x) * (1 - ds)
    const dy = (fy - viewPort.viewBox.y) * (1 - ds)
    viewPort.viewBox.width *= ds
    viewPort.viewBox.height *= ds
    translate(viewPort, dx, dy)
}

export function aspect(viewPort: ViewPort, width: number, height: number) {
    const maxArea = width / height < viewPort.bounds.width / viewPort.bounds.height
        ? viewPort.bounds.height * viewPort.bounds.height * width / height
        : viewPort.bounds.width * viewPort.bounds.width * height / width
    const area = Math.min(rectangleArea(viewPort.viewBox), maxArea)
    const newWidth = Math.sqrt(area * width / height)
    const newHeight = area / newWidth
    const dx = (viewPort.viewBox.width - newWidth) / 2
    const dy = (viewPort.viewBox.height - newHeight) / 2
    viewPort.viewBox.width = newWidth
    viewPort.viewBox.height = newHeight
    translate(viewPort, dx, dy)
}
