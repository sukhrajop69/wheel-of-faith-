type Props = {
  onSpin: () => void;
  onNext: () => void;
  spinDisabled: boolean;
  nextDisabled: boolean;
};

export default function Controls({ onSpin, onNext, spinDisabled, nextDisabled }: Props) {
  return (
    <div className="w-full max-w-md px-5 pb-6 flex gap-3">
      <button
        onClick={onSpin}
        disabled={spinDisabled}
        className="flex-1 rounded-2xl bg-white text-black font-semibold py-3 disabled:opacity-40"
        aria-label="Spin"
      >
        SPIN
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="flex-1 rounded-2xl bg-zinc-800 text-white font-semibold py-3 disabled:opacity-40"
        aria-label="Next"
      >
        NEXT
      </button>
    </div>
  );
}
