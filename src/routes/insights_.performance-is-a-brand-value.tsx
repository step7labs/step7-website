import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/site/PageHero";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/insights_/performance-is-a-brand-value")({
  head: () => ({
    meta: [
      { title: "Performance is a brand value — Step7Labs" },
      {
        name: "description",
        content:
          "Page weight, time-to-interactive, animation frame budgets — how perception is shaped before content loads.",
      },
    ],
  }),
  component: Article,
});

function Article() {
  return (
    <>
      <PageHero
        eyebrow="Engineering · November 2025 · 5 min read"
        title="Performance is a brand value"
        intro=""
      />

      <section className="py-16 md:py-24 border-b hairline">
        <div className="mx-auto max-w-3xl px-6 md:px-10 text-lg md:text-xl text-foreground/80 font-light leading-relaxed space-y-8">
          <p>
            Branding is usually discussed in terms of colour, typography, photography and tone of
            voice.
          </p>

          <p>Performance rarely enters the conversation.</p>

          <p>It should.</p>

          <p>
            Long before a visitor notices a carefully chosen typeface or a refined animation,
            they've already formed an opinion about how your company feels to interact with. That
            judgement happens in seconds, often before the homepage has fully loaded.
          </p>

          <p>Performance isn't just an engineering metric.</p>

          <p>It's communication.</p>

          <p>
            A slow website quietly suggests disorganisation. An interface that freezes during
            checkout creates doubt. Buttons that respond instantly feel dependable in ways users
            rarely notice consciously.
          </p>

          <p>These reactions are emotional before they're technical.</p>

          <p>
            Research has repeatedly shown that delays influence behaviour, but numbers only tell
            part of the story. Every unnecessary second introduces hesitation. Every hesitation
            creates an opportunity for someone to leave.
          </p>

          <p>The opposite is also true.</p>

          <p>Fast products create momentum.</p>

          <p>
            Interactions feel effortless. Navigation becomes invisible. Users stop thinking about
            the interface and focus on what they're trying to accomplish.
          </p>

          <p>That's the point.</p>

          <p>Good design removes itself from the experience.</p>

          <p>
            Modern websites often become slower for understandable reasons. High-resolution imagery,
            animation libraries, third-party integrations and marketing tools all compete for
            resources. Individually, each addition seems harmless. Collectively, they produce a
            noticeably heavier experience.
          </p>

          <p>Performance problems rarely arrive all at once.</p>

          <p>They accumulate.</p>

          <p>One script becomes three.</p>
          <p>One analytics platform becomes four.</p>
          <p>A small animation library grows into an entire ecosystem.</p>

          <p>Eventually, the homepage is downloading far more code than it actually needs.</p>

          <p>
            The irony is that many of these additions were intended to improve the user experience.
          </p>

          <p>Instead, they make the experience wait.</p>

          <p>
            We think performance deserves the same design attention as typography or layout. That
            means asking uncomfortable questions.
          </p>

          <p className="italic">
            Does this animation genuinely help someone understand the interface?
          </p>
          <p className="italic">Does this video communicate something static imagery cannot?</p>
          <p className="italic">
            Does this third-party widget provide enough value to justify its cost?
          </p>

          <p>Removing features is often the fastest optimisation available.</p>

          <p>
            Performance isn't about chasing perfect Lighthouse scores or treating milliseconds as
            trophies. Those metrics are useful, but users don't experience percentages. They
            experience responsiveness.
          </p>

          <p>They notice whether interactions feel immediate.</p>
          <p>Whether scrolling feels smooth.</p>
          <p>Whether pages appear stable instead of shifting unexpectedly.</p>
          <p>Whether the product respects their time.</p>

          <p>Those details shape perception far more than most branding guidelines acknowledge.</p>

          <p>Strong brands are remembered because every interaction reinforces the same values.</p>

          <p>
            If a company claims to value quality, its digital products should feel carefully
            engineered.
          </p>

          <p>
            If it claims to value simplicity, unnecessary complexity shouldn't appear behind the
            scenes.
          </p>

          <p>
            Performance is one of the few areas where engineering and brand strategy become almost
            impossible to separate.
          </p>

          <p>The fastest websites don't simply load quickly.</p>

          <p>They communicate competence before a single word has been read.</p>
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
