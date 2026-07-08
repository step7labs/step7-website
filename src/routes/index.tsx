import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import { HeroAnimation } from "../components/site/HeroAnimation";
import { InvestmentTabs } from "../components/pricing/InvestmentTabs";
import { posts } from "./insights.index";
import { motion, AnimatePresence } from "framer-motion";

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
          "Premium digital product studio. Web design & development, and AI & automation for brands that take craft seriously.",
      },
    ],
  }),
  component: HomePage,
});

const rotating = ["Websites.", "Web Apps.", "SaaS Platforms.", "Brand Systems.", "AI Products."];

const clients = [
  "Bricks & Bolt Infra", "NBC Colorzone", "JSS Industries", "Nimbus Retail",
  "Aperture Labs", "North Field", "Ovo Health", "Marin & Co.",
];

const homeServices = [
  {
    id: "web",
    t: "Web Design & Development",
    d: "Corporate Websites · Landing Pages · Ecommerce · Web Applications · UI/UX · CMS · Custom Portals · Website Maintenance",
  },
  {
    id: "ai",
    t: "AI & Automation",
    d: "Workflow Automation · AI Integration · AI Assistants · Internal Dashboards · CRM Automation · Internal Business Tools",
  },
  {
    id: "software",
    t: "Custom Software",
    d: "SaaS · Platforms · Client Portals · Booking Systems · ERP-lite · Admin Panels · API Integrations",
  },
  {
    id: "branding",
    t: "Branding",
    d: "Identity systems · Naming & voice · Brand guidelines · Launch assets · SEO · Analytics · Performance · Paid Advertising Strategy · Maintenance · Consulting",
  },
];

const work = [
  {
    name: "Bricks & Bolt Infra",
    tag: "Architecture · Construction",
    metric: "Next.js · WebGL",
    year: "2026",
    link: "/work"
  },
  {
    name: "NBC Colorzone",
    tag: "Cosmetics · Manufacturer",
    metric: "React · Commerce",
    year: "2026",
    link: "/work"
  },
  {
    name: "JSS Industries",
    tag: "LPG Appliances · Manufacturer",
    metric: "Vite · Headless",
    year: "2025",
    link: "/work"
  },
];

const processSteps = [
  "Discovery", "Strategy", "Design", "Build", "Integration", "Quality", "Launch & Support"
];

function HomeServiceCard({ service, isOpen, onClick }: { service: typeof homeServices[0], isOpen: boolean, onClick: () => void }) {
  return (
    <div className="bg-background px-6 md:px-10 py-8 hover:bg-surface transition-colors cursor-pointer group border-b border-border last:border-b-0" onClick={onClick}>
      <div className="flex justify-between items-center">
        <h3 className="font-display text-2xl md:text-3xl tracking-tight">{service.t}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-muted-foreground">
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-foreground/70 leading-relaxed font-light text-lg">
              {service.d}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HomePage() {
  const [i, setI] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);
  
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % rotating.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* 1. Hero */}
      <section ref={heroRef} className="relative pt-40 md:pt-52 pb-28 md:pb-40 border-b hairline overflow-hidden">
        <HeroAnimation sectionRef={heroRef} />
        <div className="mx-auto max-w-7xl px-6 md:px-10 relative z-10">
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

      {/* 2. Featured Work (Moved up) */}
      <section className="py-24 md:py-32 border-b hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16 bg-surface border border-border p-8 md:p-12 rounded-3xl">
            <div>
              <div className="section-label mb-5">/ Selected work</div>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.01em]">
                Products with intent.
              </h2>
            </div>
            <Link to="/work" className="link-underline text-sm flex items-center gap-2 text-foreground">
              All projects <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-border border border-border rounded-xl overflow-hidden relative z-20 shadow-2xl">
            {work.map((p, i) => (
              <Link
                key={i}
                to={p.link as any}
                className="bg-background grid md:grid-cols-12 gap-6 items-center px-6 py-8 md:py-10 hover:bg-surface/60 transition-colors group"
              >
                <div className="md:col-span-5 font-display text-2xl md:text-4xl flex items-center gap-4">
                  {p.name}
                  <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
                </div>
                <div className="md:col-span-4 text-sm text-foreground/70">{p.tag}</div>
                <div className="md:col-span-2 font-mono-tech text-muted-foreground">{p.metric}</div>
                <div className="md:col-span-1 font-mono-tech text-muted-foreground text-right">{p.year}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services (4 Categories, progressive disclosure) */}
      <section className="py-24 md:py-32 border-b hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="section-label mb-5">/ Services</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.01em] max-w-[12ch] mb-6">
              Design, build, and grow.
            </h2>
            <Link to="/services" className="link-underline text-sm inline-flex items-center gap-2 mb-10">
              Explore full capabilities <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="lg:col-span-7 border border-border rounded-xl overflow-hidden divide-y divide-border">
            {homeServices.map((s) => (
              <HomeServiceCard
                key={s.id}
                service={s}
                isOpen={openServiceId === s.id}
                onClick={() => setOpenServiceId(openServiceId === s.id ? null : s.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Approach / Why Step7Labs */}
      <section className="py-24 md:py-32 border-b hairline">
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

      {/* 5. Process */}
      <section className="py-24 md:py-32 border-b hairline bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 md:px-10 text-center">
          <div className="section-label mb-16 mx-auto">/ Process</div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-border hidden md:block -z-10" />
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center bg-surface/30 md:bg-transparent px-4 py-2 w-full md:w-auto">
                <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center font-mono-tech text-sm text-foreground/50 mb-4 shadow-sm">
                  0{idx + 1}
                </div>
                <div className="font-display text-2xl">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pricing / Investment */}
      <section className="py-24 md:py-32 border-b hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-16 max-w-2xl">
            <div className="section-label mb-6">/ Investment</div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em] mb-6">
              Configure your project.
            </h2>
            <p className="text-foreground/60 text-lg">
              We believe in providing clear estimates upfront so you can make informed decisions.
            </p>
          </div>
          
          <InvestmentTabs />
        </div>
      </section>

      {/* 7. Insights */}
      <section className="py-24 md:py-32 border-b hairline bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div>
              <div className="section-label mb-5">/ Insights</div>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.02] tracking-[-0.01em]">
                Field notes.
              </h2>
            </div>
            <Link to="/insights" className="link-underline text-sm flex items-center gap-2">
              Read all essays <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
            {posts.slice(0, 3).map((p, idx) => (
              <Link
                key={p.title}
                to={(p.slug ? `/insights/${p.slug}` : "/insights") as any}
                className="bg-background grid md:grid-cols-12 gap-6 items-center px-6 py-8 hover:bg-surface/60 transition-colors group cursor-pointer"
              >
                <div className="md:col-span-1 font-mono-tech text-muted-foreground hidden md:block">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="md:col-span-7 font-display text-xl md:text-2xl tracking-[-0.01em]">
                  {p.title}
                </h3>
                <div className="md:col-span-2 text-sm text-muted-foreground">{p.cat}</div>
                <div className="md:col-span-2 font-mono-tech text-muted-foreground md:text-right">
                  {p.read}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact (CTA strip) */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10 text-center">
          <div className="section-label mb-8 mx-auto">/ Next</div>
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
