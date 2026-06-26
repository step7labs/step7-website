import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight, Sparkles, Code2, Bot, Workflow, Palette } from "lucide-react";
import heroBg from "../assets/hero-bg.jpg";
import heroDevices from "../assets/hero-devices.jpg";
import workLumen from "../assets/work-lumen.jpg";
import workDrift from "../assets/work-drift.jpg";
import workVeltro from "../assets/work-veltro.jpg";
import founder1 from "../assets/founder-1.jpg";
import founder2 from "../assets/founder-2.jpg";
import svcDesign from "../assets/svc-design.jpg";
import svcDev from "../assets/svc-dev.jpg";
import svcAi from "../assets/svc-ai.jpg";
import svcAuto from "../assets/svc-auto.jpg";

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
      { property: "og:image", content: heroBg },
    ],
  }),
  component: HomePage,
});

const rotating = ["Websites.", "Web Apps.", "SaaS Platforms.", "Brand Systems.", "AI Products."];

const stack = [
  "TypeScript", "React", "Next.js", "TanStack", "Supabase", "Stripe",
  "Vercel", "Cloudflare", "Figma", "Linear", "OpenAI", "Anthropic",
];

const services = [
  { n: "01", t: "Web Design", d: "Editorial, brand-led interfaces engineered for conversion.", img: svcDesign, Icon: Palette },
  { n: "02", t: "Web Development", d: "Production-grade React, TanStack, and headless platforms.", img: svcDev, Icon: Code2 },
  { n: "03", t: "AI Integration", d: "Pragmatic AI features that improve product economics.", img: svcAi, Icon: Bot },
  { n: "04", t: "Automation", d: "Internal tools and workflows that compound over time.", img: svcAuto, Icon: Workflow },
];

const work = [
  { name: "Lumen Capital", tag: "Fintech · Platform", metric: "+38% activation", year: "2025", img: workLumen, quote: "They shipped what our last two agencies promised — in half the time.", author: "Priya N., Head of Product" },
  { name: "Drift Analytics", tag: "SaaS · Logistics", metric: "2.1× pipeline", year: "2025", img: workDrift, quote: "The clearest creative process we've worked with. Calm, fast, exact.", author: "Marcus L., CEO" },
  { name: "Veltro Studio", tag: "Brand · E-commerce", metric: "+62% AOV", year: "2024", img: workVeltro, quote: "Our store finally feels like the brand we always described in pitches.", author: "Ines V., Founder" },
];

const steps = [
  { n: "01", t: "Discovery", d: "Unpack the business, users, and constraints." },
  { n: "02", t: "Strategy", d: "Scope, success metrics, and architecture." },
  { n: "03", t: "Design", d: "Wireframes to high-fidelity systems in Figma." },
  { n: "04", t: "Build", d: "Two-week sprints with staging from day one." },
  { n: "05", t: "Integrate", d: "Data, AI, payments, analytics — wired with care." },
  { n: "06", t: "Quality", d: "Performance, accessibility, end-to-end QA." },
  { n: "07", t: "Launch", d: "Go live, monitor, iterate. Retainers on request." },
];

