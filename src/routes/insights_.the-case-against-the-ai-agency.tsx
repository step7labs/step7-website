import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/site/PageHero";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/insights_/the-case-against-the-ai-agency")({
  head: () => ({
    meta: [
      { title: "The case against the AI agency — Step7Labs" },
      {
        name: "description",
        content:
          "Why naming a studio after a hype cycle ages badly — and what we tell clients instead.",
      },
    ],
  }),
  component: Article,
});

function Article() {
  return (
    <>
      <PageHero
        eyebrow="Studio · January 2026 · 5 min read"
        title="The case against the AI agency"
        intro=""
      />

      <section className="py-16 md:py-24 border-b hairline">
        <div className="mx-auto max-w-3xl px-6 md:px-10 text-lg md:text-xl text-foreground/80 font-light leading-relaxed space-y-8">
          <p>
            Artificial intelligence has created an entirely new category of digital agencies almost
            overnight.
          </p>

          <p>
            Browse LinkedIn for a few minutes and you'll find hundreds of companies promising AI
            transformation, AI consulting, AI automation and AI strategy. The technology is real.
            The demand is real. The marketing, however, often tells a different story.
          </p>

          <p>
            Somewhere along the way, "AI" became the product instead of the means to build a better
            one.
          </p>

          <p>That's a mistake.</p>

          <p>
            Businesses rarely wake up wanting artificial intelligence. They want fewer repetitive
            tasks, faster customer support, better forecasting or more efficient operations. AI may
            happen to be the right way to achieve those outcomes, but it's only one of many possible
            approaches.
          </p>

          <p>
            When technology becomes the headline, the problem it's supposed to solve quietly
            disappears.
          </p>

          <p>
            We've seen proposals where "AI integration" is listed as a deliverable without
            explaining what it actually improves. Chatbots are added to websites where customers
            never asked for conversational support. Image generation appears inside products where
            search would have solved the problem more effectively. Automation is introduced for
            workflows that happen once a month.
          </p>

          <p>The result is software that feels modern without becoming useful.</p>

          <p>
            Good engineering has never been about using the newest technology. It's about choosing
            the appropriate one.
          </p>

          <p>
            There are situations where AI genuinely changes what's possible. Document analysis that
            once required hours can happen in minutes. Customer enquiries can be categorised
            automatically. Large knowledge bases become searchable through natural language instead
            of rigid navigation. Internal workflows become dramatically faster when repetitive
            decisions are delegated to intelligent systems.
          </p>

          <p>Those are meaningful improvements.</p>

          <p>But they begin with understanding the workflow, not selecting the model.</p>

          <p>
            The most successful technology projects we've encountered share a common trait. Nobody
            talks about the technology after launch.
          </p>

          <p>Nobody praises the database.</p>

          <p>Nobody compliments the API architecture.</p>

          <p>Nobody asks which cloud provider was used.</p>

          <p>People simply notice that the product works.</p>

          <p>Artificial intelligence should aspire to the same level of invisibility.</p>

          <p>
            When every button is labelled "AI-powered," the interface starts competing with itself.
            Users don't need constant reminders that a machine learning model exists somewhere
            behind the scenes. They care about outcomes.
          </p>

          <p className="italic">Can I finish this task faster?</p>
          <p className="italic">Can I trust the result?</p>
          <p className="italic">Can I correct it if it's wrong?</p>

          <p>Those questions matter far more than the underlying implementation.</p>

          <p>
            The companies likely to benefit most from AI over the next decade won't necessarily be
            the ones talking about it the loudest. They'll be the ones quietly redesigning
            workflows, removing friction and making complicated systems feel surprisingly simple.
          </p>

          <p>That's a far less exciting marketing message.</p>

          <p>It's also far closer to reality.</p>
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
