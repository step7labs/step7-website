import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/site/PageHero";

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
  { n: "01", t: "Discovery", d: "We listen first. A working session unpacks the business, users, constraints, and definition of done." },
  { n: "02", t: "Strategy", d: "Scope, success metrics, and architecture — agreed before a single screen is designed." },
  { n: "03", t: "Design", d: "Wireframes evolve into a high-fidelity system in Figma, reviewed weekly." },
  { n: "04", t: "Build", d: "Engineering ships in two-week sprints with a staging URL from day one." },
  { n: "05", t: "Integration", d: "Data, AI, payments, analytics — wired in with care and observability." },
  { n: "06", t: "Quality", d: "Performance budgets, accessibility audits, cross-device QA, end-to-end tests." },
  { n: "07", t: "Launch & Support", d: "Go live, monitor, iterate. Retainers available for ongoing work." },
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
              Most projects run six to twelve weeks. Retainers are available for teams
              that want ongoing design and engineering capacity without rebuilding the trust
              every quarter.
            </p>
            <Link to="/contact" className="mt-12 inline-flex btn-ghost">
              Discuss your timeline
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
