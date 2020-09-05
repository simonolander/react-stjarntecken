import {Rectangle} from "./rectangle";
import {clamp} from "./math";

export interface ViewPort {
    bounds: Rectangle
    viewBox: Rectangle
}

export function translate(viewPort: ViewPort, dx: number, dy: number) {
    viewPort.viewBox.x = clamp(viewPort.viewBox.x + dx, viewPort.bounds.x, viewPort.bounds.width - viewPort.viewBox.width)
    viewPort.viewBox.y = clamp(viewPort.viewBox.y + dy, viewPort.bounds.y, viewPort.bounds.height - viewPort.viewBox.height)
}

export function scale(viewPort: ViewPort, fx: number, fy: number, ds: number) {
    if (ds <= 0) {
        return
    }

    ds = Math.min(ds, viewPort.bounds.width / viewPort.viewBox.width)
    ds = Math.min(ds, viewPort.bounds.height / viewPort.viewBox.height)

    const dx = (fx - viewPort.viewBox.x) * (1 - ds)
    const dy = (fy - viewPort.viewBox.y) * (1 - ds)
    translate(viewPort, dx, dy)
    viewPort.viewBox.width *= ds
    viewPort.viewBox.height *= ds
}

export function aspect(viewPort: ViewPort, width: number, height: number) {
    viewPort.viewBox.x = viewPort.bounds.x
    viewPort.viewBox.y = viewPort.bounds.y
    viewPort.viewBox.width = width
    viewPort.viewBox.height = height
}