import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  Zap,
  ShoppingBag,
  Palette,
  Network,
  Brain,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Step7Labs — We Build Websites That Think." },
      {
        name: "description",
        content:
          "Step7Labs crafts AI-integrated web experiences for businesses that refuse to be ordinary.",
      },
      { property: "og:title", content: "Step7Labs — We Build Websites That Think." },
      {
        property: "og:description",
        content:
          "AI-integrated websites, SaaS platforms, and custom web applications.",
      },
    ],
  }),
  component: Index,
});

const rotatingWords = [
  "AI Websites",
  "SaaS Platforms",
  "Client Portals",
  "E-Commerce",
  "Custom Web Apps",
];

const services = [
  {
    icon: Bot,
    title: "AI-Integrated Websites",
    desc: "LLM-powered chatbots, smart search, and personalization engines baked into your site.",
  },
  {
    icon: Zap,
    title: "SaaS Platform Development",
    desc: "Full-stack web apps with auth, billing, dashboards, and real-time features.",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce Solutions",
    desc: "Conversion-optimized stores with AI-driven product recommendations.",
  },
  {
    icon: Palette,
    title: "UI/UX Design Systems",
    desc: "Design-to-code workflows; pixel-perfect interfaces built for scale.",
  },
  {
    icon: Network,
    title: "API & Backend Architecture",
    desc: "Robust REST/GraphQL APIs, database design, and third-party integrations.",
  },
  {
    icon: Brain,
    title: "Business Automation",
    desc: "Automate internal workflows with AI agents and custom-built tools.",
  },
];

const steps = [
  { n: "01", t: "Discovery", d: "Understand your vision, users, and goals" },
  { n: "02", t: "Strategy", d: "Define scope, tech stack, and architecture" },
  { n: "03", t: "Design", d: "Wireframes → high-fidelity UI in Figma" },
  { n: "04", t: "Build", d: "Agile development, sprint by sprint" },
  { n: "05", t: "AI Integration", d: "Embed intelligence where it matters most" },
  { n: "06", t: "Testing", d: "QA, performance audits, cross-device tests" },
  { n: "07", t: "Launch & Support", d: "Go live with ongoing optimization" },
];

const stats = [
  { v: "12+", l: "Projects Delivered" },
  { v: "100%", l: "Client Satisfaction" },
  { v: "AI-First", l: "Dev Approach" },
  { v: "2", l: "Expert Founders" },
];

const testimonials = [
  {
    q: "Step7Labs shipped our AI assistant in three weeks. It now handles 60% of inbound support — and our customers love it.",
    n: "Aarav Mehta",
    r: "Founder, Nimbus Retail",
  },
  {
    q: "Easily the most technical and design-conscious team we've worked with. They built our entire SaaS dashboard from scratch.",
    n: "Lena Park",
    r: "CTO, Drift Analytics",
  },
  {
    q: "They don't just build websites — they architect products. Our conversion rate doubled after the rebuild.",
    n: "Marco Vetri",
    r: "CEO, Veltro Studio",
  },
];

function Index() {
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % rotatingWords.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="dark relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero wordIdx={wordIdx} />
      <Marquee />
      <Services />
      <Process />
      <Work />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b hairline">
      <div className="mx-auto max-w-6xl px-8 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="font-display font-semibold tracking-tight text-[15px]">Step7Labs</span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-[13px] text-muted-foreground">
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#process" className="hover:text-foreground transition-colors">Process</a>
          <a href="#work" className="hover:text-foreground transition-colors">Work</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
        <a href="#contact" className="btn-primary !py-2 !px-4 text-[13px]">
          Start Project <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
}


