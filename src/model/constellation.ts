import girlImage from "./image/girl-braid.png";
import squirrelImage from "./image/squirrel.png";
import goatImage from "./image/goat.png";
import fistImage from "./image/fist.png";
import pineappleImage from "./image/pineapple.png";
import {Star} from "./star";
import {Polygon} from "../geometry/Polygon";

export type ConstellationEdge = [string, string];

export function edgeEquals(e1: ConstellationEdge, e2: ConstellationEdge) {
    return (
        (e1[0] === e2[0] && e1[1] === e2[1]) || (e1[0] === e2[1] && e1[1] === e2[0])
    );
}

export interface Constellation {
    id: string;
    name: string;
    stars: Star[];
    edges: ConstellationEdge[];
    image: string;
    width: number;
    height: number;
    convexHull: Polygon;
}

export function constellationIsComplete(
    constellation: Constellation,
    edges: ConstellationEdge[]
): boolean {
    const starIdSet = new Set(constellation.stars.map(({id}) => id));
    const edgesWithStar = edges.filter(
        ([id1, id2]) => starIdSet.has(id1) || starIdSet.has(id2)
    );
    if (edgesWithStar.length !== constellation.edges.length) {
        return false;
    }
    for (const correctEdge of constellation.edges) {
        if (!edgesWithStar.some((edge) => edgeEquals(edge, correctEdge))) {
            return false;
        }
    }
    for (const actualEdge of edgesWithStar) {
        if (!constellation.edges.some((edge) => edgeEquals(edge, actualEdge))) {
            return false;
        }
    }
    return true;
}

export const girlConstellation: Constellation = {
    id: "92c9bab9-6501-4b71-be1b-1051bbcfc5ff",
    name: "Braided girl",
    stars: [
        {
            id: "f85bbe21-4c03-4c4c-b634-bcc039935ada",
            position: {x: 117, y: 704},
            size: 1,
        },
        {
            id: "2bf96bdf-5abf-4b92-bcd5-0893b608f497",
            position: {x: 159, y: 542},
            size: 0.4,
        },
        {
            id: "e0606859-a899-4a55-ac89-3571c6ac789c",
            position: {x: 112, y: 427},
            size: 0.6,
        },
        {
            id: "0c21a1a7-3a26-44df-bd65-cf1d4cecec65",
            position: {x: 135, y: 149},
            size: 0.9,
        },
        {
            id: "9a468283-f31d-462d-8d0b-387f84f48788",
            position: {x: 313, y: 112},
            size: 1,
        },
        {
            id: "1e36799c-2d15-4a20-937b-06350724640a",
            position: {x: 250, y: 449},
            size: 0.8,
        },
    ],
    edges: [
        [
            "f85bbe21-4c03-4c4c-b634-bcc039935ada",
            "2bf96bdf-5abf-4b92-bcd5-0893b608f497",
        ],
        [
            "2bf96bdf-5abf-4b92-bcd5-0893b608f497",
            "e0606859-a899-4a55-ac89-3571c6ac789c",
        ],
        [
            "e0606859-a899-4a55-ac89-3571c6ac789c",
            "0c21a1a7-3a26-44df-bd65-cf1d4cecec65",
        ],
        [
            "0c21a1a7-3a26-44df-bd65-cf1d4cecec65",
            "9a468283-f31d-462d-8d0b-387f84f48788",
        ],
        [
            "9a468283-f31d-462d-8d0b-387f84f48788",
            "1e36799c-2d15-4a20-937b-06350724640a",
        ],
        [
            "1e36799c-2d15-4a20-937b-06350724640a",
            "0c21a1a7-3a26-44df-bd65-cf1d4cecec65",
        ],
    ],
    image: girlImage,
    width: 430,
    height: 798,
    convexHull: {
        points: [
            {x: 239, y: 0},
            {x: 260, y: 0},
            {x: 268, y: 1},
            {x: 275, y: 2},
            {x: 281, y: 3},
            {x: 299, y: 7},
            {x: 311, y: 11},
            {x: 317, y: 15},
            {x: 354, y: 42},
            {x: 364, y: 50},
            {x: 366, y: 52},
            {x: 379, y: 67},
            {x: 411, y: 115},
            {x: 418, y: 129},
            {x: 420, y: 134},
            {x: 423, y: 142},
            {x: 424, y: 147},
            {x: 429, y: 278},
            {x: 429, y: 527},
            {x: 395, y: 587},
            {x: 366, y: 616},
            {x: 161, y: 797},
            {x: 100, y: 797},
            {x: 81, y: 761},
            {x: 77, y: 753},
            {x: 76, y: 749},
            {x: 74, y: 740},
            {x: 0, y: 386},
            {x: 0, y: 381},
            {x: 50, y: 162},
            {x: 51, y: 158},
            {x: 58, y: 135},
            {x: 60, y: 129},
            {x: 62, y: 124},
            {x: 67, y: 112},
            {x: 73, y: 101},
            {x: 77, y: 94},
            {x: 92, y: 71},
            {x: 96, y: 65},
            {x: 100, y: 60},
            {x: 103, y: 57},
            {x: 119, y: 43},
            {x: 131, y: 35},
            {x: 139, y: 30},
            {x: 161, y: 19},
            {x: 172, y: 15},
            {x: 181, y: 12},
            {x: 204, y: 6},
            {x: 224, y: 2},
        ],
    }
};

