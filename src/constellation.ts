import girlImage from "./image/girl-braid.png";
import squirrelImage from "./image/squirrel.png";
import goatImage from "./image/goat.png";
import fistImage from "./image/fist.png";
import pineappleImage from "./image/pineapple.png";
import Flatten from "@flatten-js/core";

export interface Star {
  id: string;
  position: Flatten.Point;
  size: number;
}

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
  convexHull: Flatten.Point[];
}

export function constellationIsComplete(
  constellation: Constellation,
  edges: ConstellationEdge[]
): boolean {
  const starIdSet = new Set(constellation.stars.map(({ id }) => id));
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

function hull(points: Flatten.Point[]) {
  const polygon = new Flatten.Polygon();
  polygon.addFace(points);
  return polygon;
}

export const girlConstellation: Constellation = {
  id: "92c9bab9-6501-4b71-be1b-1051bbcfc5ff",
  name: "Braided girl",
  stars: [
    {
      id: "f85bbe21-4c03-4c4c-b634-bcc039935ada",
      position: new Flatten.Point(117, 704),
      size: 1,
    },
    {
      id: "2bf96bdf-5abf-4b92-bcd5-0893b608f497",
      position: new Flatten.Point(159, 542),
      size: 0.4,
    },
    {
      id: "e0606859-a899-4a55-ac89-3571c6ac789c",
      position: new Flatten.Point(112, 427),
      size: 0.6,
    },
    {
      id: "0c21a1a7-3a26-44df-bd65-cf1d4cecec65",
      position: new Flatten.Point(135, 149),
      size: 0.9,
    },
    {
      id: "9a468283-f31d-462d-8d0b-387f84f48788",
      position: new Flatten.Point(313, 112),
      size: 1,
    },
    {
      id: "1e36799c-2d15-4a20-937b-06350724640a",
      position: new Flatten.Point(250, 449),
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
  convexHull: [
    new Flatten.Point(239, 0),
    new Flatten.Point(260, 0),
    new Flatten.Point(268, 1),
    new Flatten.Point(275, 2),
    new Flatten.Point(281, 3),
    new Flatten.Point(299, 7),
    new Flatten.Point(311, 11),
    new Flatten.Point(317, 15),
    new Flatten.Point(354, 42),
    new Flatten.Point(364, 50),
    new Flatten.Point(366, 52),
    new Flatten.Point(379, 67),
    new Flatten.Point(411, 115),
    new Flatten.Point(418, 129),
    new Flatten.Point(420, 134),
    new Flatten.Point(423, 142),
    new Flatten.Point(424, 147),
    new Flatten.Point(429, 278),
    new Flatten.Point(429, 527),
    new Flatten.Point(395, 587),
    new Flatten.Point(366, 616),
    new Flatten.Point(161, 797),
    new Flatten.Point(100, 797),
    new Flatten.Point(81, 761),
    new Flatten.Point(77, 753),
    new Flatten.Point(76, 749),
    new Flatten.Point(74, 740),
    new Flatten.Point(0, 386),
    new Flatten.Point(0, 381),
    new Flatten.Point(50, 162),
    new Flatten.Point(51, 158),
    new Flatten.Point(58, 135),
    new Flatten.Point(60, 129),
    new Flatten.Point(62, 124),
    new Flatten.Point(67, 112),
    new Flatten.Point(73, 101),
    new Flatten.Point(77, 94),
    new Flatten.Point(92, 71),
    new Flatten.Point(96, 65),
    new Flatten.Point(100, 60),
    new Flatten.Point(103, 57),
    new Flatten.Point(119, 43),
    new Flatten.Point(131, 35),
    new Flatten.Point(139, 30),
    new Flatten.Point(161, 19),
    new Flatten.Point(172, 15),
    new Flatten.Point(181, 12),
    new Flatten.Point(204, 6),
    new Flatten.Point(224, 2),
  ],
};

export const squirrelConstellation: Constellation = {
  id: "64c2ee79-40c0-43d2-9b2c-97df37150c34",
  name: "Squirrel",
  stars: [
    {
      id: "45a9a232-8deb-4fbd-99d8-807e9cef1775",
      position: new Flatten.Point(309, 426),
      size: 0.3,
    },
    {
      id: "7c995c7d-f930-4628-9512-8fbe4b9bb06a",
      position: new Flatten.Point(331, 525),
      size: 0.6,
    },
    {
      id: "69268240-c532-488a-902a-604a6e894bb9",
      position: new Flatten.Point(140, 487),
      size: 0.4,
    },
    {
      id: "cc6c2ca1-02d0-483b-accd-687277dd3693",
      position: new Flatten.Point(109, 352),
      size: 0.6,
    },
    {
      id: "5fcc522b-5501-4be4-b9c6-6e39a857918c",
      position: new Flatten.Point(204, 196),
      size: 0.9,
    },
    {
      id: "ce314ece-5a20-47d5-9f88-2ced4d8018c1",
      position: new Flatten.Point(54, 97),
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
  convexHull: [
    new Flatten.Point(155, 0),
    new Flatten.Point(215, 14),
    new Flatten.Point(256, 39),
    new Flatten.Point(293, 72),
    new Flatten.Point(547, 539),
    new Flatten.Point(553, 552),
    new Flatten.Point(541, 673),
    new Flatten.Point(534, 727),
    new Flatten.Point(478, 738),
    new Flatten.Point(69, 713),
    new Flatten.Point(23, 701),
    new Flatten.Point(22, 676),
    new Flatten.Point(0, 119),
    new Flatten.Point(57, 20),
    new Flatten.Point(61, 14),
    new Flatten.Point(82, 10),
  ],
};

export const goatConstellation: Constellation = {
  id: "ef1882e7-fbf9-4b2e-b58f-ba55b490a65c",
  name: "The goat",
  stars: [
    {
      id: "578abf9c-9bcc-44cc-92bd-ffc2ca7ba9ee",
      size: 0.2,
      position: new Flatten.Point(381, 313),
    },
    {
      id: "7920747b-c41f-4dad-b95f-a98b96ff314b",
      size: 0.6,
      position: new Flatten.Point(250, 352),
    },
    {
      id: "ea186baa-4d56-4d4e-9d7d-532465681e39",
      size: 0.5,
      position: new Flatten.Point(187, 191),
    },
    {
      id: "4c29099d-cb97-4890-a458-bd7c89e908b9",
      size: 0.6,
      position: new Flatten.Point(325, 104),
    },
    {
      id: "2cea62ef-73e8-4572-8bc1-ea954ae0f538",
      size: 0.4,
      position: new Flatten.Point(473, 173),
    },
    {
      id: "8645f4e7-2e5b-4985-be85-f4f304738d9f",
      size: 0.9,
      position: new Flatten.Point(576, 385),
    },
    {
      id: "5cfa10e7-f8ca-411b-a263-6e117c7c71bc",
      size: 0.7,
      position: new Flatten.Point(610, 83),
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
  convexHull: [
    new Flatten.Point(385, 20),
    new Flatten.Point(625, 35),
    new Flatten.Point(634, 36),
    new Flatten.Point(646, 38),
    new Flatten.Point(652, 41),
    new Flatten.Point(657, 45),
    new Flatten.Point(658, 46),
    new Flatten.Point(669, 58),
    new Flatten.Point(793, 315),
    new Flatten.Point(793, 319),
    new Flatten.Point(790, 327),
    new Flatten.Point(788, 330),
    new Flatten.Point(754, 370),
    new Flatten.Point(748, 377),
    new Flatten.Point(478, 590),
    new Flatten.Point(426, 621),
    new Flatten.Point(59, 655),
    new Flatten.Point(0, 655),
    new Flatten.Point(0, 654),
    new Flatten.Point(52, 350),
    new Flatten.Point(81, 275),
    new Flatten.Point(173, 91),
    new Flatten.Point(178, 83),
    new Flatten.Point(184, 75),
    new Flatten.Point(189, 69),
    new Flatten.Point(201, 57),
    new Flatten.Point(212, 47),
    new Flatten.Point(217, 43),
    new Flatten.Point(236, 32),
    new Flatten.Point(245, 27),
    new Flatten.Point(255, 23),
  ],
};

export const fistConstellation: Constellation = {
  id: "f80a0f5e-b28a-479c-be2b-153e7f737733",
  name: "The fist",
  stars: [
    {
      id: "e11f4541-72fb-4fd5-8aba-68335f4ffc78",
      size: 0.512,
      position: new Flatten.Point(212, 40),
    },
    {
      id: "7e3c27ca-7f9a-46e7-b37f-7aaa02fd55b7",
      size: 0.853,
      position: new Flatten.Point(159, 36),
    },
    {
      id: "2e0e4445-89b6-49d8-a9df-2ac40a0a7ca5",
      size: 0.468,
      position: new Flatten.Point(141, 119),
    },
    {
      id: "a22924bf-d038-43fd-9bb8-af658b9515c8",
      size: 0.239,
      position: new Flatten.Point(97, 136),
    },
    {
      id: "4d4578b8-4ea9-49fe-ad75-856c08945d43",
      size: 0.774,
      position: new Flatten.Point(112, 32),
    },
    {
      id: "07f8234a-5257-4993-bbef-9ead1ab807d1",
      size: 0.287,
      position: new Flatten.Point(71, 33),
    },
    {
      id: "08ec2f97-4eac-4234-81d0-88a383355892",
      size: 0.175,
      position: new Flatten.Point(26, 57),
    },
    {
      id: "839a1d11-06ec-4864-8c6c-18aff39ff15b",
      size: 0.466,
      position: new Flatten.Point(104, 88),
    },
    {
      id: "2e29ac21-357a-4991-a715-2d8eb8c42e09",
      size: 0.391,
      position: new Flatten.Point(65, 92),
    },
    {
      id: "4320c0e7-7f4d-4560-89f9-5fe50e8afe35",
      size: 0.369,
      position: new Flatten.Point(41, 100),
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
  convexHull: [
    new Flatten.Point(163, 0),
    new Flatten.Point(164, 0),
    new Flatten.Point(185, 3),
    new Flatten.Point(208, 7),
    new Flatten.Point(213, 8),
    new Flatten.Point(229, 12),
    new Flatten.Point(241, 23),
    new Flatten.Point(245, 29),
    new Flatten.Point(247, 33),
    new Flatten.Point(248, 37),
    new Flatten.Point(248, 48),
    new Flatten.Point(246, 65),
    new Flatten.Point(244, 77),
    new Flatten.Point(243, 80),
    new Flatten.Point(242, 82),
    new Flatten.Point(234, 95),
    new Flatten.Point(223, 101),
    new Flatten.Point(103, 164),
    new Flatten.Point(97, 165),
    new Flatten.Point(92, 165),
    new Flatten.Point(89, 164),
    new Flatten.Point(32, 137),
    new Flatten.Point(31, 136),
    new Flatten.Point(0, 84),
    new Flatten.Point(0, 56),
    new Flatten.Point(17, 38),
    new Flatten.Point(33, 27),
    new Flatten.Point(42, 22),
    new Flatten.Point(57, 14),
    new Flatten.Point(75, 6),
  ],
};

export const pineappleConstellation: Constellation = {
  id: "3bb79983-7c11-488d-83a8-e9d60d8dfc5c",
  name: "The pineapple",
  stars: [
    {
      id: "7223998c-4759-4094-b7ac-de0a582d77b7",
      size: 0.6,
      position: new Flatten.Point(295, 166),
    },
    {
      id: "a02725c1-1239-451a-b262-9504c0dbcf6e",
      size: 0.287,
      position: new Flatten.Point(211, 427),
    },
    {
      id: "90c45f36-c6cd-4e4d-ab73-0ff189c52b47",
      size: 0.933,
      position: new Flatten.Point(223, 634),
    },
    {
      id: "435fa866-e12a-467e-8511-eca6adb91a66",
      size: 0.815,
      position: new Flatten.Point(127, 747),
    },
    {
      id: "df4d77a8-6260-4c32-8621-9cd6d045ccb8",
      size: 0.289,
      position: new Flatten.Point(214, 850),
    },
    {
      id: "c28cdef3-84b0-4bf7-8dc3-72e18ac4c9e0",
      size: 0.299,
      position: new Flatten.Point(319, 712),
    },
    {
      id: "666947cd-b99e-49a3-9c94-2339bfb3341e",
      size: 0.591,
      position: new Flatten.Point(133, 313),
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
  convexHull: [
    new Flatten.Point(413, 0),
    new Flatten.Point(418, 0),
    new Flatten.Point(484, 101),
    new Flatten.Point(484, 104),
    new Flatten.Point(427, 635),
    new Flatten.Point(382, 880),
    new Flatten.Point(352, 926),
    new Flatten.Point(350, 928),
    new Flatten.Point(336, 938),
    new Flatten.Point(281, 945),
    new Flatten.Point(268, 946),
    new Flatten.Point(251, 947),
    new Flatten.Point(214, 948),
    new Flatten.Point(213, 948),
    new Flatten.Point(81, 936),
    new Flatten.Point(80, 935),
    new Flatten.Point(56, 828),
    new Flatten.Point(48, 791),
    new Flatten.Point(41, 726),
    new Flatten.Point(0, 292),
    new Flatten.Point(0, 291),
    new Flatten.Point(3, 183),
    new Flatten.Point(34, 35),
    new Flatten.Point(35, 34),
    new Flatten.Point(413, 0),
  ],
};

export const allConstellations: Constellation[] = [
  girlConstellation,
  squirrelConstellation,
  goatConstellation,
  fistConstellation,
  pineappleConstellation,
];
