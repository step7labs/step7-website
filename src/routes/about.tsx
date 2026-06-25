import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/site/PageHero";

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
        content:
          "A small, senior team building digital products end-to-end.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { t: "Senior by default", d: "No layers, no handoffs. The people you brief are the people doing the work." },
  { t: "Outcomes over output", d: "We measure success in business terms — activation, retention, revenue. Not pages shipped." },
  { t: "Craft as discipline", d: "Quality is a constraint we don't trade. Every detail is an argument the product makes." },
  { t: "Long horizon", d: "Most of our clients are long-term partners. We build for the second year, not the first sprint." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>A small studio with a <em className="italic text-foreground/70">long view.</em></>}
        intro="Step7Labs was founded in 2024 to do one thing well: design and engineer digital products with the seriousness they deserve. We work with founders, product leaders, and brand teams who want a senior partner, not a vendor."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="section-label mb-6">/ What we believe</div>
          </div>
          <div className="lg:col-span-8 space-y-12">
            {values.map((v) => (
              <div key={v.t} className="grid md:grid-cols-12 gap-6 pb-12 border-b hairline last:border-0">
                <h3 className="md:col-span-4 font-display text-2xl md:text-3xl tracking-[-0.01em]">{v.t}</h3>
                <p className="md:col-span-8 text-foreground/75 text-lg leading-[1.55] font-light">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 border-t hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="section-label mb-6">/ Team</div>
          <h2 className="font-display text-4xl md:text-6xl tracking-[-0.01em] leading-[1.02] max-w-[18ch]">
            Two founders. One studio. Trusted collaborators.
          </h2>

          <div className="mt-16 grid md:grid-cols-2 gap-px bg-border">
            {[
              { n: "Founder · Design", r: "Visual systems, brand, and product design across every engagement." },
              { n: "Founder · Engineering", r: "Architecture, performance, and the production code behind the work." },
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

      <section className="py-24 border-t hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <h3 className="font-display text-3xl md:text-5xl tracking-[-0.01em] leading-[1.05]">
              Want to work together?
            </h3>
          </div>
          <div className="lg:col-span-6 md:text-right">
            <Link to="/contact" className="btn-primary">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
