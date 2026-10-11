import type { StatKey } from "../lib/types";

export type CosmicFactor = {
  id: string;
  label: string;
  baseEffects: Array<
    | { stat: StatKey; delta: number }
    | { random: StatKey[]; delta: number }
  >;
};

export const COSMIC_FACTORS: Record<string, CosmicFactor> = {
  creators_favor: {
    id: "creators_favor",
    label: "Creator's Favor",
    baseEffects: [
      { stat: "str", delta: 1 },
      { stat: "dur", delta: 1 }
    ]
  },
  cosmic_veil: {
    id: "cosmic_veil",
    label: "Cosmic Veil",
    baseEffects: [
      { stat: "spd", delta: 1 },
      { stat: "iq", delta: 1 }
    ]
  },
  celestial_insight: {
    id: "celestial_insight",
    label: "Celestial Insight",
    baseEffects: [{ stat: "iq", delta: 2 }]
  },
  ethereal_pulse: {
    id: "ethereal_pulse",
    label: "Ethereal Pulse",
    baseEffects: [{ stat: "spd", delta: 2 }]
  },
  unbreakable_will: {
    id: "unbreakable_will",
    label: "Unbreakable Will",
    baseEffects: [{ stat: "dur", delta: 2 }]
  },
  mentor: {
    id: "mentor",
    label: "Mentor",
    baseEffects: [
      { stat: "iq", delta: 1 },
      { stat: "spd", delta: 1 }
    ]
  },
  gods_gift: {
    id: "gods_gift",
    label: "God's Gift",
    baseEffects: [{ random: ["str", "spd", "dur", "iq"], delta: 2 }]
  },
  warrior_pride: {
    id: "warrior_pride",
    label: "Warrior's Pride",
    baseEffects: [{ stat: "str", delta: 2 }]
  },
  titan_resolve: {
    id: "titan_resolve",
    label: "Titan's Resolve",
    baseEffects: [
      { stat: "dur", delta: 1 },
      { stat: "str", delta: 1 }
    ]
  }
};
