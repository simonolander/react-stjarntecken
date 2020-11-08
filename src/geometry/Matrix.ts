/**
 * +---+---+---+
 * |m00|m01|m02|
 * +---+---+---+
 * |m10|m11|m12|
 * +---+---+---+
 * |  0|  0|  1|
 * +---+---+---+
 */
import {Shape} from "./Shape";

export interface Transformed<TShape extends Shape> {
    shape: Shape
    matrix: Matrix
}

export interface Matrix {
    m00: number
    m01: number
    m02: number
    m10: number
    m11: number
    m12: number
}

export function identity(): Matrix {
    return {
        m00: 1, m01: 0, m02: 0,
        m10: 0, m11: 1, m12: 0
    }
}

export function multiply(m1: Matrix, m2: Matrix): Matrix {
    const m00 = m1.m00 * m2.m00 + m1.m01 * m2.m10
    const m01 = m1.m00 * m2.m01 + m1.m01 * m2.m11
    const m02 = m1.m00 * m2.m02 + m1.m01 * m2.m12
    const m10 = m1.m10 * m2.m00 + m1.m11 * m2.m10
    const m11 = m1.m10 * m2.m01 + m1.m11 * m2.m11
    const m12 = m1.m10 * m2.m02 + m1.m11 * m2.m12
    m1.m00 = m00
    m1.m01 = m01
    m1.m02 = m02
    m1.m10 = m10
    m1.m11 = m11
    m1.m12 = m12
    return m1
}

export function rotate(m: Matrix, rads: number): Matrix {
    const sin = Math.sin(rads)
    const cos = Math.cos(rads)
    return multiply(m, {
        m00: cos, m01: -sin, m02: 0,
        m10: sin, m11: cos, m12: 0,
    })
}

export function translate(m: Matrix, dx: number, dy: number): Matrix {
    return multiply(m, {
        m00: 1, m01: 0, m02: dx,
        m10: 0, m11: 1, m12: dy,
    })
}

export function scale(m: Matrix, sx: number, sy: number): Matrix {
    return multiply(m, {
        m00: sx, m01: 0, m02: 0,
        m10: 0, m11: sy, m12: 0,
    })
}