function BrowserChrome({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="browser-frame">
      <div className="flex items-center gap-2 px-4 py-3 border-b hairline bg-black/40">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        {label && (
          <span className="ml-4 font-mono-tech text-muted-foreground !tracking-[0.12em]">{label}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function HomePage() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % rotating.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Hero with full-bleed visual */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden border-b hairline">
        {/* Background image — darker, directional */}
        <div className="absolute inset-0 -z-10">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-30"
            width={1920}
            height={1280}
          />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>
        {/* Single directional glow behind the mockup (top-right area) */}
        <div
          className="glow-ring hidden lg:block w-[520px] h-[520px] top-24 right-[-80px] opacity-40"
          style={{ background: "rgb(90, 60, 180)" }}
        />
        <div
          className="glow-ring hidden lg:block w-[360px] h-[360px] top-60 right-[10%] opacity-30"
          style={{ background: "rgb(40, 140, 180)" }}
        />

        <div className="mx-auto max-w-7xl px-6 md:px-10 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8 animate-fade-up">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse-dot" />
                <span className="font-mono-tech text-muted-foreground">
                  Digital Product Studio · Est. 2024
                </span>
              </div>

              <h1
                className="font-display leading-[0.95] tracking-[-0.015em] animate-fade-up"
                style={{ fontSize: "clamp(2.5rem, 7.5vw, 6.5rem)", animationDelay: "0.05s" }}
              >
                We build <em className="italic text-foreground/70">considered</em>
                <br />
                digital products.
              </h1>

              <p
                className="mt-8 max-w-xl text-lg md:text-xl text-foreground/75 leading-[1.55] font-light animate-fade-up"
                style={{ animationDelay: "0.15s" }}
              >
                A small studio designing and engineering high-performance websites
                and web platforms for ambitious teams. Strategy, design, and code —
                under one roof.
              </p>

              <div
                className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up"
                style={{ animationDelay: "0.25s" }}
              >
                <Link to="/contact" className="btn-primary">
                  Start a project <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/work" className="btn-ghost">
                  View work
                </Link>
              </div>

              <Link
                to="/work"
                className="group mt-12 inline-flex items-center gap-4 font-mono-tech text-muted-foreground animate-fade-up hover:text-foreground transition-colors"
                style={{ animationDelay: "0.35s" }}
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                  Currently building
                </span>
                <span
                  key={i}
                  className="text-foreground animate-fade-in normal-case tracking-tight font-sans text-base border-b border-foreground/20 group-hover:border-foreground/60"
                >
                  {rotating[i]}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </div>

            {/* Hero device mockup */}
            <div
              className="lg:col-span-5 relative animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative animate-float">
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-400/20 blur-2xl" />
                <BrowserChrome label="nexora.app / overview">
                  <img
                    src={heroDevices}
                    alt="Dashboard product mockup"
                    className="w-full h-auto block"
                    width={1280}
                    height={1280}
                  />
                </BrowserChrome>
                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-5 surface-card !rounded-full !bg-background/80 backdrop-blur-xl px-5 py-3 flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-foreground" />
                  <span className="font-mono-tech text-foreground">Shipping now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stack / social proof marquee */}
      <section className="py-8 border-b hairline overflow-hidden bg-background">
        <div className="section-label mx-auto max-w-7xl px-6 md:px-10 mb-6 opacity-70">
          / Stack & ecosystem
        </div>
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...stack, ...stack, ...stack].map((s, idx) => (
            <span key={idx} className="flex items-center gap-12 text-2xl font-display text-foreground/55">
              {s}
              <span className="opacity-30 text-base">●</span>
            </span>
          ))}
        </div>
      </section>

      {/* Positioning */}
      <section className="py-28 md:py-40 relative">
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

      {/* Services with visuals */}
      <section className="py-28 md:py-36 border-t hairline relative">
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

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <Link
                key={s.n}
                to="/services"
                className="group relative overflow-hidden rounded-2xl border hairline bg-surface hover:bg-surface-2 transition-colors"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={s.img}
                    alt={s.t}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute top-5 left-5 surface-card !rounded-full !bg-background/70 backdrop-blur-xl w-10 h-10 grid place-items-center">
                    <s.Icon className="w-4 h-4" />
                  </div>
                  <div className="absolute top-5 right-5 font-mono-tech text-foreground/80">{s.n}</div>
                </div>
                <div className="p-7 md:p-9">
                  <h3 className="font-display text-2xl md:text-3xl mb-2">{s.t}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{s.d}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-mono-tech text-foreground/70 group-hover:text-foreground transition-colors">
                    Explore <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work — magazine spreads */}
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

          <div className="space-y-24 md:space-y-32">
            {work.map((p, idx) => (
              <Link
                key={p.name}
                to="/work"
                className={`group grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-8 relative">
                  <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <BrowserChrome label={`${p.name.toLowerCase().replace(/\s/g, "")}.com`}>
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  </BrowserChrome>
                </div>
                <div className="lg:col-span-4">
                  <div className="font-mono-tech text-muted-foreground mb-4">
                    {p.year} · {p.tag}
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl tracking-[-0.01em] flex items-center gap-3">
                    {p.name}
                    <ArrowUpRight className="w-7 h-7 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>
                  <div className="mt-6 pt-6 border-t hairline">
                    <div className="font-mono-tech text-muted-foreground mb-1">Outcome</div>
                    <div className="font-display text-3xl">{p.metric}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process with connector path */}
      <section className="py-28 md:py-36 border-t hairline relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-16 max-w-2xl">
            <div className="section-label mb-5">/ Process</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.01em]">
              A seven-step path,<br />
              <em className="italic text-foreground/70">repeated with discipline.</em>
            </h2>
          </div>

          <div className="relative">
            {/* Decorative vertical line on desktop */}
            <div
              className="hidden md:block absolute left-[27px] top-4 bottom-4 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.25), transparent)",
              }}
            />
            <ol className="space-y-10 md:space-y-14">
              {steps.map((s, idx) => (
                <li key={s.n} className="grid md:grid-cols-12 gap-6 md:gap-10 items-start relative">
                  <div className="md:col-span-3 flex items-center gap-5">
                    <div className="relative">
                      <span className="grid place-items-center w-14 h-14 rounded-full border hairline bg-background font-mono-tech text-foreground relative z-10">
                        {s.n}
                      </span>
                      {idx === 0 && (
                        <span className="absolute inset-0 rounded-full bg-foreground/10 animate-pulse-dot" />
                      )}
                    </div>
                  </div>
                  <h3 className="md:col-span-4 font-display text-2xl md:text-3xl tracking-[-0.01em]">
                    {s.t}
                  </h3>
                  <p className="md:col-span-5 text-foreground/70 leading-relaxed font-light">
                    {s.d}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Team / founders */}
      <section className="py-28 md:py-36 border-t hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-16 max-w-2xl">
            <div className="section-label mb-5">/ Studio</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.01em]">
              Two founders.<br />
              <em className="italic text-foreground/70">No middle layer.</em>
            </h2>
            <p className="mt-6 text-foreground/70 text-lg max-w-xl font-light">
              You work directly with the people designing and building your product.
              No project managers, no handoffs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { img: founder1, name: "Marco Vélez", role: "Design & Strategy" },
              { img: founder2, name: "Daniel Reyes", role: "Engineering & AI" },
            ].map((f) => (
              <div key={f.name} className="group relative rounded-2xl overflow-hidden border hairline bg-surface">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
                    <div className="font-mono-tech text-muted-foreground mb-2">{f.role}</div>
                    <h3 className="font-display text-3xl md:text-4xl">{f.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-28 md:py-40 border-t hairline relative overflow-hidden">
        <div className="glow-ring w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background: "rgb(120, 80, 220)" }} />
        <div className="mx-auto max-w-7xl px-6 md:px-10 text-center relative">
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
