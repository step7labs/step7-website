import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/site/PageHero";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Step7Labs" },
      {
        name: "description",
        content:
          "Essays and field notes on digital product design, engineering, and AI from the Step7Labs team.",
      },
      { property: "og:title", content: "Insights — Step7Labs" },
      {
        property: "og:description",
        content: "Field notes on product, design, engineering, and AI.",
      },
    ],
  }),
  component: InsightsPage,
});

const posts = [
  {
    title: "Designing for trust in an AI-first product",
    cat: "Design",
    date: "Mar 2026",
    read: "6 min",
    excerpt: "Trust isn't a microcopy decision. It's a system — and AI features make every weak point louder.",
  },
  {
    title: "Why we stopped writing custom dashboards",
    cat: "Engineering",
    date: "Feb 2026",
    read: "4 min",
    excerpt: "A pragmatic stack for internal tools that earn their keep without becoming a second product.",
  },
  {
    title: "The case against the AI agency",
    cat: "Studio",
    date: "Jan 2026",
    read: "5 min",
    excerpt: "Why naming a studio after a hype cycle ages badly — and what we tell clients instead.",
  },
  {
    title: "A working brief: what we ask before pitching",
    cat: "Process",
    date: "Dec 2025",
    read: "7 min",
    excerpt: "The seven questions that decide whether an engagement will succeed before the first sprint.",
  },
  {
    title: "Performance is a brand value",
    cat: "Engineering",
    date: "Nov 2025",
    read: "5 min",
    excerpt: "Page weight, time-to-interactive, animation frame budgets — how perception is shaped before content loads.",
  },
];

function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>Field notes from <em className="italic text-foreground/70">the studio.</em></>}
        intro="Essays and short writing on product, design, engineering, and AI. Published when we have something worth saying — not on a schedule."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="space-y-px bg-border">
            {posts.map((p, idx) => (
              <Link
                key={p.title}
                to="/insights"
                className="bg-background grid md:grid-cols-12 gap-6 items-baseline px-2 md:px-6 py-10 md:py-12 hover:bg-surface transition-colors group"
              >
                <div className="md:col-span-1 font-mono-tech text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="md:col-span-7 font-display text-2xl md:text-3xl tracking-[-0.01em] flex items-start gap-3">
                  {p.title}
                  <ArrowUpRight className="w-5 h-5 mt-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" />
                </h3>
                <div className="md:col-span-2 text-sm text-muted-foreground">{p.cat}</div>
                <div className="md:col-span-1 font-mono-tech text-muted-foreground">{p.date}</div>
                <div className="md:col-span-1 font-mono-tech text-muted-foreground md:text-right">{p.read}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
