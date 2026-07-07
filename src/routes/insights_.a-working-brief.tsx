import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/site/PageHero";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/insights_/a-working-brief")({
  head: () => ({
    meta: [
      { title: "A working brief: what we ask before pitching — Step7Labs" },
      {
        name: "description",
        content:
          "The seven questions that decide whether an engagement will succeed before the first sprint.",
      },
    ],
  }),
  component: Article,
});

function Article() {
  return (
    <>
      <PageHero
        eyebrow="Process · December 2025 · 7 min read"
        title="A working brief: what we ask before pitching"
        intro=""
      />

      <section className="py-16 md:py-24 border-b hairline">
        <div className="mx-auto max-w-3xl px-6 md:px-10 text-lg md:text-xl text-foreground/80 font-light leading-relaxed space-y-8">
          <p>
            The quality of a project is often determined long before the first design file is
            opened.
          </p>

          <p>
            It's tempting to think good products begin with inspiration. In practice, they usually
            begin with better questions.
          </p>

          <p>
            Over the years, we've noticed that the strongest client relationships share one
            characteristic: everyone leaves the first meeting with greater clarity than they arrived
            with. Not because every answer has been found, but because the right problems have
            finally been identified.
          </p>

          <p>A brief isn't paperwork.</p>

          <p>It's a design tool.</p>

          <p>
            When conversations begin with questions like, "How many pages do you need?" or "Which
            colours do you prefer?", we're already discussing solutions before understanding the
            problem. Those details matter eventually, but rarely at the start.
          </p>

          <p>Instead, we begin somewhere else.</p>

          <p className="italic">
            What changed inside the business that made this project necessary now?
          </p>

          <p>That single question often reveals more than an hour of feature discussions.</p>

          <p>
            Sometimes the answer is growth. A company has outgrown the website that served it well
            for years. Sometimes it's repositioning after entering a new market. Sometimes it's an
            internal process that has become painfully manual. Occasionally, nothing is technically
            broken—the business has simply evolved while the digital experience remained frozen in
            time.
          </p>

          <p>Understanding that context changes every decision that follows.</p>

          <p>Another question we return to repeatedly is surprisingly straightforward.</p>

          <p className="italic">What does success look like one year after launch?</p>

          <p>Not next month.</p>
          <p>Not immediately after deployment.</p>
          <p>A year.</p>

          <p>
            The answers tend to shift the conversation away from aesthetics and towards outcomes.
          </p>

          <p>"We want fewer support requests."</p>
          <p>"We need to hire more efficiently."</p>
          <p>"Our sales team spends too much time explaining the same things."</p>
          <p>"We want distributors to find information without calling us."</p>

          <p>Those aren't design preferences. They're business objectives.</p>

          <p>Once those objectives are clear, features become much easier to evaluate.</p>

          <p className="italic">Does this interaction move us closer to the goal?</p>

          <p>If not, why is it there?</p>

          <p>
            It's remarkable how many ideas disappear when they're measured against a clearly defined
            outcome.
          </p>

          <p>We also spend time discussing constraints, even though they're rarely exciting.</p>

          <p>Budget.</p>
          <p>Timeline.</p>
          <p>Internal approvals.</p>
          <p>Content availability.</p>
          <p>Technical limitations.</p>

          <p>
            Constraints aren't obstacles to creativity. They're the framework that gives creativity
            direction. A project with unlimited possibilities often struggles more than one with
            clearly defined boundaries.
          </p>

          <p>One area that's frequently overlooked is ownership after launch.</p>

          <p className="italic">Who updates the website?</p>
          <p className="italic">Who approves new content?</p>
          <p className="italic">Who maintains integrations?</p>
          <p className="italic">Who responds when something changes inside the business?</p>

          <p>
            These questions don't usually appear in visual mockups, yet they influence the longevity
            of every digital product. A beautifully designed system that's impossible for the
            client's team to manage eventually becomes another problem waiting to be solved.
          </p>

          <p>The same thinking applies to content.</p>

          <p>
            Many projects assume that words will somehow appear once the interface is finished.
            Reality tends to work differently. Good content shapes navigation, hierarchy and
            interaction patterns from the beginning. Waiting until the final week often leads to
            compromises that could have been avoided.
          </p>

          <p>Technology enters the conversation later than most people expect.</p>

          <p>Frameworks change.</p>
          <p>Hosting platforms evolve.</p>
          <p>Libraries come and go.</p>

          <p>The underlying business rarely changes because React released another version.</p>

          <p>
            That's why we prefer discussing technology after we've understood people, processes and
            objectives. Engineering decisions become significantly easier when the product itself is
            already well defined.
          </p>

          <p>
            Perhaps the most valuable part of a discovery session isn't the answers we receive. It's
            the assumptions that quietly disappear.
          </p>

          <p>
            Clients often arrive believing they need one solution and leave recognising a completely
            different opportunity. Occasionally the best recommendation is to build less than
            originally planned. Sometimes it's to postpone development entirely until a larger
            operational issue has been addressed.
          </p>

          <p>Those conversations don't always lead to the biggest projects.</p>

          <p>They usually lead to the right ones.</p>

          <p>
            A good brief doesn't limit creativity. It protects it from being wasted on solving the
            wrong problem.
          </p>

          <p>
            That's why we treat discovery as part of the design process rather than an
            administrative step before it begins.
          </p>

          <p>
            By the time sketches appear on a screen, many of the most important design decisions
            have already been made through careful conversation.
          </p>

          <p>The interface is simply where those decisions become visible.</p>
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
