export function createMap<T extends { id: string }>(list: T[]) {
    const map: { [key: string]: T } = {}
    for (const t of list) {
        map[t.id] = t
    }
    return map
}