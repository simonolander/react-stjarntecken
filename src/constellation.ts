import {deg2rad} from "./math";

export interface Star {
    id: string
    x: number
    y: number
    size: number
}

export type ConstellationEdge = [string, string]

export interface Constellation {
    id: string
    stars: Star[]
    edges: ConstellationEdge[]
    name: string
}

export const constellations: Constellation[] = [
    {
        id: "b0ded5d3-bb16-4384-860e-aa484c36e25d",
        stars: [
            {
                id: "cbe8eb7d-a04c-40aa-8f22-a4977ee97b1b",
                x: Math.cos(deg2rad(90)),
                y: Math.sin(deg2rad(90)),
                size: 1,
            },
            {
                id: "cd8f4cff-83cd-424c-978a-45da30265846",
                x: Math.cos(deg2rad(210)),
                y: Math.sin(deg2rad(210)),
                size: 1,
            },
            {
                id: "86d22b05-e5e4-4b78-b137-ce9dc403275e",
                x: Math.cos(deg2rad(330)),
                y: Math.sin(deg2rad(330)),
                size: 1,
            }
        ],
        edges: [
            ["cbe8eb7d-a04c-40aa-8f22-a4977ee97b1b", "86d22b05-e5e4-4b78-b137-ce9dc403275e"],
            ["cd8f4cff-83cd-424c-978a-45da30265846", "cbe8eb7d-a04c-40aa-8f22-a4977ee97b1b"],
            ["86d22b05-e5e4-4b78-b137-ce9dc403275e", "cd8f4cff-83cd-424c-978a-45da30265846"],
        ],
        name: "Pyramid"
    }
]