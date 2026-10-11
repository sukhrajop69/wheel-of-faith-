const TIER_LABELS = [
  "Mid",
  "Peak Human",
  "Superhuman",
  "Herculean",
  "Cosmic",
  "Universal",
  "Transcendent"
] as const;

export function tierLabel(tier: number) {
  if (tier <= 6) return TIER_LABELS[Math.max(0, tier)] ?? "Mid";
  return `Transcendent+${tier - 6}`;
}

export function clampMin0(n: number) {
  return Math.max(0, n);
}
