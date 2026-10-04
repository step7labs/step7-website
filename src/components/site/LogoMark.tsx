// The Step7Labs symbol — "<7>". A code tag whose closing slash is a 7, and the 7 is built from
// three bits: seven in binary is 111. Code, the number in our name, and solving problems one
// step (one bit) at a time. One colour; it inherits the text colour.
// Full-size files: /public/logo-symbol.svg (light) and /public/logo-symbol-dark.svg.
const BRACKETS = ["M16 20 L5 32 L16 44", "M48 20 L59 32 L48 44"];
// The three bits are cut flat where they meet so the gaps stay open at every size; the 7's
// two outer tips are rounded (circles) to match the brackets.
const BITS = ["M23 15 L42 15 L39.41 22.57", "M37.91 26.92 L34.7 36.28", "M33.21 40.64 L30 50"];

export function LogoMark({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinejoin="round">
        {BRACKETS.map((d) => (
          <path key={d} d={d} strokeLinecap="round" />
        ))}
        {BITS.map((d) => (
          <path key={d} d={d} strokeLinecap="butt" />
        ))}
      </g>
      <g fill="currentColor">
        <circle cx="23" cy="15" r="3.25" />
        <circle cx="30" cy="50" r="3.25" />
      </g>
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
