import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Step7Labs — Digital Product Studio" },
      {
        name: "description",
        content:
          "We design and engineer high-performance websites, web apps, and intelligent digital experiences for ambitious brands.",
      },
      { property: "og:title", content: "Step7Labs — Digital Product Studio" },
      {
        property: "og:description",
        content:
          "Premium digital product studio. Web design, development, and AI integration for brands that take craft seriously.",
      },
    ],
  }),
  component: HomePage,
});

const rotating = ["Websites.", "Web Apps.", "SaaS Platforms.", "Brand Systems.", "AI Products."];

const clients = [
  "Lumen Capital", "Drift Analytics", "Veltro Studio", "Nimbus Retail",
  "Aperture Labs", "North Field", "Ovo Health", "Marin & Co.",
];

const services = [
  { n: "01", t: "Web Design", d: "Editorial, brand-led interfaces engineered for conversion." },
  { n: "02", t: "Web Development", d: "Production-grade React, TanStack, and headless platforms." },
  { n: "03", t: "AI Integration", d: "Pragmatic AI features that improve product economics." },
  { n: "04", t: "Automation", d: "Internal tools and workflows that compound over time." },
];

const work = [
  {
    name: "Lumen Capital",
    tag: "Fintech · Platform",
    metric: "+38% activation",
    year: "2025",
  },
  {
    name: "Drift Analytics",
    tag: "SaaS · Logistics",
    metric: "2.1× pipeline",
    year: "2025",
  },
  {
    name: "Veltro Studio",
    tag: "Brand · E-commerce",
    metric: "+62% AOV",
    year: "2024",
  },
];

function HomePage() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % rotating.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 md:pt-52 pb-28 md:pb-40 border-b hairline overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-10 relative">
          <div className="flex items-center gap-3 mb-10 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
            <span className="font-mono-tech text-muted-foreground">
              Digital Product Studio · Est. 2024
            </span>
          </div>

          <h1
            className="font-display leading-[0.95] tracking-[-0.015em] animate-fade-up"
            style={{ fontSize: "clamp(2.75rem, 8.5vw, 8rem)", animationDelay: "0.05s" }}
          >
            We build <em className="italic text-foreground/70">considered</em>
            <br />
            digital products.
          </h1>

          <div className="mt-14 grid md:grid-cols-12 gap-10 items-end">
            <p
              className="md:col-span-6 text-lg md:text-xl text-foreground/75 leading-[1.55] font-light animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              Step7Labs is a small studio designing and engineering high-performance
              websites and web platforms for ambitious teams. Strategy, design, and
              code — under one roof.
            </p>

            <div
              className="md:col-span-6 md:col-start-7 flex flex-wrap items-center gap-4 md:justify-end animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              <Link to="/contact" className="btn-primary">
                Start a project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/work" className="btn-ghost">
                View work
              </Link>
            </div>
          </div>

          <div
            className="mt-20 md:mt-28 flex items-baseline gap-4 font-mono-tech text-muted-foreground animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            <span>Currently building</span>
            <span key={i} className="text-foreground animate-fade-in normal-case tracking-tight font-sans text-base">
              {rotating[i]}
            </span>
          </div>
        </div>
      </section>

      {/* Clients marquee */}
      <section className="py-10 border-b hairline overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap font-mono-tech text-muted-foreground">
          {[...clients, ...clients, ...clients].map((c, idx) => (
            <span key={idx} className="flex items-center gap-16">
              {c}
              <span className="opacity-40">—</span>
            </span>
          ))}
        </div>
      </section>

      {/* Positioning */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="section-label mb-6">/ Approach</div>
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-[-0.01em]">
              We work like a senior in-house team — embedded with founders and
              product leaders — to design products that look unmistakable and
              perform measurably.
            </p>
            <div className="mt-16 grid sm:grid-cols-3 gap-10 pt-10 border-t hairline">
              {[
                { v: "12+", l: "Products shipped" },
                { v: "100%", l: "Client retention" },
                { v: "<6 wks", l: "Avg. to launch" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-5xl">{s.v}</div>
                  <div className="mt-3 font-mono-tech text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-28 md:py-40 border-t hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div>
              <div className="section-label mb-5">/ Services</div>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.01em] max-w-[14ch]">
                Design, build, and grow.
              </h2>
            </div>
            <Link to="/services" className="link-underline text-sm flex items-center gap-2">
              All services <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {services.map((s) => (
              <Link
                key={s.n}
                to="/services"
                className="bg-background p-8 md:p-10 group hover:bg-surface transition-colors min-h-[260px] flex flex-col justify-between"
              >
                <div className="font-mono-tech text-muted-foreground">{s.n}</div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl mb-3">{s.t}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{s.d}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="py-28 md:py-40 border-t hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div>
              <div className="section-label mb-5">/ Selected work</div>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.01em]">
                Products with intent.
              </h2>
            </div>
            <Link to="/work" className="link-underline text-sm flex items-center gap-2">
              All projects <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-px bg-border">
            {work.map((p) => (
              <Link
                key={p.name}
                to="/work"
                className="bg-background grid md:grid-cols-12 gap-6 items-center px-2 md:px-6 py-8 md:py-10 hover:bg-surface transition-colors group"
              >
                <div className="md:col-span-5 font-display text-3xl md:text-4xl flex items-center gap-4">
                  {p.name}
                  <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
                <div className="md:col-span-4 text-sm text-foreground/70">{p.tag}</div>
                <div className="md:col-span-2 font-mono-tech text-muted-foreground">{p.metric}</div>
                <div className="md:col-span-1 font-mono-tech text-muted-foreground text-right">{p.year}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-28 md:py-40 border-t hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10 text-center">
          <div className="section-label mb-8">/ Next</div>
          <h2 className="font-display leading-[0.98] tracking-[-0.015em]" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
            Let's build something
            <br />
            <em className="italic text-foreground/70">worth shipping.</em>
          </h2>
          <Link to="/contact" className="mt-12 inline-flex btn-primary">
            Start a project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