export const squirrelConstellation: Constellation = {
    id: "64c2ee79-40c0-43d2-9b2c-97df37150c34",
    name: "Squirrel",
    stars: [
        {
            id: "45a9a232-8deb-4fbd-99d8-807e9cef1775",
            position: {x: 309, y: 426},
            size: 0.3,
        },
        {
            id: "7c995c7d-f930-4628-9512-8fbe4b9bb06a",
            position: {x: 331, y: 525},
            size: 0.6,
        },
        {
            id: "69268240-c532-488a-902a-604a6e894bb9",
            position: {x: 140, y: 487},
            size: 0.4,
        },
        {
            id: "cc6c2ca1-02d0-483b-accd-687277dd3693",
            position: {x: 109, y: 352},
            size: 0.6,
        },
        {
            id: "5fcc522b-5501-4be4-b9c6-6e39a857918c",
            position: {x: 204, y: 196},
            size: 0.9,
        },
        {
            id: "ce314ece-5a20-47d5-9f88-2ced4d8018c1",
            position: {x: 54, y: 97},
            size: 0.4,
        },
    ],
    edges: [
        [
            "45a9a232-8deb-4fbd-99d8-807e9cef1775",
            "7c995c7d-f930-4628-9512-8fbe4b9bb06a",
        ],
        [
            "45a9a232-8deb-4fbd-99d8-807e9cef1775",
            "69268240-c532-488a-902a-604a6e894bb9",
        ],
        [
            "7c995c7d-f930-4628-9512-8fbe4b9bb06a",
            "69268240-c532-488a-902a-604a6e894bb9",
        ],
        [
            "69268240-c532-488a-902a-604a6e894bb9",
            "cc6c2ca1-02d0-483b-accd-687277dd3693",
        ],
        [
            "cc6c2ca1-02d0-483b-accd-687277dd3693",
            "5fcc522b-5501-4be4-b9c6-6e39a857918c",
        ],
        [
            "5fcc522b-5501-4be4-b9c6-6e39a857918c",
            "ce314ece-5a20-47d5-9f88-2ced4d8018c1",
        ],
    ],
    image: squirrelImage,
    width: 554,
    height: 739,
    convexHull: {
        points: [
            {x: 155, y: 0},
            {x: 215, y: 14},
            {x: 256, y: 39},
            {x: 293, y: 72},
            {x: 547, y: 539},
            {x: 553, y: 552},
            {x: 541, y: 673},
            {x: 534, y: 727},
            {x: 478, y: 738},
            {x: 69, y: 713},
            {x: 23, y: 701},
            {x: 22, y: 676},
            {x: 0, y: 119},
            {x: 57, y: 20},
            {x: 61, y: 14},
            {x: 82, y: 10},
        ],
    }
};

