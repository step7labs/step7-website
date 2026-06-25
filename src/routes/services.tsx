import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/site/PageHero";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Step7Labs" },
      {
        name: "description",
        content:
          "Web design, web development, AI integration, automation, and branding services for ambitious teams.",
      },
      { property: "og:title", content: "Services — Step7Labs" },
      {
        property: "og:description",
        content:
          "A focused set of services: web design, development, AI integration, automation, branding.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    n: "01",
    t: "Web Design",
    d: "Brand-driven interfaces that feel deliberate. We work in Figma alongside founders to develop visual systems, layout principles, and typography that hold up across every surface.",
    bullets: ["Visual identity & art direction", "Design systems & component libraries", "Editorial & marketing pages", "Conversion-led UX"],
  },
  {
    n: "02",
    t: "Web Development",
    d: "Production-grade engineering in React, TanStack, and headless platforms. We ship fast websites and applications built to scale with the business.",
    bullets: ["TanStack Start / Next.js", "Headless CMS & commerce", "Performance & accessibility", "Long-term maintenance"],
  },
  {
    n: "03",
    t: "AI Integration",
    d: "Pragmatic AI features added where they move the needle — search, support, personalization, content. No demos. Real product economics.",
    bullets: ["RAG & semantic search", "Conversational interfaces", "Content & ops automation", "Model evaluation"],
  },
  {
    n: "04",
    t: "Automation",
    d: "Internal tools, dashboards, and workflows that compound. We help teams remove manual work without locking into rigid platforms.",
    bullets: ["Operational dashboards", "Workflow automation", "Data pipelines", "Custom admin tools"],
  },
  {
    n: "05",
    t: "Branding",
    d: "Identity work for digital-first companies. Marks, typography, voice, and motion principles — built to live as well in code as on a deck.",
    bullets: ["Identity systems", "Naming & voice", "Brand guidelines", "Launch assets"],
  },
];

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>A focused studio,<br /><em className="italic text-foreground/70">end to end.</em></>}
        intro="We're a small team handling strategy, design, and engineering in-house. Most projects engage two or three of the services below — sequenced for outcomes, not deliverables."
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="space-y-px bg-border">
            {services.map((s) => (
              <article
                key={s.n}
                className="bg-background grid md:grid-cols-12 gap-10 px-2 md:px-6 py-14 md:py-20 hover:bg-surface transition-colors group"
              >
                <div className="md:col-span-2 font-mono-tech text-muted-foreground">{s.n}</div>
                <div className="md:col-span-4">
                  <h2 className="font-display text-3xl md:text-5xl tracking-[-0.01em]">{s.t}</h2>
                </div>
                <div className="md:col-span-6 space-y-6">
                  <p className="text-foreground/80 text-lg leading-[1.55] font-light">{s.d}</p>
                  <ul className="grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-foreground/70">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="text-muted-foreground">—</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 border-t hairline text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h3 className="font-display text-4xl md:text-5xl tracking-[-0.01em]">
            Not sure where to start?
          </h3>
          <p className="mt-6 text-foreground/70">
            Send a short note about your project. We'll respond within one business day.
          </p>
          <Link to="/contact" className="mt-10 inline-flex btn-primary">
            Talk to the studio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
