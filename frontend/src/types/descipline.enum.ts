export const Discipline = {
  SURF: "SURF",
  SKATE: "SKATE",
} as const;

export type Discipline = (typeof Discipline)[keyof typeof Discipline];
