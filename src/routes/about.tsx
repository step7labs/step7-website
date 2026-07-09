import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/site/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Step7Labs" },
      {
        name: "description",
        content:
          "Step7Labs is a small, senior digital product studio. We design and engineer end-to-end for founders and product leaders.",
      },
      { property: "og:title", content: "About — Step7Labs" },
      {
        property: "og:description",
        content: "A small, senior team building digital products end-to-end.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    t: "Senior by default",
    d: "No layers, no handoffs. The people you brief are the people doing the work.",
  },
  {
    t: "Outcomes over output",
    d: "We measure success in business terms: activation, retention, revenue. Not pages shipped.",
  },
  {
    t: "Craft as discipline",
    d: "Quality is a constraint we don't trade. Every detail is an argument the product makes.",
  },
  {
    t: "Long horizon",
    d: "Most of our clients are long-term partners. We build for the second year, not the first sprint.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            A small studio with a <em className="italic text-foreground/70">long view.</em>
          </>
        }
        intro="Step7 Studios was founded in 2022 to do one thing well: design digital products with the seriousness they deserve. In 2026, the vision expanded with Step7 Labs, bringing engineering, AI, and automation into the same philosophy. Today, Step7 Studios continues as the design division of Step7 Labs, where every product begins with thoughtful design and is carried through by world-class engineering."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="section-label mb-6">/ What we believe</div>
          </div>
          <div className="lg:col-span-8 space-y-12">
            {values.map((v) => (
              <div
                key={v.t}
                className="grid md:grid-cols-12 gap-6 pb-12 border-b hairline last:border-0"
              >
                <h3 className="md:col-span-4 font-display text-2xl md:text-3xl tracking-[-0.01em]">
                  {v.t}
                </h3>
                <p className="md:col-span-8 text-foreground/75 text-lg leading-[1.55] font-light">
                  {v.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
      <section className="py-24 md:py-32 border-t hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="section-label mb-6">/ Team</div>
          <h2 className="font-display text-4xl md:text-6xl tracking-[-0.01em] leading-[1.02] max-w-[18ch]">
            Two founders. One studio. Trusted collaborators.
          </h2>

          <div className="mt-16 grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border border border-border rounded-3xl overflow-hidden shadow-2xl relative z-20">
            {[
              {
                n: "Founder · Design",
                r: "Visual systems, brand, and product design across every engagement.",
              },
              {
                n: "Founder · Engineering",
                r: "Architecture, performance, and the production code behind the work.",
              },
            ].map((m) => (
              <div key={m.n} className="bg-background p-10 md:p-12">
                <div className="aspect-[4/5] bg-surface rounded-sm mb-6 grid place-items-center">
                  <span className="font-display text-7xl text-foreground/10">S7</span>
                </div>
                <div className="font-mono-tech text-muted-foreground mb-3">{m.n}</div>
                <p className="text-foreground/75 text-lg leading-[1.55] font-light">{m.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Section: How We Work */}
      <section className="py-24 md:py-32 border-t hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="text-center mb-16">
            <div className="section-label mx-auto">/ Process</div>
          </div>
          <div className="grid sm:grid-cols-4 lg:grid-cols-8 gap-12 lg:gap-8">
            {[
              {
                num: "01",
                title: "Discovery",
                desc: "We listen first. A working session unpacks the business, users, constraints, and definition of done.",
              },
              {
                num: "02",
                title: "Strategy",
                desc: "Scope, success metrics, and architecture — agreed before a single screen is designed.",
              },
              {
                num: "03",
                title: "Design",
                desc: "Wireframes evolve into a high-fidelity system in Figma, reviewed weekly.",
              },
              {
                num: "04",
                title: "Build",
                desc: "Engineering ships in two-week sprints with a staging URL from day one.",
              },
              {
                num: "05",
                title: "Integration",
                desc: "Data, AI, payments, analytics — wired in with care and observability.",
              },
              {
                num: "06",
                title: "Quality",
                desc: "Performance budgets, accessibility audits, cross-device QA, end-to-end tests.",
              },
              {
                num: "07",
                title: "Launch & Support",
                desc: "Go live, monitor, iterate. Retainers available for ongoing work.",
              },
            ].map((step, idx) => (
              <div 
                key={idx} 
                className={`relative sm:col-span-2 ${idx === 4 ? "lg:col-start-2" : ""} ${idx === 6 ? "sm:col-start-2 lg:col-start-auto" : ""} text-center flex flex-col items-center`}
              >
                <div className="font-display text-7xl md:text-8xl text-foreground/10 mb-6 tracking-tighter">
                  {step.num}
                </div>
                <h3 className="font-display text-3xl mb-4">{step.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: FAQ */}
      <section className="py-24 md:py-32 border-t hairline">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="text-center mb-16">
            <div className="section-label mb-6">/ Details</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-[-0.01em]">
              Frequently asked questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: 'Why are prices "starting from"?',
                a: "Every project has unique requirements. A simple corporate site needs different architecture than an ecommerce platform. The starting price reflects our minimum engagement level for that category of work, with final costs determined by your specific feature set and complexity.",
              },
              {
                q: "How long does a project take?",
                a: "Typical websites take 3 to 8 weeks depending on size. Complex custom software or AI & automation projects can take 2 to 4 months. We provide a precise timeline alongside our proposal after the discovery phase.",
              },
              {
                q: "Can the final quotation change?",
                a: "Once we agree on the scope and you sign the proposal, the price is fixed for those deliverables. If you request new features or changes during development that fall outside the agreed scope, we will provide a separate estimate for that additional work before proceeding.",
              },
              {
                q: "Do you redesign existing websites?",
                a: "Yes. We often work with brands that have outgrown their current digital presence. We'll evaluate your existing infrastructure and either refactor it or recommend a complete rebuild on a modern stack for better performance and scalability.",
              },
              {
                q: "Will I own my website?",
                a: "Absolutely. Once the final payment is made, you own the intellectual property and source code for the product we've built. We'll transfer all relevant assets and repositories to your team.",
              },
              {
                q: "Do you provide hosting?",
                a: "We deploy our projects on modern, robust infrastructure like Vercel, AWS, or Cloudflare, and hand over the accounts to you. We'll set everything up to ensure optimal performance, but you will hold the keys and pay the infrastructure providers directly at cost.",
              },
              {
                q: "Can additional features be added later?",
                a: "Yes. We build using scalable frameworks, meaning your product can evolve alongside your business. Many of our clients return for phase two or retain us for ongoing feature development once their initial product is launched.",
              },
              {
                q: "How do we begin?",
                a: "It starts with a conversation. Fill out our contact form with some details about your project, and we'll schedule a brief discovery call to see if we're a good fit.",
              },
            ].map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-foreground/10 py-2"
              >
                <AccordionTrigger className="text-lg md:text-xl font-medium hover:no-underline hover:text-foreground/80 transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/60 leading-relaxed text-base pt-2 pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-24 border-t hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <h3 className="font-display text-3xl md:text-5xl tracking-[-0.01em] leading-[1.05]">
              Want to work together?
            </h3>
          </div>
          <div className="lg:col-span-6 md:text-right">
            <Link to="/contact" className="btn-primary">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
