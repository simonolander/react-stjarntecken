import girlImage from "./image/girl-braid.png"
import squirrelImage from "./image/squirrel.png"
import goatImage from "./image/goat.png"

export interface Star {
    id: string
    x: number
    y: number
    size: number
}

export type ConstellationEdge = [string, string]

export function edgeEquals(e1: ConstellationEdge, e2: ConstellationEdge) {
    return (e1[0] === e2[0] && e1[1] === e2[1]) || (e1[0] === e2[1] && e1[1] === e2[0])
}

export interface Constellation {
    id: string
    name: string
    stars: Star[]
    edges: ConstellationEdge[]
    image: string
    width: number
    height: number
}

export function constellationIsComplete(constellation: Constellation, edges: ConstellationEdge[]): boolean {
    const starIdSet = new Set(constellation.stars.map(({id}) => id))
    const edgesWithStar = edges.filter(([id1, id2]) => starIdSet.has(id1) || starIdSet.has(id2))
    if (edgesWithStar.length !== constellation.edges.length) {
        return false
    }
    for (const correctEdge of constellation.edges) {
        if (!edges.some(edge => edgeEquals(edge, correctEdge))) {
            return false
        }
    }
    for (const actualEdge of edges) {
        if (!constellation.edges.some(edge => edgeEquals(edge, actualEdge))) {
            return false
        }
    }
    return true
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

export const squirrelConstellation: Constellation = {
    id: "64c2ee79-40c0-43d2-9b2c-97df37150c34",
    name: "Squirrel",
    stars: [
        {
            id: "45a9a232-8deb-4fbd-99d8-807e9cef1775",
            x: 309,
            y: 426,
            size: 0.3
        },
        {
            id: "7c995c7d-f930-4628-9512-8fbe4b9bb06a",
            x: 331,
            y: 525,
            size: 0.6
        },
        {
            id: "69268240-c532-488a-902a-604a6e894bb9",
            x: 140,
            y: 487,
            size: 0.4
        },
        {
            id: "cc6c2ca1-02d0-483b-accd-687277dd3693",
            x: 109,
            y: 352,
            size: 0.6
        },
        {
            id: "5fcc522b-5501-4be4-b9c6-6e39a857918c",
            x: 204,
            y: 196,
            size: 0.9
        },
        {
            id: "ce314ece-5a20-47d5-9f88-2ced4d8018c1",
            x: 54,
            y: 97,
            size: 0.4
        },
    ],
    edges: [
        ["45a9a232-8deb-4fbd-99d8-807e9cef1775", "7c995c7d-f930-4628-9512-8fbe4b9bb06a"],
        ["45a9a232-8deb-4fbd-99d8-807e9cef1775", "69268240-c532-488a-902a-604a6e894bb9"],
        ["7c995c7d-f930-4628-9512-8fbe4b9bb06a", "69268240-c532-488a-902a-604a6e894bb9"],
        ["69268240-c532-488a-902a-604a6e894bb9", "cc6c2ca1-02d0-483b-accd-687277dd3693"],
        ["cc6c2ca1-02d0-483b-accd-687277dd3693", "5fcc522b-5501-4be4-b9c6-6e39a857918c"],
        ["5fcc522b-5501-4be4-b9c6-6e39a857918c", "ce314ece-5a20-47d5-9f88-2ced4d8018c1"],
    ],
    image: squirrelImage,
    width: 554,
    height: 739,
}

export const goatConstellation: Constellation = {
    id: "ef1882e7-fbf9-4b2e-b58f-ba55b490a65c",
    name: "The goat",
    stars: [
        {
            id: "578abf9c-9bcc-44cc-92bd-ffc2ca7ba9ee",
            size: 0.2,
            x: 381,
            y: 313,
        },
        {
            id: "7920747b-c41f-4dad-b95f-a98b96ff314b",
            size: 0.6,
            x: 250,
            y: 352,
        },
        {
            id: "ea186baa-4d56-4d4e-9d7d-532465681e39",
            size: 0.5,
            x: 187,
            y: 191,
        },
        {
            id: "4c29099d-cb97-4890-a458-bd7c89e908b9",
            size: 0.6,
            x: 325,
            y: 104,
        },
        {
            id: "2cea62ef-73e8-4572-8bc1-ea954ae0f538",
            size: 0.4,
            x: 473,
            y: 173,
        },
        {
            id: "8645f4e7-2e5b-4985-be85-f4f304738d9f",
            size: 0.9,
            x: 576,
            y: 385,
        },
        {
            id: "5cfa10e7-f8ca-411b-a263-6e117c7c71bc",
            size: 0.7,
            x: 610,
            y: 83,
        },
    ],
    edges: [
        ["578abf9c-9bcc-44cc-92bd-ffc2ca7ba9ee", "7920747b-c41f-4dad-b95f-a98b96ff314b",],
        ["7920747b-c41f-4dad-b95f-a98b96ff314b", "ea186baa-4d56-4d4e-9d7d-532465681e39",],
        ["ea186baa-4d56-4d4e-9d7d-532465681e39", "4c29099d-cb97-4890-a458-bd7c89e908b9",],
        ["4c29099d-cb97-4890-a458-bd7c89e908b9", "2cea62ef-73e8-4572-8bc1-ea954ae0f538",],
        ["2cea62ef-73e8-4572-8bc1-ea954ae0f538", "8645f4e7-2e5b-4985-be85-f4f304738d9f",],
        ["8645f4e7-2e5b-4985-be85-f4f304738d9f", "5cfa10e7-f8ca-411b-a263-6e117c7c71bc",],
    ],
    image: goatImage,
    width: 798,
    height: 656
}

export const allConstellations: Constellation[] = [
    girlConstellation,
    squirrelConstellation,
    goatConstellation,
]
