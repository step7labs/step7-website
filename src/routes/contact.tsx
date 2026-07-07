import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "../components/site/PageHero";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { service?: string } => {
    return {
      service: (search.service as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Contact — Step7Labs" },
      {
        name: "description",
        content: "Tell us about your project. We respond within one business day.",
      },
      { property: "og:title", content: "Contact — Step7Labs" },
      {
        property: "og:description",
        content: "Get in touch with Step7Labs. We respond within one business day.",
      },
    ],
  }),
  component: ContactPage,
});

const budgetOptionsByCurrency = {
  USD: ["< $1,000", "$1,000 – $3,000", "$3,000 – $7,500", "$7,500+"],
  INR: ["< ₹85k", "₹85k – ₹2.5L", "₹2.5L – ₹6L", "₹6L+"],
  NPR: ["< NPR 1.3L", "NPR 1.3L – NPR 4L", "NPR 4L – NPR 10L", "NPR 10L+"],
} as const;
type Currency = keyof typeof budgetOptionsByCurrency;
const currencies: Currency[] = ["USD", "INR", "NPR"];

const services = ["Web Design & Development", "AI & Automation", "Custom Software", "Branding"];

const serviceIdMap: Record<string, string> = {
  web: "Web Design & Development",
  ai: "AI & Automation",
  software: "Custom Software",
  branding: "Branding"
};

function ContactPage() {
  const search = Route.useSearch();
  const [sent, setSent] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [picked, setPicked] = useState<string[]>(() => {
    if (search.service && serviceIdMap[search.service]) {
      return [serviceIdMap[search.service]];
    }
    return [];
  });

  const togglePick = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's talk about <em className="italic text-foreground/70">your project.</em>
          </>
        }
        intro="Tell us a little about what you're building. We read every message and respond within one business day."
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-12 gap-16">
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-10 text-sm">
            <div>
              <div className="section-label mb-4">/ Direct</div>
              <a
                href="mailto:hello@step7labs.com"
                className="block font-display text-2xl md:text-3xl tracking-[-0.01em] link-underline w-fit"
              >
                hello@step7labs.com
              </a>
            </div>
            <div>
              <div className="section-label mb-4">/ Studio</div>
              <p className="text-foreground/75 leading-relaxed">
                Remote-first.
                <br />
                Working hours 09:00 - 18:00 IST.
                <br />
                Monday - Friday.
              </p>
            </div>
            <div>
              <div className="section-label mb-4">/ Response</div>
              <p className="text-foreground/75 leading-relaxed">
                We reply within one business day. Engagement timelines are established following an initial review of scope and current studio availability.
              </p>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-8">
            {sent ? (
              <div className="border hairline rounded-sm p-12 text-center">
                <div className="section-label mb-4">/ Received</div>
                <h3 className="font-display text-3xl md:text-4xl tracking-[-0.01em]">
                  Thanks — we'll be in touch shortly.
                </h3>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-10"
              >
                <Field label="01 / Your name">
                  <input
                    required
                    type="text"
                    name="name"
                    className={inputCls}
                    placeholder="Full name"
                  />
                </Field>
                <Field label="02 / Email">
                  <input
                    required
                    type="email"
                    name="email"
                    className={inputCls}
                    placeholder="you@company.com"
                  />
                </Field>
                <Field label="03 / Company">
                  <input
                    type="text"
                    name="company"
                    className={inputCls}
                    placeholder="Company or product"
                  />
                </Field>

                <Field label="04 / Services needed">
                  <div className="flex flex-wrap gap-2 pt-2">
                    {services.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => togglePick(s)}
                        className={`px-4 py-2 rounded-full text-sm border transition-all ${
                          picked.includes(s)
                            ? "bg-foreground text-background border-foreground"
                            : "hairline text-muted-foreground hover:text-foreground hover:border-foreground/40"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="05 / Currency">
                  <div className="flex flex-wrap gap-2 pt-2">
                    {currencies.map((c) => (
                      <label key={c} className="cursor-pointer">
                        <input
                          type="radio"
                          name="currency"
                          value={c}
                          checked={currency === c}
                          onChange={() => setCurrency(c)}
                          className="peer sr-only"
                        />
                        <span className="px-4 py-2 rounded-full text-sm border hairline text-muted-foreground hover:text-foreground hover:border-foreground/40 peer-checked:bg-foreground peer-checked:text-background peer-checked:border-foreground inline-block transition-all">
                          {c}
                        </span>
                      </label>
                    ))}
                  </div>
                </Field>

                <Field label="06 / Estimated Investment">
                  <div className="flex flex-wrap gap-2 pt-2">
                    {budgetOptionsByCurrency[currency].map((b) => (
                      <label key={b} className="cursor-pointer">
                        <input type="radio" name="budget" value={b} className="peer sr-only" />
                        <span className="px-4 py-2 rounded-full text-sm border hairline text-muted-foreground hover:text-foreground hover:border-foreground/40 peer-checked:bg-foreground peer-checked:text-background peer-checked:border-foreground inline-block transition-all">
                          {b}
                        </span>
                      </label>
                    ))}
                  </div>
                </Field>

                <Field label="07 / About the project">
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className={inputCls}
                    placeholder="Goals, timeline, anything we should know…"
                  />
                </Field>

                <div className="pt-4">
                  <button type="submit" className="btn-primary">
                    Send inquiry <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

const inputCls =
  "w-full bg-transparent border-0 border-b hairline focus:border-foreground outline-none py-3 text-lg font-light placeholder:text-muted-foreground/50 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono-tech text-muted-foreground mb-3">{label}</div>
      {children}
    </div>
  );
}
