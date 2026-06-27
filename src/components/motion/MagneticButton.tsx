import { useRef, type ReactNode, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";

type Props = {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
};

export function MagneticButton({ to, href, children, className = "", strength = 0.35, onClick }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };

  const inner = (
    <span
      ref={ref}
      className="inline-flex items-center gap-2"
      style={{ transition: "transform 500ms cubic-bezier(0.2,0.7,0.2,1)" }}
    >
      {children}
    </span>
  );

  const shared = {
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    className,
  };

  if (to) return <Link to={to} {...shared}>{inner}</Link>;
  if (href) return <a href={href} {...shared}>{inner}</a>;
  return <button {...shared}>{inner}</button>;
}
