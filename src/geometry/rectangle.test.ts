import {newRectangle, overlaps} from "./rectangle";


test.each([
    [[0, 0, 50, 100], [50, 0, 10, 10], false],
    [[0, 0, 50, 100], [50.01, 0, 10, 10], false],
    [[0, 0, 50, 100], [49.99, 0, 10, 10], true],
    [[0.01, 0, 50, 100], [50, 0, 10, 10], true],
    [[0, 0, 50, 100], [0, 100, 10, 10], false],
    [[0, 0, 50, 100], [0, 100.01, 10, 10], false],
    [[0, 0, 50, 100], [0, 99.99, 10, 10], true],
    [[0, 0.01, 50, 100], [0, 100, 10, 10], true],
])("overlap %#: overlaps(%j, %j) === %j", (v1: number[], v2: number[], expectedOverlap: boolean) => {
    expect(overlaps(newRectangle(...v1), newRectangle(...v2))).toBe(expectedOverlap)
    expect(overlaps(newRectangle(...v2), newRectangle(...v1))).toBe(expectedOverlap)
})
