export function createMap<T extends { id: string }>(list: T[]) {
  const map: { [key: string]: T } = {};
  for (const t of list) {
    map[t.id] = t;
  }
  return map;
}

export function chooseN<T>(list: T[], n: number): T[] {
  if (n <= 0 || !Number.isSafeInteger(n)) {
    console.warn(`5RFO ::: Invalid n supplied: ${n}`);
    return [];
  }

  if (n >= list.length) {
    return [...list];
  }

  const selection: T[] = new Array(n);
  const taken: number[] = new Array(list.length);
  let max = list.length;
  for (let i = 0; i < n; i += 1) {
    const randomIndex = Math.floor(Math.random() * max--);
    selection[i] =
      list[randomIndex in taken ? taken[randomIndex] : randomIndex];
    if (randomIndex !== max) {
      taken[randomIndex] = max in taken ? taken[max] : max;
    }
  }
  return selection;
}

export function range(to: number): number[] {
  const array = []
  for (let n = 0; n < to; ++n) {
    array.push(n)
  }
  return array
}
