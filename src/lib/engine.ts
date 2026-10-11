import type { GameState, Node, NodeRequest, Segment, StatKey, StatsState } from "./types";
import { clampMin0 } from "./statFormat";
import { COSMIC_FACTORS } from "../data/cosmic";

const STAT_NODE_TO_KEY: Record<string, StatKey> = {
  strength: "str",
  speed: "spd",
  durability: "dur",
  iq: "iq"
};

const STAT_LABEL_TO_TIER: Record<string, number> = {
  Mid: 0,
  "Peak Human": 1,
  Superhuman: 2,
  Herculean: 3,
  Cosmic: 4,
  Universal: 5,
  Transcendent: 6
};

export function initialStats(): StatsState {
  return {
    str: { base: null, bonus: 0 },
    spd: { base: null, bonus: 0 },
    dur: { base: null, bonus: 0 },
    iq: { base: null, bonus: 0 }
  };
}

export function makeInitialQueue(): NodeRequest[] {
  return [
    { nodeId: "race" },

    { nodeId: "strength" },
    { nodeId: "speed" },
    { nodeId: "durability" },
    { nodeId: "iq" },

    { nodeId: "weapon" },
    { nodeId: "weapon_mastery" },
    { nodeId: "enchantment" },
    { nodeId: "extra_power" },
    { nodeId: "power_mastery" },

    { nodeId: "cosmic_factors" },
    { nodeId: "cosmic_force" },
    { nodeId: "weakness" },

    { nodeId: "summary" }
  ];
}

export function getNodeForRequest(nodes: Record<string, Node>, req: NodeRequest): Node {
  if (
    req.nodeId === "hybrid_race_a" ||
    req.nodeId === "hybrid_race_b" ||
    req.nodeId === "symbiote_host_race"
  ) {
    const base = nodes["race"];
    return { ...nodes[req.nodeId], segments: base.segments };
  }
  return nodes[req.nodeId];
}

export function applyFilters(node: Node, req: NodeRequest): Node {
  const exclude = new Set(req.filters?.excludeLabels ?? []);
  if (exclude.size === 0) return node;
  return { ...node, segments: node.segments.filter((s) => !exclude.has(s.label)) };
}

function logStatChange(state: GameState, reason: string, changes: Partial<Record<StatKey, number>>) {
  state.effectsLog.push({ reason, changes });
}

function addStatBonus(state: GameState, stat: StatKey, delta: number, reason: string) {
  state.stats[stat].bonus += delta;
  logStatChange(state, reason, { [stat]: delta });
}

function setBaseTierFromLabel(state: GameState, nodeId: string, choiceLabel: string) {
  const statKey = STAT_NODE_TO_KEY[nodeId];
  if (!statKey) return;
  const tier = STAT_LABEL_TO_TIER[choiceLabel];
  if (tier === undefined) return;
  state.stats[statKey].base = tier;
}

export function applySymbioteTakeoverBuff(state: GameState, pct: number) {
  if (pct >= 30 && pct <= 59) {
    addStatBonus(state, "str", 1, "Symbiote Takeover (minor)");
    return;
  }
  if (pct >= 60 && pct <= 89) {
    addStatBonus(state, "str", 1, "Symbiote Takeover (strong)");
    addStatBonus(state, "dur", 1, "Symbiote Takeover (strong)");
    return;
  }
  if (pct >= 90 && pct <= 99) {
    addStatBonus(state, "str", 2, "Symbiote Takeover (extreme)");
    addStatBonus(state, "spd", 1, "Symbiote Takeover (extreme)");
    return;
  }
  if (pct >= 100) {
    addStatBonus(state, "str", 2, "Symbiote Takeover (total)");
    addStatBonus(state, "dur", 2, "Symbiote Takeover (total)");
    addStatBonus(state, "iq", -1, "Symbiote Takeover (total cost)");
  }
}

