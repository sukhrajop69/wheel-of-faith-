import html2canvas from "html2canvas";
import type { GameState } from "../lib/types";
import { tierLabel } from "../lib/statFormat";

function finalTier(base: number | null, bonus: number) {
  const b = base ?? 0;
  return Math.max(0, b + bonus);
}

function pickFirst(state: GameState, nodeId: string) {
  return state.results.find((r) => r.nodeId === nodeId)?.choice ?? null;
}

function pickMany(state: GameState, nodeIds: string[]) {
  return nodeIds
    .map((id) => state.results.find((r) => r.nodeId === id)?.choice)
    .filter(Boolean) as string[];
}

function buildTitle(state: GameState) {
  const race =
    pickFirst(state, "race") ||
    pickFirst(state, "hybrid_race_a") ||
    "Unknown";

  if (race === "Hybrid") {
    const a = pickFirst(state, "hybrid_race_a");
    const b = pickFirst(state, "hybrid_race_b");
    if (a && b) return `Hybrid (${a} + ${b})`;
    return "Hybrid";
  }
  if (race === "Symbiotic") {
    const host = pickFirst(state, "symbiote_host_race");
    if (host) return `Symbiotic (Host: ${host})`;
    return "Symbiotic";
  }
  return race;
}

async function canvasToFile(canvas: HTMLCanvasElement) {
  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png")
  );
  if (!blob) return null;
  return new File([blob], "wheel-of-fate-character.png", { type: "image/png" });
}

