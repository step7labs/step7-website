// The Step7Labs symbol — "Spark 7": a solid geometric 7 with a four-point spark on the line
// of its stem (the next step). One colour, readable from 16px up. It inherits the text
// colour. Full-size files: /public/logo-symbol.svg (light) and /public/logo-symbol-dark.svg.
export function LogoMark({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 5 L52 5 L52 15 L38 40 L27 40 L41 15 L12 15 Z" />
      <path d="M25.78 42.4 L27.55 50.23 L35.38 52 L27.55 53.77 L25.78 61.6 L24.01 53.77 L16.18 52 L24.01 50.23 Z" />
    </svg>
  );
}

// Symbol + wordmark, as used in the header.
export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const sm = size === "sm";
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className={sm ? "w-5 h-5" : "w-[26px] h-[26px]"} />
      <span
        className={`font-sans font-semibold tracking-[-0.035em] ${sm ? "text-base" : "text-[21px]"}`}
      >
        Step7Labs
      </span>
    </span>
  );
}
