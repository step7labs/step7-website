// The Step7Labs symbol — "111". Seven in binary is 111: three identical bits, all switched on.
// Each bit is raised one step, so together they climb a staircase — big problems solved one
// step, one bit, at a time. One colour; it inherits the text colour.
// Full-size files: /public/logo-symbol.svg (light) and /public/logo-symbol-dark.svg.
const BITS = [
  { x: 9.5, y: 26 },
  { x: 26.5, y: 15 },
  { x: 43.5, y: 4 },
];

export function LogoMark({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="currentColor">
      {BITS.map((b) => (
        <rect key={b.x} x={b.x} y={b.y} width="11" height="34" rx="5.5" />
      ))}
    </svg>
  );
}

// Symbol + wordmark, as used in the header.
export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const sm = size === "sm";
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className={sm ? "w-6 h-6" : "w-8 h-8"} />
      <span
        className={`font-sans font-semibold tracking-[-0.035em] ${sm ? "text-base" : "text-[21px]"}`}
      >
        Step7Labs
      </span>
    </span>
  );
}