export default function Summary({
  state,
  onReset
}: {
  state: GameState;
  onReset: () => void;
}) {
  const stats = state.stats;

  const title = buildTitle(state);
  const weapon = pickFirst(state, "weapon");
  const mastery = pickFirst(state, "weapon_mastery");
  const enchant = pickFirst(state, "enchantment");
  const extraPower = pickFirst(state, "extra_power");
  const powerMastery = pickFirst(state, "power_mastery");
  const cosmicFactor = pickFirst(state, "cosmic_factors");
  const cosmicForce = pickFirst(state, "cosmic_force");
  const weakness = pickFirst(state, "weakness");

  const notablePaths = pickMany(state, [
    "human_origin",
    "elf_origin",
    "elf_rizz",
    "elf_ability",
    "dwarf_ability",
    "orc_role",
    "fey_powers",
    "elemental_calamity",
    "dryad_origin",
    "giant_domain",
    "goblin_group_size",
    "goblin_position",
    "golem_material",
    "hivemind_type",
    "merfolk_subrace",
    "werebeast_form",
    "vampire_souls",
    "mythical_beast_type",
    "animorph_mastery",
    "cyborg_tech",
    "cyborg_integration",
    "angel_order",
    "angel_abilities",
    "demon_gift",
    "devil_sin",
    "dragonslayer_rank",
    "dragonslayer_weapon",
    "reincarnation_identity",
    "spirit_pact",
    "cosmic_conquest",
    "demigod_class",
    "demigod_lineage",
    "god_type",
    "god_power",
    "primordial_power",
    "titan_domain",
    "titan_vow",
    "beastfolk_aspect",
    "beastfolk_instinct",
    "dragon_type",
    "siren_song",
    "android_model",
    "centaur_crest",
    "genie_element",
    "symbiote_takeover",
    "symbiote_host_race",
    "hybrid_race_a",
    "hybrid_race_b"
  ]);

  async function copyResults() {
    const lines = state.results.map((r) => `${r.nodeLabel}: ${r.choice}`);
    const s =
      lines.join("\n") +
      `\n\nStats:\n` +
      `STR: ${tierLabel(finalTier(stats.str.base, stats.str.bonus))}\n` +
      `SPD: ${tierLabel(finalTier(stats.spd.base, stats.spd.bonus))}\n` +
      `DUR: ${tierLabel(finalTier(stats.dur.base, stats.dur.bonus))}\n` +
      `IQ: ${tierLabel(finalTier(stats.iq.base, stats.iq.bonus))}\n`;

    await navigator.clipboard.writeText(s);
    alert("Copied!");
  }

  async function exportCardCanvas() {
    const el = document.getElementById("character-card");
    if (!el) return null;
    const canvas = await html2canvas(el, { backgroundColor: "#000", scale: 2 });
    return canvas;
  }

  async function downloadCard() {
    const canvas = await exportCardCanvas();
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "wheel-of-fate-character.png";
    a.click();
  }

  async function shareCard() {
    const canvas = await exportCardCanvas();
    if (!canvas) return;

    const file = await canvasToFile(canvas);
    if (!file) {
      await downloadCard();
      return;
    }

    const canShare =
  "canShare" in navigator &&
  typeof (navigator as any).canShare === "function" &&
  (navigator as any).canShare({ files: [file] });

if (canShare && navigator.share) {
  await navigator.share({
    title: "Wheel of Fate Character",
    text: `My roll: ${title}`,
    files: [file]
  });
} else {
  await downloadCard();
}
    
        title: "Wheel of Fate Character",
        text: `My roll: ${title}`,
        files: [file]
      });
    } else {
      await downloadCard();
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-5 py-10 gap-6">
      <div
        id="character-card"
        className="w-full max-w-md rounded-[28px] border border-white/10 bg-gradient-to-b from-zinc-950 to-black p-5 shadow-[0_0_40px_rgba(255,255,255,0.04)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs text-white/60">WHEEL OF FATE</div>
            <div className="text-2xl font-extrabold tracking-tight mt-1">
              {title}
            </div>
            <div className="text-xs text-white/60 mt-1">
              Cosmic: {cosmicFactor ?? "—"} • {cosmicForce ?? "—"}
            </div>
          </div>

          <div className="text-xs text-white/60 text-right">
            <div>Weapon</div>
            <div className="text-white font-semibold">{weapon ?? "—"}</div>
            <div className="mt-1 text-white/80">{mastery ? `${mastery}` : ""}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-white/60 text-xs">Strength</div>
            <div className="text-lg font-bold">
              {tierLabel(finalTier(stats.str.base, stats.str.bonus))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-white/60 text-xs">Speed</div>
            <div className="text-lg font-bold">
              {tierLabel(finalTier(stats.spd.base, stats.spd.bonus))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-white/60 text-xs">Durability</div>
            <div className="text-lg font-bold">
              {tierLabel(finalTier(stats.dur.base, stats.dur.bonus))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-white/60 text-xs">IQ</div>
            <div className="text-lg font-bold">
              {tierLabel(finalTier(stats.iq.base, stats.iq.bonus))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-white/60 text-xs">Enchantment</div>
            <div className="font-semibold">{enchant ?? "—"}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-white/60 text-xs">Extra Power • Mastery</div>
            <div className="font-semibold">
              {extraPower ?? "—"}
              {powerMastery ? ` • ${powerMastery}` : ""}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-white/60 text-xs">Weakness</div>
            <div className="font-semibold">{weakness ?? "—"}</div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="text-white/60 text-xs mb-2">Key Paths</div>
          <div className="flex flex-wrap gap-2">
            {notablePaths.slice(0, 14).map((p, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-full bg-black/60 border border-white/10 text-white/80"
              >
                {p}
              </span>
            ))}
            {notablePaths.length > 14 && (
              <span className="text-xs px-2 py-1 rounded-full bg-black/60 border border-white/10 text-white/60">
                +{notablePaths.length - 14} more
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 text-[11px] text-white/40">
          Generated by Wheel of Fate • Luck-only roll
        </div>
      </div>

      <div className="w-full max-w-md flex gap-3">
        <button
          onClick={copyResults}
          className="flex-1 rounded-2xl bg-white text-black font-semibold py-3"
        >
          Copy Results
        </button>
        <button
          onClick={shareCard}
          className="flex-1 rounded-2xl bg-zinc-800 text-white font-semibold py-3"
        >
          Share Card
        </button>
      </div>

      <div className="w-full max-w-md flex gap-3">
        <button
          onClick={downloadCard}
          className="flex-1 rounded-2xl bg-zinc-900 text-white font-semibold py-3 border border-white/10"
        >
          Download Card
        </button>
        <button
          onClick={onReset}
          className="flex-1 rounded-2xl bg-zinc-900 text-white font-semibold py-3 border border-white/10"
        >
          Play Again
        </button>
      </div>
    </div>
  );
    }
