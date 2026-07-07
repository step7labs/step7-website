import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/site/PageHero";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Step7Labs" },
      {
        name: "description",
        content:
          "Web design & development, AI & automation, custom software, and branding services for ambitious teams.",
      },
      { property: "og:title", content: "Services — Step7Labs" },
      {
        property: "og:description",
        content:
          "A focused set of services: web design & development, AI & automation, custom software, branding.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    id: "web",
    t: "Web Design & Development",
    d: "Brand-driven interfaces that feel deliberate, backed by production-grade engineering in React, TanStack, and headless platforms. We ship fast websites and applications built to scale with the business.",
    bullets: [
      "Corporate Websites",
      "Landing Pages",
      "Ecommerce",
      "Web Applications",
      "UI/UX",
      "CMS",
      "Custom Portals",
      "Website Maintenance"
    ],
  },
  {
    id: "ai",
    t: "AI & Automation",
    d: "Pragmatic AI features added where they move the needle, alongside internal tools and workflows that compound. We help teams remove manual work without locking into rigid platforms.",
    // note: "An emerging part of our practice — the same in-house team, applied to workflow and AI work.",
    bullets: [
      "Workflow Automation",
      "AI Integration",
      "AI Assistants",
      "Internal Dashboards",
      "CRM Automation",
      "Internal Business Tools"
    ],
  },
  {
    id: "software",
    t: "Custom Software",
    d: "Complex business logic translated into scalable architectures. We build bounded, logged-in-user products designed for specific operational needs or multi-tenant audiences.",
    bullets: [
      "SaaS",
      "Platforms",
      "Client Portals",
      "Booking Systems",
      "ERP-lite",
      "Admin Panels",
      "API Integrations"
    ],
  },
  {
    id: "branding",
    t: "Branding",
    d: "Identity work for digital-first companies. Marks, typography, voice, and motion principles — built to live as well in code as on a deck.",
    bullets: [
      "Identity systems", 
      "Naming & voice", 
      "Brand guidelines", 
      "Launch assets",
      "SEO", 
      "Analytics", 
      "Performance", 
      "Paid Advertising Strategy", 
      "Maintenance", 
      "Consulting"
    ],
  },
];

type Service = {
  id: string;
  t: string;
  d: string;
  note?: string;
  bullets: string[];
};

function ServiceCategoryCard({ service, isOpen, onClick }: { service: Service, isOpen: boolean, onClick: () => void }) {
  return (
    <article
      className="bg-background px-2 md:px-6 py-14 md:py-20 hover:bg-surface transition-colors cursor-pointer group"
      onClick={onClick}
    >
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-12 flex justify-between items-center md:col-start-3 md:col-span-10 lg:col-start-1 lg:col-span-6">
          <h2 className="font-display text-3xl md:text-5xl tracking-[-0.01em]">{service.t}</h2>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-muted-foreground w-8 h-8 flex items-center justify-center rounded-full border border-border group-hover:border-foreground/30 transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
        
        <div className="md:col-span-12 md:col-start-3 md:col-span-10 lg:col-span-6 space-y-6">
          <p className="text-foreground/80 text-lg leading-[1.55] font-light">{service.d}</p>
          {service.note && (
             <p className="text-sm font-mono-tech text-muted-foreground italic border-l border-muted-foreground/30 pl-4">{service.note}</p>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid md:grid-cols-12 gap-10 pt-10">
              <div className="md:col-span-12 md:col-start-3 md:col-span-10 lg:col-start-7 lg:col-span-6">
                <div className="section-label mb-6">/ Included Capabilities</div>
                <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-foreground/70">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="text-muted-foreground">—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

function ServicesPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            A focused studio,
            <br />
            <em className="italic text-foreground/70">end to end.</em>
          </>
        }
        intro="We're a small team handling strategy, design, and engineering in-house. Most projects engage two or three of the services below — sequenced for outcomes, not deliverables."
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="space-y-px bg-border">
            {services.map((s) => (
              <ServiceCategoryCard
                key={s.id}
                service={s}
                isOpen={openId === s.id}
                onClick={() => setOpenId(openId === s.id ? null : s.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 border-t hairline bg-surface/30 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <div className="section-label mx-auto mb-6">/ Investment</div>
          <h3 className="font-display text-4xl md:text-5xl tracking-[-0.01em]">
            Transparent pricing.
          </h3>
          <p className="mt-6 text-foreground/70 text-lg leading-relaxed">
            We believe in clear estimates upfront. Explore our starting rates and use our interactive estimator to configure your next project.
          </p>
          <Link to="/investment-guide" className="mt-10 inline-flex btn-ghost">
            See our prices <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
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

