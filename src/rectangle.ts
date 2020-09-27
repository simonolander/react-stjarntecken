export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function toViewBoxString({ height, width, x, y }: Rectangle) {
  return `${x} ${y} ${width} ${height}`;
}

export function rectangleArea({ height, width }: Rectangle) {
  return width * height;
}

export function sq(x: number) {
  return x * x;
}

export function rectangleRadius({ height, width }: Rectangle): number {
  return Math.hypot(width / 2, height / 2);
}

export function rectangleCenter(rect: Rectangle): [number, number] {
  return [rect.x + rect.width / 2, rect.y + rect.height / 2];
}