export const goatConstellation: Constellation = {
    id: "ef1882e7-fbf9-4b2e-b58f-ba55b490a65c",
    name: "The goat",
    stars: [
        {
            id: "578abf9c-9bcc-44cc-92bd-ffc2ca7ba9ee",
            size: 0.2,
            position: {x: 381, y: 313},
        },
        {
            id: "7920747b-c41f-4dad-b95f-a98b96ff314b",
            size: 0.6,
            position: {x: 250, y: 352},
        },
        {
            id: "ea186baa-4d56-4d4e-9d7d-532465681e39",
            size: 0.5,
            position: {x: 187, y: 191},
        },
        {
            id: "4c29099d-cb97-4890-a458-bd7c89e908b9",
            size: 0.6,
            position: {x: 325, y: 104},
        },
        {
            id: "2cea62ef-73e8-4572-8bc1-ea954ae0f538",
            size: 0.4,
            position: {x: 473, y: 173},
        },
        {
            id: "8645f4e7-2e5b-4985-be85-f4f304738d9f",
            size: 0.9,
            position: {x: 576, y: 385},
        },
        {
            id: "5cfa10e7-f8ca-411b-a263-6e117c7c71bc",
            size: 0.7,
            position: {x: 610, y: 83},
        },
    ],
    edges: [
        [
            "578abf9c-9bcc-44cc-92bd-ffc2ca7ba9ee",
            "7920747b-c41f-4dad-b95f-a98b96ff314b",
        ],
        [
            "7920747b-c41f-4dad-b95f-a98b96ff314b",
            "ea186baa-4d56-4d4e-9d7d-532465681e39",
        ],
        [
            "ea186baa-4d56-4d4e-9d7d-532465681e39",
            "4c29099d-cb97-4890-a458-bd7c89e908b9",
        ],
        [
            "4c29099d-cb97-4890-a458-bd7c89e908b9",
            "2cea62ef-73e8-4572-8bc1-ea954ae0f538",
        ],
        [
            "2cea62ef-73e8-4572-8bc1-ea954ae0f538",
            "8645f4e7-2e5b-4985-be85-f4f304738d9f",
        ],
        [
            "8645f4e7-2e5b-4985-be85-f4f304738d9f",
            "5cfa10e7-f8ca-411b-a263-6e117c7c71bc",
        ],
    ],
    image: goatImage,
    width: 798,
    height: 656,
    convexHull: {
        points: [
            {x: 385, y: 20},
            {x: 625, y: 35},
            {x: 634, y: 36},
            {x: 646, y: 38},
            {x: 652, y: 41},
            {x: 657, y: 45},
            {x: 658, y: 46},
            {x: 669, y: 58},
            {x: 793, y: 315},
            {x: 793, y: 319},
            {x: 790, y: 327},
            {x: 788, y: 330},
            {x: 754, y: 370},
            {x: 748, y: 377},
            {x: 478, y: 590},
            {x: 426, y: 621},
            {x: 59, y: 655},
            {x: 0, y: 655},
            {x: 0, y: 654},
            {x: 52, y: 350},
            {x: 81, y: 275},
            {x: 173, y: 91},
            {x: 178, y: 83},
            {x: 184, y: 75},
            {x: 189, y: 69},
            {x: 201, y: 57},
            {x: 212, y: 47},
            {x: 217, y: 43},
            {x: 236, y: 32},
            {x: 245, y: 27},
            {x: 255, y: 23},
        ],
    }
};

