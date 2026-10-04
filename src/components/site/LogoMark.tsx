// The Step7Labs mark: seven stars joined into a "7" — three across, four down, the seventh a
// spark. This is the mid-weight drawing tuned for 20–48px; full-size versions live in
// /public/logo.svg (light) and /public/logo-dark.svg. It inherits the text colour.
export function LogoMark({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <path
        d="M14 16 L32 16 L50 16 L44 25.5 L38 35 L32 44.5 L26 54"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <g fill="currentColor">
        <circle cx="14" cy="16" r="3.4" />
        <circle cx="32" cy="16" r="2.6" />
        <circle cx="50" cy="16" r="4.4" />
        <circle cx="44" cy="25.5" r="2.6" />
        <circle cx="38" cy="35" r="3.2" />
        <circle cx="32" cy="44.5" r="2.4" />
        <path d="M26 44.5 L27.84 52.16 L35.5 54 L27.84 55.84 L26 63.5 L24.16 55.84 L16.5 54 L24.16 52.16Z" />
      </g>
    </svg>
  );
}
