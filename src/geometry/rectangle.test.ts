import * as Rectangle from "./rectangle";
import * as Point from "./Point";

test.each([
    [[0, 0, 50, 100], [50, 0, 10, 10], false],
    [[0, 0, 50, 100], [50.01, 0, 10, 10], false],
    [[0, 0, 50, 100], [49.99, 0, 10, 10], true],
    [[0.01, 0, 50, 100], [50, 0, 10, 10], true],
    [[0, 0, 50, 100], [0, 100, 10, 10], false],
    [[0, 0, 50, 100], [0, 100.01, 10, 10], false],
    [[0, 0, 50, 100], [0, 99.99, 10, 10], true],
    [[0, 0.01, 50, 100], [0, 100, 10, 10], true],
    [[10, 10, 10, 10], [10, 10, 10, 10], true],
    [[10, 10, 0, 0], [10, 10, 0, 0], false],
    [[10, 10, 0, 0], [10, 10, 10, 10], false],
    [[0, 20, 0, 0], [10, 10, 10, 10], false],
    [[10, 20, 0, 0], [10, 10, 10, 10], false],
    [[10, 10, 10, 10], [15, 15, 10, 10], true],
    [[10, 10, 10, 10], [15, 10, 10, 10], true],
    [[10, 10, 10, 10], [10, 15, 10, 10], true],
    [[10, 20, 30, 10], [20, 10, 10, 30], true],
    [[0, 0, 3, 1], [0, 0, 1, 3], true],
    [[0, 0, 3, 3], [1, 1, 1, 1], true],
    [[0, 0, 3, 3], [1, 1, 0, 0], true],
    [[0, 0, 3, 3], [3, 3, 3, 3], false],
])("overlap %#: overlaps(%j, %j) === %j", (v1: number[], v2: number[], expectedOverlap: boolean) => {
    expect(Rectangle.overlaps(Rectangle.create(...v1), Rectangle.create(...v2))).toBe(expectedOverlap)
    expect(Rectangle.overlaps(Rectangle.create(...v2), Rectangle.create(...v1))).toBe(expectedOverlap)
})

test.each([
    [[0, 0, 10, 10], [5, 5]],
    [[10, 10, 10, 10], [15, 15]],
    [[-5, -5, 10, 10], [0, 0]],
    [[-5, 0, 10, 10], [0, 5]],
    [[-5, 0, 10, 0], [0, 0]],
])("center %#, center(%j) == %j", (v, c) => {
    expect(Rectangle.center(Rectangle.create(...v))).toEqual(Point.create(...c))
})
