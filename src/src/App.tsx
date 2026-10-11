import { useEffect, useMemo, useRef, useState } from "react";
import type { GameState, NodeRequest, Segment } from "./lib/types";
import { mulberry32, seedFromString, weightedPickIndex } from "./lib/rng";
import { NODES } from "./data/nodes";
import { RACE_PATHS } from "./data/racePaths";
import WheelStage from "./components/WheelStage";
import Summary from "./components/Summary";
import { applyFilters, getNodeForRequest, initialStats, makeInitialQueue, reduceAfterChoice } from "./lib/engine";
import { useWheelSpin } from "./lib/useWheelSpin";
import { tickSound, unlockAudio, winSound } from "./lib/sfx";

function getSeedFromUrl() {
  const u = new URL(window.location.href);
  return u.searchParams.get("seed") ?? "default-seed";
}

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

function makeBlankState(): GameState {
  return {
    queue: makeInitialQueue(),
    results: [],
    spinning: false,
    spunCurrent: false,
    stats: initialStats(),
    pendingCosmicFactorId: null,
    hybridA: null,
    effectsLog: []
  };
}

export default function App() {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem("wof_state_v1");
    return saved ? (JSON.parse(saved) as GameState) : makeBlankState();
  });

  const seed = useMemo(getSeedFromUrl, []);
  const rngRef = useRef<() => number>(() => 0.5);

  useEffect(() => {
    const s = seedFromString(seed);
    rngRef.current = mulberry32(s);
  }, [seed]);

  useEffect(() => {
    localStorage.setItem("wof_state_v1", JSON.stringify(state));
  }, [state]);

  const [soundOn, setSoundOn] = useState(() => {
    const v = localStorage.getItem("wof_sound");
    return v ? v === "1" : true;
  });
  const [vibrateOn, setVibrateOn] = useState(() => {
    const v = localStorage.getItem("wof_vibrate");
    return v ? v === "1" : true;
  });

  useEffect(() => localStorage.setItem("wof_sound", soundOn ? "1" : "0"), [soundOn]);
  useEffect(() => localStorage.setItem("wof_vibrate", vibrateOn ? "1" : "0"), [vibrateOn]);

  const currentReq: NodeRequest | undefined = state.queue[0];
  const currentNodeRaw = currentReq ? getNodeForRequest(NODES, currentReq) : null;
  const currentNode = currentReq && currentNodeRaw ? applyFilters(currentNodeRaw, currentReq) : null;

  const isSummary = currentNode?.id === "summary" || !currentNode;

  const [resultText, setResultText] = useState("");

  const { rotation, spinToIndex, reset } = useWheelSpin();

  useEffect(() => {
    setResultText("");
    reset();
  }, [currentNode?.id, reset]);

  function onReset() {
    localStorage.removeItem("wof_state_v1");
    setState(makeBlankState());
  }

  const onTick = () => {
    if (soundOn) tickSound();
    if (vibrateOn && navigator.vibrate) navigator.vibrate(8);
  };

  async function onSpin() {
    if (!currentNode || !currentReq) return;
    if (state.spinning || state.spunCurrent) return;
    if (currentNode.segments.length === 0) return;

    if (soundOn) await unlockAudio();

    // pick winner first
    const weights = currentNode.segments.map((s) => s.weight ?? 1);
    const idx = weightedPickIndex(weights, rngRef.current);
    const chosen: Segment = currentNode.segments[idx];

    setState((prev) => {
      const next = clone(prev);
      next.spinning = true;
      return next;
    });

    await spinToIndex({
      index: idx,
      count: currentNode.segments.length,
      rnd: rngRef.current,
      durationMs: 4300,
      turnsMin: 5,
      turnsMax: 8,
      onTick
    });

    if (soundOn) winSound();

    setResultText(chosen.label);

    setState((prev) => {
      const next = clone(prev);
      next.spinning = false;
      next.spunCurrent = true;

      reduceAfterChoice(next, currentReq, currentNode, chosen, RACE_PATHS, rngRef.current);
      return next;
    });
  }

  function onNext() {
    if (!state.spunCurrent) return;
    setState((prev) => {
      const next = clone(prev);
      next.spunCurrent = false;
      next.queue = next.queue.slice(1);
      return next;
    });
  }

  if (isSummary) {
    return <Summary state={state} onReset={onReset} />;
  }

  const progressText = `${state.results.length + 1} / ${state.results.length + state.queue.length} spins`;

  return (
    <WheelStage
      node={currentNode}
      resultText={resultText}
      onSpin={onSpin}
      onNext={onNext}
      spinDisabled={state.spinning || state.spunCurrent}
      nextDisabled={!state.spunCurrent}
      rotationRad={rotation}
      progressText={progressText}
      soundOn={soundOn}
      vibrateOn={vibrateOn}
      onToggleSound={() => setSoundOn((s) => !s)}
      onToggleVibrate={() => setVibrateOn((v) => !v)}
    />
  );
                                       }
