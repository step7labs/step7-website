import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "../components/site/PageHero";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Step7Labs" },
      {
        name: "description",
        content:
          "Selected client projects across fintech, SaaS, e-commerce, and brand. Measurable outcomes for ambitious teams.",
      },
      { property: "og:title", content: "Work — Step7Labs" },
      {
        property: "og:description",
        content: "Selected projects with measurable outcomes — fintech, SaaS, e-commerce, brand.",
      },
    ],
  }),
  component: WorkPage,
});

const projects = [
  {
    name: "NBC Colorzone",
    category: "Cosmetics",
    tag: "Digital Catalog",
    year: "2026",
    metric: "React · Commerce",
    color: "from-zinc-700 to-zinc-900",
  },
  {
    name: "Bricks & Bolt Infra",
    category: "Architecture",
    tag: "Corporate Portfolio",
    year: "2026",
    metric: "Next.js · WebGL",
    color: "from-neutral-700 to-neutral-900",
    image: "/bricks-and-bolt.png",
  },
  {
    name: "Apreture Cosmetics",
    category: "Brand",
    tag: "Identity & Site",
    year: "2024",
    metric: "Series A close",
    color: "from-zinc-800 to-black",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "JSS Industries",
    category: "LPG Appliances",
    tag: "Digital Catalog",
    year: "2025",
    metric: "Vite · Headless",
    color: "from-stone-700 to-stone-900",
    image: "/jss-industries.png",
    link: "https://www.jssindustries.co",
  },
];

const filters = ["All", "Architecture", "Cosmetics", "LPG Appliances", "Brand"] as const;

function WorkPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Things we've <em className="italic text-foreground/70">shipped.</em>
          </>
        }
        intro="A small selection of recent work. Each engagement is measured against business outcomes, not deliverables. Detailed case studies available on request."
      />

      <section className="py-12 border-b hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                filter === f
                  ? "bg-foreground text-background border-foreground"
                  : "hairline text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-12">
          {list.map((p) => {
            const cardContent = (
              <>
                <div
                  className={`relative aspect-[4/3] bg-gradient-to-br ${p.color} overflow-hidden rounded-sm`}
                >
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {!p.image && (
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="font-display text-6xl md:text-8xl text-white/10 tracking-tight">
                        {p.name.split(" ")[0]}
                      </div>
                    </div>
                  )}
                  <div className="absolute top-5 left-5 font-mono-tech text-white/60">
                    {p.category}
                  </div>
                  <div className="absolute top-5 right-5 font-mono-tech text-white/60">{p.year}</div>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl tracking-[-0.01em] flex items-center gap-3">
                      {p.name}
                      <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.tag}</p>
                  </div>
                  <div className="font-mono-tech text-muted-foreground whitespace-nowrap">
                    {p.metric}
                  </div>
                </div>
              </>
            );

            return p.link ? (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block animate-fade-up"
              >
                {cardContent}
              </a>
            ) : (
              <Link key={p.name} to="/contact" className="group block animate-fade-up">
                {cardContent}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="py-28 border-t hairline text-center">
        <div className="mx-auto max-w-3xl px-6">
          <div className="section-label mb-6">/ Next project</div>
          <h3 className="font-display text-4xl md:text-5xl tracking-[-0.01em]">Could be yours.</h3>
          <Link to="/contact" className="mt-10 inline-flex btn-primary">
            Start a project
          </Link>
        </div>
      </section>
    </>
  );
}
