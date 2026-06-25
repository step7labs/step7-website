import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="pt-40 pb-24 md:pt-48 md:pb-32 border-b hairline">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="section-label mb-8 animate-fade-up">/ {eyebrow}</div>
        <h1
          className="font-display leading-[0.98] tracking-[-0.015em] animate-fade-up max-w-[18ch]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.75rem)", animationDelay: "0.05s" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="mt-10 max-w-2xl text-lg md:text-xl text-foreground/75 leading-[1.55] font-light animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