function Hero({ wordIdx }: { wordIdx: number }) {
  return (
    <section id="top" className="relative grain min-h-screen flex items-center pt-32 pb-24">
      <div className="glow-orb-primary animate-float-slow" style={{ top: "5%", left: "-15%", opacity: 0.7 }} />
      <div
        className="glow-orb-cyan animate-float-slow"
        style={{ bottom: "-15%", right: "-15%", animationDelay: "-7s", opacity: 0.6 }}
      />
      <BackgroundMesh />

      <div className="relative mx-auto max-w-6xl px-8 w-full">
        <div className="flex items-center gap-2.5 mb-10 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(0,229,204,0.8)]" />
          <span className="font-mono-tech text-muted-foreground">
            AI-Integrated Web Studio · Est. 2024
          </span>
        </div>

        <h1
          className="font-display font-semibold leading-[0.98] tracking-[-0.035em] animate-fade-up max-w-[14ch]"
          style={{ fontSize: "clamp(2.5rem, 7.5vw, 6.5rem)", animationDelay: "0.1s" }}
        >
          We build websites
          <br />
          that <span className="italic font-normal text-primary">think.</span>
        </h1>

        <p
          className="mt-10 max-w-xl text-xl md:text-2xl text-foreground/85 leading-[1.5] font-light animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          Step7Labs crafts AI-integrated web experiences for businesses that refuse to be ordinary.
        </p>

        <div
          className="mt-8 flex items-center gap-3 font-mono-tech text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0.35s" }}
        >
          <span className="text-primary">{">"}</span>
          <span>building</span>
          <span key={wordIdx} className="text-foreground/90 animate-fade-up">
            {rotatingWords[wordIdx]}
          </span>
          <span className="inline-block w-[6px] h-3.5 bg-primary animate-pulse" />
        </div>

        <div
          className="mt-12 flex flex-wrap items-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.45s" }}
        >
          <a href="#contact" className="btn-primary">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#work" className="btn-ghost">See Our Work</a>
        </div>

        <div
          className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t hairline animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          {stats.map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl md:text-[2.5rem] font-semibold tracking-tight text-foreground">
                {s.v}
              </div>
              <div className="mt-3 font-mono-tech text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function BackgroundMesh() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
          <radialGradient id="fade">
            <stop offset="0%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="1" />
          </radialGradient>
          <mask id="m">
            <rect width="100%" height="100%" fill="white" />
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#m)" />
      </svg>
    </div>
  );
}

