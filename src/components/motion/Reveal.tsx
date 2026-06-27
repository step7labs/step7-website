import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px", ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transform: inView ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
    opacity: inView ? 1 : 0,
    transition:
      "opacity 1100ms cubic-bezier(0.2,0.7,0.2,1), transform 1100ms cubic-bezier(0.2,0.7,0.2,1)",
    willChange: "opacity, transform",
  };
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

export function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 60,
  italicWords = [],
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  italicWords?: string[];
}) {
  const { ref, inView } = useInView<HTMLHeadingElement>({ threshold: 0.25 });
  const words = text.split(" ");
  return (
    <h1 ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const italic = italicWords.includes(w.replace(/[.,]/g, ""));
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-baseline"
            style={{ lineHeight: "0.95" }}
          >
            <span
              className={`inline-block ${italic ? "italic text-foreground/65" : ""}`}
              style={{
                transform: inView ? "translateY(0)" : "translateY(110%)",
                opacity: inView ? 1 : 0,
                transition: `transform 1100ms cubic-bezier(0.2,0.7,0.2,1) ${
                  delay + i * stagger
                }ms, opacity 700ms ease ${delay + i * stagger}ms`,
                willChange: "transform",
              }}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        );
      })}
    </h1>
  );
}

export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1800,
  className = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  const display = Number.isInteger(to) ? Math.round(val).toString() : val.toFixed(1);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
