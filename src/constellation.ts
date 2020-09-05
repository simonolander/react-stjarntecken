import girlImage from "./image/girl-braid.png"

export interface Star {
    id: string
    x: number
    y: number
    size: number
}

export type ConstellationEdge = [string, string]

export interface Constellation {
    id: string
    name: string
    stars: Star[]
    edges: ConstellationEdge[]
    image: string
    width: number
    height: number
}

export const girlConstellation: Constellation = {
    id: "92c9bab9-6501-4b71-be1b-1051bbcfc5ff",
    name: "Braided girl",
    stars: [
        {
            id: "f85bbe21-4c03-4c4c-b634-bcc039935ada",
            x: 117,
            y: 704,
            size: 1
        },
        {
            id: "2bf96bdf-5abf-4b92-bcd5-0893b608f497",
            x: 159,
            y: 542,
            size: 0.4
        },
        {
            id: "e0606859-a899-4a55-ac89-3571c6ac789c",
            x: 112,
            y: 427,
            size: 0.6
        },
        {
            id: "0c21a1a7-3a26-44df-bd65-cf1d4cecec65",
            x: 135,
            y: 149,
            size: 0.9
        },
        {
            id: "9a468283-f31d-462d-8d0b-387f84f48788",
            x: 313,
            y: 112,
            size: 1
        },
        {
            id: "1e36799c-2d15-4a20-937b-06350724640a",
            x: 250,
            y: 449,
            size: 0.8
        },
    ],
    edges: [
        ["f85bbe21-4c03-4c4c-b634-bcc039935ada", "2bf96bdf-5abf-4b92-bcd5-0893b608f497"],
        ["2bf96bdf-5abf-4b92-bcd5-0893b608f497", "e0606859-a899-4a55-ac89-3571c6ac789c"],
        ["e0606859-a899-4a55-ac89-3571c6ac789c", "0c21a1a7-3a26-44df-bd65-cf1d4cecec65"],
        ["0c21a1a7-3a26-44df-bd65-cf1d4cecec65", "9a468283-f31d-462d-8d0b-387f84f48788"],
        ["9a468283-f31d-462d-8d0b-387f84f48788", "1e36799c-2d15-4a20-937b-06350724640a"],
        ["1e36799c-2d15-4a20-937b-06350724640a", "0c21a1a7-3a26-44df-bd65-cf1d4cecec65"],
    ],
    image: girlImage,
    width: 430,
    height: 798
}

export const constellations: Constellation[] = [
    girlConstellation
]