function Marquee() {
  const top = [
    "AI Integration", "Custom Web Development", "SaaS Platforms",
    "Business Automation", "API Development", "UI/UX Design", "E-Commerce Solutions",
  ];
  const bottom = [
    "React", "Next.js", "Python", "LLM APIs", "OpenAI",
    "Anthropic", "Node.js", "Tailwind CSS", "PostgreSQL",
  ];
  return (
    <section className="border-y hairline py-10 overflow-hidden bg-[var(--surface)]/40">
      <MarqueeRow items={top} />
      <div className="h-6" />
      <MarqueeRow items={bottom} reverse />
    </section>
  );
}

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden">
      <div className={`flex shrink-0 gap-10 pr-10 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map((it, i) => (
          <div key={i} className="flex items-center gap-10 text-muted-foreground font-mono-tech whitespace-nowrap">
            <span>{it}</span>
            <span className="text-primary">●</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ label, title }: { label: string; title: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      <div className="section-label mb-4">/ {label}</div>
      <h2 className="font-display font-bold text-4xl md:text-6xl leading-[0.98] tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="OUR SERVICES"
          title={<>Every project. <span className="text-muted-foreground">Crafted with intelligence.</span></>}
        />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="glass-card glass-card-hover p-8 group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="relative py-32 px-6 border-t hairline">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb-primary" style={{ top: "20%", right: "-20%", opacity: 0.5 }} />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="OUR PROCESS"
          title={<>From idea to launch — <span className="text-primary">in 7 steps.</span></>}
        />
        <p className="mt-4 font-mono-tech text-muted-foreground">
          / The 7 in Step7Labs isn't decoration — it's our method.
        </p>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="glass-card glass-card-hover p-6">
              <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/50 flex items-center justify-center font-mono text-primary text-sm shadow-[0_0_30px_rgba(108,99,255,0.35)] mb-4">
                {s.n}
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const projects = [
    {
      tag: "AI · FINTECH",
      name: "Lumen Capital Portal",
      desc: "AI-powered investor dashboard with natural-language portfolio queries.",
      stack: ["Next.js", "LLM APIs", "PostgreSQL"],
      gradient: "from-indigo-600/40 via-violet-600/20 to-transparent",
    },
    {
      tag: "SAAS · LOGISTICS",
      name: "Drift Analytics",
      desc: "Real-time supply-chain intelligence with predictive routing models.",
      stack: ["React", "Python", "OpenAI"],
      gradient: "from-cyan-500/40 via-teal-500/20 to-transparent",
    },
  ];
  return (
    <section id="work" className="py-32 px-6 border-t hairline">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="SELECTED WORK"
          title={<>Things we've <span className="italic">shipped.</span></>}
        />
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <a key={p.name} href="#contact" className="glass-card glass-card-hover overflow-hidden group block">
              <div className={`aspect-[4/3] relative bg-gradient-to-br ${p.gradient} border-b hairline`}>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="font-display text-7xl font-extrabold text-foreground/10">
                    {p.name.split(" ")[0]}
                  </div>
                </div>
                <div className="absolute top-4 left-4 font-mono-tech text-foreground/70">
                  {p.tag}
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-display font-bold text-2xl mb-2">{p.name}</h3>
                <p className="text-muted-foreground mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.stack.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full border hairline font-mono-tech text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-primary text-sm group-hover:gap-3 transition-all">
                  View Case Study <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    "AI-native from day one — not bolted on later",
    "Small team, zero bureaucracy — you talk directly to the builders",
    "Full-stack capability — design, dev, and deployment under one roof",
    "Obsessed with performance, speed, and user experience",
  ];
  return (
    <section className="py-32 px-6 border-t hairline">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="section-label mb-4">/ WHY STEP7LABS</div>
          <h2 className="font-display font-bold text-4xl md:text-6xl leading-[0.98] tracking-tight">
            Not just developers.
            <br />
            <span className="text-primary">Product thinkers.</span>
          </h2>
        </div>
        <ul className="space-y-5">
          {points.map((p) => (
            <li key={p} className="flex gap-4 items-start glass-card p-5">
              <span className="text-secondary text-xl leading-none mt-1">✦</span>
              <span className="text-foreground/90">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-32 px-6 border-t hairline">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="CLIENT WORDS"
          title={<>What partners say about <span className="text-muted-foreground">working with us.</span></>}
        />
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.n} className="glass-card p-8 border-l-2 !border-l-primary">
              <div className="text-secondary mb-4 font-mono-tech">★★★★★</div>
              <blockquote className="text-foreground/90 leading-relaxed mb-6">"{t.q}"</blockquote>
              <figcaption>
                <div className="font-display font-bold">{t.n}</div>
                <div className="text-muted-foreground text-sm font-mono-tech mt-1">{t.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 border-t hairline overflow-hidden">
      <div className="glow-orb-cyan" style={{ top: "10%", left: "20%", opacity: 0.6 }} />
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="section-label mb-6">/ LET'S BUILD</div>
        <h2 className="font-display font-extrabold leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
          Ready to build something
          <br />
          <span className="italic text-primary">extraordinary?</span>
        </h2>
        <p className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto">
          Tell us about your project. We respond within 24 hours.
        </p>
        <a
          href="mailto:hello@step7labs.com"
          className="mt-12 inline-block font-display font-bold text-3xl md:text-5xl text-foreground hover:text-primary transition-colors break-all"
        >
          hello@step7labs.com
        </a>
        <div className="mt-12 flex items-center justify-center gap-4">
          {[Linkedin, Github, Twitter].map((Icon, i) => (
            <a key={i} href="#" className="w-11 h-11 rounded-full border hairline flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t hairline py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-display font-bold text-foreground">Step7Labs</span>
          <span className="ml-2">— Where Intelligence Meets Interface.</span>
        </div>
        <nav className="flex gap-6 font-mono-tech">
          <a href="#services" className="hover:text-foreground transition">Services</a>
          <a href="#process" className="hover:text-foreground transition">Process</a>
          <a href="#work" className="hover:text-foreground transition">Work</a>
          <a href="#contact" className="hover:text-foreground transition">Contact</a>
        </nav>
        <div className="font-mono-tech">Built with AI. Crafted with purpose.</div>
      </div>
      <div className="mx-auto max-w-7xl mt-8 pt-6 border-t hairline text-center text-xs font-mono-tech text-muted-foreground">
        © 2025 Step7Labs Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
}
