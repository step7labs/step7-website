import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/site/PageHero";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — Step7Labs" },
      {
        name: "description",
        content:
          "A seven-step workflow from discovery to launch and ongoing support. How we run engagements at Step7Labs.",
      },
      { property: "og:title", content: "Process — Step7Labs" },
      {
        property: "og:description",
        content:
          "A seven-step studio process from discovery to launch — and what to expect at each stage.",
      },
    ],
  }),
  component: ProcessPage,
});

const steps = [
  {
    n: "01",
    t: "Discovery",
    d: "We listen first. A working session unpacks the business, users, constraints, and definition of done.",
  },
  {
    n: "02",
    t: "Strategy",
    d: "Scope, success metrics, and architecture — agreed before a single screen is designed.",
  },
  {
    n: "03",
    t: "Design",
    d: "Wireframes evolve into a high-fidelity system in Figma, reviewed weekly.",
  },
  {
    n: "04",
    t: "Build",
    d: "Engineering ships in two-week sprints with a staging URL from day one.",
  },
  {
    n: "05",
    t: "Integration",
    d: "Data, AI, payments, analytics — wired in with care and observability.",
  },
  {
    n: "06",
    t: "Quality",
    d: "Performance budgets, accessibility audits, cross-device QA, end-to-end tests.",
  },
  {
    n: "07",
    t: "Launch & Support",
    d: "Go live, monitor, iterate. Retainers available for ongoing work.",
  },
];

function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title={<>How we work.</>}
        intro="Seven stages, sequenced to remove ambiguity and ship work we'd put our name on. Every engagement follows the same spine — adapted to the shape of your project."
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <ol className="space-y-px bg-border">
            {steps.map((s) => (
              <li
                key={s.n}
                className="bg-background grid md:grid-cols-12 gap-8 items-baseline px-2 md:px-6 py-12 md:py-16 hover:bg-surface transition-colors"
              >
                <div className="md:col-span-2 font-mono-tech text-muted-foreground">{s.n}</div>
                <h3 className="md:col-span-4 font-display text-3xl md:text-4xl tracking-[-0.01em]">
                  {s.t}
                </h3>
                <p className="md:col-span-6 text-foreground/75 leading-[1.55] font-light text-lg">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-28 border-t hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="section-label mb-6">/ Engagement</div>
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-3xl md:text-4xl tracking-[-0.01em] leading-[1.15]">
              Most project runs, 1 to 3 weeks. Retainers are available for teams that want
              ongoing design and engineering capacity without rebuilding the trust every quarter.
            </p>
            <Link to="/contact" className="mt-12 inline-flex btn-ghost">
              Discuss your timeline
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl tracking-[-0.01em] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
              Common questions about our process, pricing, and how we work with you.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg">How long does a typical project take?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Most standard website projects run between 1 to 3 weeks from kickoff to launch. More complex custom web applications, e-commerce platforms, and portals may take longer. We'll map out a clear timeline during our Discovery phase before you commit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg">What are your payment terms?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                For standard web projects, we require a 40-50% upfront deposit to secure your spot in our schedule and begin work, with the remainder due upon final delivery. For larger, custom builds, we typically split payments into milestones (e.g., 25% upfront, 25% on design approval, 50% on launch).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg">Do you offer ongoing support after launch?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Yes. All our website packages include 30 to 60 days of free post-launch support to ensure everything runs smoothly. Beyond that, we offer monthly maintenance retainers to handle updates, security, and ongoing improvements so you don't have to worry about it.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-lg">Who writes the content for my website?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                If you already have brand guidelines, text, and imagery, our team will structure and optimize it for the web. If you need everything written from scratch, we offer professional copywriting and SEO content creation as part of our Digital Growth packages.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left text-lg">Will my website be mobile-friendly and optimized for Google?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Absolutely. Mobile-responsive design, fast loading speeds, and basic on-page SEO (titles, meta descriptions, sitemaps) are non-negotiable standards for us. They are always included in every project we ship.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}
