export type StatKey = "str" | "spd" | "dur" | "iq";

export type Effect =
  | { type: "stat"; stat: StatKey; delta: number; reason: string }
  | { type: "statRandom"; choices: StatKey[]; delta: number; reason: string }
  | { type: "tag"; tag: string; reason: string }
  | {
      type: "insert";
      nodes: Array<{ nodeId: string; filters?: { excludeLabels?: string[] } }>;
    }
  | { type: "setPendingCosmicFactor"; factorId: string }
  | { type: "applyPendingCosmicBlessing"; intensity: number; forceLabel: string };

export type Segment = {
  label: string;
  weight?: number;
  effects?: Effect[];
};

export type Theme = "red" | "blue" | "purple" | "teal" | "gold" | "gray";

export type Node = {
  id: string;
  label: string;
  icon: string;
  theme: Theme;
  segments: Segment[];
};

export type NodeRequest = {
  nodeId: string;
  filters?: { excludeLabels?: string[] };
};

export type ResultRow = {
  nodeId: string;
  nodeLabel: string;
  choice: string;
};

export type StatsState = Record<StatKey, { base: number | null; bonus: number }>;

export type GameState = {
  queue: NodeRequest[];
  results: ResultRow[];
  spinning: boolean;
  spunCurrent: boolean;

  stats: StatsState;

  pendingCosmicFactorId: string | null;

  hybridA: string | null;

  effectsLog: Array<{ reason: string; changes: Partial<Record<StatKey, number>> }>;
};