export const fistConstellation: Constellation = {
    id: "f80a0f5e-b28a-479c-be2b-153e7f737733",
    name: "The fist",
    stars: [
        {
            id: "e11f4541-72fb-4fd5-8aba-68335f4ffc78",
            size: 0.512,
            position: {x: 212, y: 40},
        },
        {
            id: "7e3c27ca-7f9a-46e7-b37f-7aaa02fd55b7",
            size: 0.853,
            position: {x: 159, y: 36},
        },
        {
            id: "2e0e4445-89b6-49d8-a9df-2ac40a0a7ca5",
            size: 0.468,
            position: {x: 141, y: 119},
        },
        {
            id: "a22924bf-d038-43fd-9bb8-af658b9515c8",
            size: 0.239,
            position: {x: 97, y: 136},
        },
        {
            id: "4d4578b8-4ea9-49fe-ad75-856c08945d43",
            size: 0.774,
            position: {x: 112, y: 32},
        },
        {
            id: "07f8234a-5257-4993-bbef-9ead1ab807d1",
            size: 0.287,
            position: {x: 71, y: 33},
        },
        {
            id: "08ec2f97-4eac-4234-81d0-88a383355892",
            size: 0.175,
            position: {x: 26, y: 57},
        },
        {
            id: "839a1d11-06ec-4864-8c6c-18aff39ff15b",
            size: 0.466,
            position: {x: 104, y: 88},
        },
        {
            id: "2e29ac21-357a-4991-a715-2d8eb8c42e09",
            size: 0.391,
            position: {x: 65, y: 92},
        },
        {
            id: "4320c0e7-7f4d-4560-89f9-5fe50e8afe35",
            size: 0.369,
            position: {x: 41, y: 100},
        },
    ],
    edges: [
        [
            "e11f4541-72fb-4fd5-8aba-68335f4ffc78",
            "7e3c27ca-7f9a-46e7-b37f-7aaa02fd55b7",
        ],
        [
            "7e3c27ca-7f9a-46e7-b37f-7aaa02fd55b7",
            "2e0e4445-89b6-49d8-a9df-2ac40a0a7ca5",
        ],
        [
            "2e0e4445-89b6-49d8-a9df-2ac40a0a7ca5",
            "a22924bf-d038-43fd-9bb8-af658b9515c8",
        ],
        [
            "7e3c27ca-7f9a-46e7-b37f-7aaa02fd55b7",
            "4d4578b8-4ea9-49fe-ad75-856c08945d43",
        ],
        [
            "4d4578b8-4ea9-49fe-ad75-856c08945d43",
            "07f8234a-5257-4993-bbef-9ead1ab807d1",
        ],
        [
            "07f8234a-5257-4993-bbef-9ead1ab807d1",
            "08ec2f97-4eac-4234-81d0-88a383355892",
        ],
        [
            "4d4578b8-4ea9-49fe-ad75-856c08945d43",
            "839a1d11-06ec-4864-8c6c-18aff39ff15b",
        ],
        [
            "07f8234a-5257-4993-bbef-9ead1ab807d1",
            "2e29ac21-357a-4991-a715-2d8eb8c42e09",
        ],
        [
            "08ec2f97-4eac-4234-81d0-88a383355892",
            "4320c0e7-7f4d-4560-89f9-5fe50e8afe35",
        ],
    ],
    image: fistImage,
    width: 249,
    height: 166,
    convexHull: {
        points: [
            {x: 163, y: 0},
            {x: 164, y: 0},
            {x: 185, y: 3},
            {x: 208, y: 7},
            {x: 213, y: 8},
            {x: 229, y: 12},
            {x: 241, y: 23},
            {x: 245, y: 29},
            {x: 247, y: 33},
            {x: 248, y: 37},
            {x: 248, y: 48},
            {x: 246, y: 65},
            {x: 244, y: 77},
            {x: 243, y: 80},
            {x: 242, y: 82},
            {x: 234, y: 95},
            {x: 223, y: 101},
            {x: 103, y: 164},
            {x: 97, y: 165},
            {x: 92, y: 165},
            {x: 89, y: 164},
            {x: 32, y: 137},
            {x: 31, y: 136},
            {x: 0, y: 84},
            {x: 0, y: 56},
            {x: 17, y: 38},
            {x: 33, y: 27},
            {x: 42, y: 22},
            {x: 57, y: 14},
            {x: 75, y: 6},
        ],
    }
};

