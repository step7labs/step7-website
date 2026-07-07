import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/site/PageHero";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/insights_/why-we-stopped-writing-custom-dashboards")({
  head: () => ({
    meta: [
      { title: "Why we stopped writing custom dashboards — Step7Labs" },
      {
        name: "description",
        content:
          "A pragmatic stack for internal tools that earn their keep without becoming a second product.",
      },
    ],
  }),
  component: Article,
});

function Article() {
  return (
    <>
      <PageHero
        eyebrow="Engineering · February 2026 · 4 min read"
        title="Why we stopped writing custom dashboards"
        intro=""
      />

      <section className="py-16 md:py-24 border-b hairline">
        <div className="mx-auto max-w-3xl px-6 md:px-10 text-lg md:text-xl text-foreground/80 font-light leading-relaxed space-y-8">
          <p>For a long time, every client conversation seemed to end the same way.</p>

          <p>"We also need a dashboard."</p>

          <p>
            The request wasn't unreasonable. Dashboards have become the default answer to almost
            every business problem. Need to track sales? Dashboard. Monitor operations? Dashboard.
            Measure marketing? Somewhere along the way, the dashboard stopped being a tool and
            became an expectation.
          </p>

          <p>So we built them.</p>

          <p>
            Some were simple reporting interfaces. Others evolved into sprawling internal systems
            with dozens of charts, filters and user roles. They looked impressive in presentations.
            The problem usually appeared six months later.
          </p>

          <p>Nobody was using them.</p>

          <p>
            When we started asking clients why, the answers were surprisingly consistent. The
            information was technically useful, but it wasn't helping anyone make decisions. Teams
            opened the dashboard because they felt they should, not because it answered an immediate
            question.
          </p>

          <p>
            The issue wasn't the design, nor was it the engineering. It was the assumption that more
            visibility automatically creates more clarity.
          </p>

          <p>It doesn't.</p>

          <p>
            Businesses rarely suffer from a lack of data anymore. They suffer from too many places
            to look for it. Finance has one system, operations another, marketing a third. Building
            a new dashboard often adds one more destination instead of simplifying the existing
            workflow.
          </p>

          <p>That realization changed the way we approached internal software.</p>

          <p>
            Instead of asking, "What should the dashboard look like?" we started asking a different
            question.
          </p>

          <p>"What decision needs to be made?"</p>

          <p>The answer is almost never "show me twenty graphs."</p>

          <p>More often, it's something far simpler.</p>

          <p className="italic">Has revenue dropped compared to last week?</p>
          <p className="italic">Which invoices need attention today?</p>
          <p className="italic">Is inventory running low?</p>
          <p className="italic">Did the deployment fail?</p>

          <p>Those are decisions, not reports.</p>

          <p>
            Once you frame the problem that way, the solution often stops looking like a dashboard
            altogether.
          </p>

          <p>Sometimes it's an automated Slack notification.</p>
          <p>Sometimes it's a weekly email.</p>
          <p>Sometimes it's a simple approval screen.</p>
          <p>
            Sometimes it's removing an entire reporting interface because the information already
            exists somewhere else.
          </p>

          <p>
            The most effective internal tools we've seen tend to disappear into the background. They
            don't ask employees to remember another login or bookmark another page. They deliver the
            right information at the moment it becomes useful.
          </p>

          <p>There's another cost that's easy to underestimate.</p>

          <p>Dashboards age quickly.</p>

          <p>
            Every new feature creates another metric. Every department requests another widget.
            Eventually, what began as a clean interface turns into an endless collection of charts
            that nobody feels comfortable removing. Maintenance quietly becomes more expensive than
            the original development.
          </p>

          <p>
            Software should become simpler as teams understand their business better. Dashboards
            often move in the opposite direction.
          </p>

          <p>
            That doesn't mean dashboards are obsolete. Some problems genuinely require them.
            Financial reporting, operational monitoring and analytics platforms all benefit from
            carefully designed interfaces that let users explore information in depth.
          </p>

          <p>
            But they should exist because people need to investigate something—not because every
            software product is expected to have one.
          </p>

          <p>
            These days, we spend far less time designing dashboards and far more time designing
            workflows.
          </p>

          <p>It's a subtle distinction, but an important one.</p>

          <p>A dashboard tells you what's happening.</p>

          <p>A well-designed workflow helps you decide what to do next.</p>

          <p>
            In our experience, businesses rarely remember the software that gave them the prettiest
            charts. They remember the software that quietly removed unnecessary work from their day.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Link to="/insights" className="btn-ghost inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
          </Link>
        </div>
      </section>
    </>
  );
}
