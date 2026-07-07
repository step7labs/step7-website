import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="pt-40 pb-24 md:pt-48 md:pb-32 border-b hairline">
      <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-col items-center text-center">
        <div className="section-label mb-8 animate-fade-up">/ {eyebrow}</div>
        <div className="flex flex-col items-center gap-8 md:gap-10">
          <h1
            className="font-display leading-[0.98] tracking-[-0.015em] animate-fade-up max-w-4xl mx-auto"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.75rem)", animationDelay: "0.05s" }}
          >
            {title}
          </h1>
          {intro && (
            <div className="animate-fade-up flex flex-col items-center max-w-3xl mx-auto" style={{ animationDelay: "0.15s" }}>
              <p className="text-lg md:text-xl text-foreground/75 leading-[1.55] font-light">
                {intro}
              </p>
              {action && (
                <div className="mt-8 w-full flex justify-center">
                  {action}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