export const pineappleConstellation: Constellation = {
    id: "3bb79983-7c11-488d-83a8-e9d60d8dfc5c",
    name: "The pineapple",
    stars: [
        {
            id: "7223998c-4759-4094-b7ac-de0a582d77b7",
            size: 0.6,
            position: {x: 295, y: 166},
        },
        {
            id: "a02725c1-1239-451a-b262-9504c0dbcf6e",
            size: 0.287,
            position: {x: 211, y: 427},
        },
        {
            id: "90c45f36-c6cd-4e4d-ab73-0ff189c52b47",
            size: 0.933,
            position: {x: 223, y: 634},
        },
        {
            id: "435fa866-e12a-467e-8511-eca6adb91a66",
            size: 0.815,
            position: {x: 127, y: 747},
        },
        {
            id: "df4d77a8-6260-4c32-8621-9cd6d045ccb8",
            size: 0.289,
            position: {x: 214, y: 850},
        },
        {
            id: "c28cdef3-84b0-4bf7-8dc3-72e18ac4c9e0",
            size: 0.299,
            position: {x: 319, y: 712},
        },
        {
            id: "666947cd-b99e-49a3-9c94-2339bfb3341e",
            size: 0.591,
            position: {x: 133, y: 313},
        },
    ],
    edges: [
        [
            "7223998c-4759-4094-b7ac-de0a582d77b7",
            "a02725c1-1239-451a-b262-9504c0dbcf6e",
        ],
        [
            "a02725c1-1239-451a-b262-9504c0dbcf6e",
            "90c45f36-c6cd-4e4d-ab73-0ff189c52b47",
        ],
        [
            "90c45f36-c6cd-4e4d-ab73-0ff189c52b47",
            "435fa866-e12a-467e-8511-eca6adb91a66",
        ],
        [
            "435fa866-e12a-467e-8511-eca6adb91a66",
            "df4d77a8-6260-4c32-8621-9cd6d045ccb8",
        ],
        [
            "df4d77a8-6260-4c32-8621-9cd6d045ccb8",
            "c28cdef3-84b0-4bf7-8dc3-72e18ac4c9e0",
        ],
        [
            "c28cdef3-84b0-4bf7-8dc3-72e18ac4c9e0",
            "90c45f36-c6cd-4e4d-ab73-0ff189c52b47",
        ],
        [
            "666947cd-b99e-49a3-9c94-2339bfb3341e",
            "a02725c1-1239-451a-b262-9504c0dbcf6e",
        ],
    ],
    image: pineappleImage,
    width: 485,
    height: 949,
    convexHull: {
        points: [
            {x: 413, y: 0},
            {x: 418, y: 0},
            {x: 484, y: 101},
            {x: 484, y: 104},
            {x: 427, y: 635},
            {x: 382, y: 880},
            {x: 352, y: 926},
            {x: 350, y: 928},
            {x: 336, y: 938},
            {x: 281, y: 945},
            {x: 268, y: 946},
            {x: 251, y: 947},
            {x: 214, y: 948},
            {x: 213, y: 948},
            {x: 81, y: 936},
            {x: 80, y: 935},
            {x: 56, y: 828},
            {x: 48, y: 791},
            {x: 41, y: 726},
            {x: 0, y: 292},
            {x: 0, y: 291},
            {x: 3, y: 183},
            {x: 34, y: 35},
            {x: 35, y: 34},
            {x: 413, y: 0},
        ],
    }
};

export const allConstellations: Constellation[] = [
    girlConstellation,
    squirrelConstellation,
    goatConstellation,
    fistConstellation,
    pineappleConstellation,
];