export function applyEffects(state: GameState, effects: NonNullable<Segment["effects"]>, rnd: () => number) {
  for (const e of effects) {
    if (e.type === "stat") {
      addStatBonus(state, e.stat, e.delta, e.reason);
    } else if (e.type === "statRandom") {
      const idx = Math.floor(rnd() * e.choices.length);
      const stat = e.choices[Math.max(0, Math.min(e.choices.length - 1, idx))];
      addStatBonus(state, stat, e.delta, e.reason);
    } else if (e.type === "tag") {
      state.effectsLog.push({ reason: e.reason, changes: {} });
    } else if (e.type === "insert") {
      state.queue = [state.queue[0], ...e.nodes, ...state.queue.slice(1)];
    } else if (e.type === "setPendingCosmicFactor") {
      state.pendingCosmicFactorId = e.factorId;
    } else if (e.type === "applyPendingCosmicBlessing") {
      const id = state.pendingCosmicFactorId;
      if (!id) continue;
      const factor = COSMIC_FACTORS[id];
      if (!factor) continue;

      for (const be of factor.baseEffects) {
        if ("stat" in be) {
          addStatBonus(
            state,
            be.stat,
            be.delta * e.intensity,
            `Cosmic Blessing: ${factor.label} × ${e.forceLabel}`
          );
        } else {
          const idx = Math.floor(rnd() * be.random.length);
          const stat = be.random[Math.max(0, Math.min(be.random.length - 1, idx))];
          addStatBonus(
            state,
            stat,
            be.delta * e.intensity,
            `Cosmic Blessing: ${factor.label} × ${e.forceLabel}`
          );
        }
      }
      state.pendingCosmicFactorId = null;
    }
  }
}

export function reduceAfterChoice(
  state: GameState,
  currentReq: NodeRequest,
  currentNode: Node,
  chosen: Segment,
  racePaths: Record<string, string[]>,
  rnd: () => number
) {
  state.results.push({ nodeId: currentNode.id, nodeLabel: currentNode.label, choice: chosen.label });

  setBaseTierFromLabel(state, currentNode.id, chosen.label);

  if (chosen.effects?.length) applyEffects(state, chosen.effects, rnd);

  if (currentNode.id === "race") {
    if (chosen.label === "Hybrid") {
      state.hybridA = null;
      state.queue = [
        state.queue[0],
        { nodeId: "hybrid_race_a", filters: { excludeLabels: ["Hybrid", "Symbiotic"] } },
        ...state.queue.slice(1)
      ];
      return;
    }

    if (chosen.label === "Symbiotic") {
      state.queue = [
        state.queue[0],
        { nodeId: "symbiote_takeover" },
        { nodeId: "symbiote_host_race", filters: { excludeLabels: ["Hybrid", "Symbiotic"] } },
        ...state.queue.slice(1)
      ];
      return;
    }

    const paths = racePaths[chosen.label] ?? [];
    if (paths.length) {
      state.queue = [state.queue[0], ...paths.map((id) => ({ nodeId: id })), ...state.queue.slice(1)];
    }
    return;
  }

  if (currentNode.id === "hybrid_race_a") {
    state.hybridA = chosen.label;
    state.queue = [
      state.queue[0],
      { nodeId: "hybrid_race_b", filters: { excludeLabels: ["Hybrid", "Symbiotic", chosen.label] } },
      ...state.queue.slice(1)
    ];
    return;
  }

  if (currentNode.id === "hybrid_race_b") {
    const a = state.hybridA;
    const b = chosen.label;

    const aPaths = a ? racePaths[a] ?? [] : [];
    const bPaths = racePaths[b] ?? [];

    const inserts: NodeRequest[] = [
      ...aPaths.map((id) => ({ nodeId: id })),
      ...bPaths.map((id) => ({ nodeId: id }))
    ];

    if (inserts.length) {
      state.queue = [state.queue[0], ...inserts, ...state.queue.slice(1)];
    }
    return;
  }

  if (currentNode.id === "symbiote_takeover") {
    const pct = parseInt(chosen.label.replace("%", ""), 10);
    if (!Number.isNaN(pct)) applySymbioteTakeoverBuff(state, pct);
    return;
  }

  if (currentNode.id === "symbiote_host_race") {
    const host = chosen.label;
    const paths = racePaths[host] ?? [];
    if (paths.length) {
      state.queue = [state.queue[0], ...paths.map((id) => ({ nodeId: id })), ...state.queue.slice(1)];
    }
    return;
  }
}

export function finalizeStats(state: GameState) {
  (Object.keys(state.stats) as StatKey[]).forEach((k) => {
    const base = state.stats[k].base ?? 0;
    const bonus = state.stats[k].bonus;
    const _final = clampMin0(base + bonus);
    void _final;
  });
}
