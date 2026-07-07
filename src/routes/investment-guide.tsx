import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "../components/site/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { WebEstimator } from "../components/pricing/WebEstimator";
import { CustomQuoteCard } from "../components/pricing/CustomQuoteCard";

export const Route = createFileRoute("/investment-guide")({
  head: () => ({
    meta: [
      { title: "Investment Guide — Step7Labs" },
      {
        name: "description",
        content:
          "Transparency in our pricing, engagement models, and the investment required for premium digital products.",
      },
    ],
  }),
  component: InvestmentGuidePage,
});

function InvestmentGuidePage() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        eyebrow="Investment Guide"
        title={
          <>
            Every project is unique, but every engagement starts with{" "}
            <em className="italic text-foreground/70">transparency.</em>
          </>
        }
        intro="This guide outlines how we approach pricing, what influences project costs, and the types of digital products we build."
        action={
          <div className="flex flex-col items-end gap-3 text-right">
            <Link to="/contact" className="btn-primary">
              Contact Studio <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <span className="text-sm text-foreground/60 font-light">For a detailed quote.</span>
          </div>
        }
      />



      {/* Section 2: Services & Investment Grid */}
      <section className="pt-12 md:pt-16 pb-24 md:pb-32 border-b hairline bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-16 md:mb-20 text-center flex flex-col items-center">
            <div className="section-label mb-6">/ Investment</div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em] mb-6 max-w-2xl">
              Configure your project.
            </h2>
            <p className="text-foreground/60 max-w-xl text-lg">
              We believe in providing clear estimates upfront so you can make informed decisions.
            </p>
          </div>

          {/* Web Design & Development (Featured Full Width) */}
          <div className="mb-24">
            <div className="mb-10">
              <h3 className="font-display text-4xl md:text-5xl mb-4">Web Design & Development</h3>
              <p className="text-foreground/80 text-xl max-w-3xl leading-relaxed">
                Brand-driven interfaces that feel deliberate, backed by production-grade engineering in React, TanStack, and headless platforms. Use our interactive estimator to configure your build.
              </p>
            </div>
            <WebEstimator />
          </div>

          {/* Other Services (3-column Grid) */}
          <div className="border-t hairline pt-24">
            <div className="mb-10">
              <h3 className="font-display text-3xl md:text-4xl mb-4">Custom Solutions</h3>
              <p className="text-foreground/80 text-lg max-w-2xl">
                For complex logic, automation, and identity work, we evaluate your specific operational needs to provide a precise architectural scope.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-px bg-border border hairline">
              {/* AI & Automation */}
              <div className="bg-background">
                <CustomQuoteCard
                  className="h-full hover:bg-surface/50 transition-colors"
                  contentClassName="p-8 md:p-10 h-full flex flex-col justify-between"
                  categoryId="ai"
                  title="AI & Automation"
                  description="Pragmatic AI features added where they move the needle, alongside internal tools and workflows that compound."
                  startingPriceNPR={13000}
                  includedFeatures={[
                    "CRM / lead-management automation",
                    "Simple workflow automation (1-3 workflows)",
                    "Basic chatbot (WhatsApp / FB / web)",
                    "Advanced AI agent / NLP chatbot",
                    "Internal dashboards & tools",
                    "Monthly AI/automation support retainer"
                  ]}
                />
              </div>

              {/* Custom Software */}
              <div className="bg-background">
                <CustomQuoteCard
                  className="h-full hover:bg-surface/50 transition-colors"
                  contentClassName="p-8 md:p-10 h-full flex flex-col justify-between"
                  categoryId="software"
                  title="Custom Software"
                  description="Complex business logic translated into scalable architectures. We build bounded, logged-in-user products."
                  startingPriceNPR={175000}
                  includedFeatures={[
                    "Mobile apps (basic MVP to mid-complexity)",
                    "SaaS platforms",
                    "Client portals",
                    "Booking systems",
                    "ERP-lite / admin panels",
                    "Discovery & scoping sessions"
                  ]}
                />
              </div>

              {/* Branding */}
              <div className="bg-background">
                <CustomQuoteCard
                  className="h-full hover:bg-surface/50 transition-colors"
                  contentClassName="p-8 md:p-10 h-full flex flex-col justify-between"
                  categoryId="branding"
                  title="Branding"
                  description="Identity work for digital-first companies. Marks, typography, voice, and motion principles."
                  startingPriceNPR={12000}
                  includedFeatures={[
                    "Logo design",
                    "Full brand identity (colors, fonts, templates)",
                    "Brand guidelines document",
                    "Social media graphics",
                    "Launch assets"
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 border-b hairline">
        <div
          className="mx-auto max-w-7xl px-6 md:px-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Link to="/contact" className="btn-primary">
            Start a project <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/work" className="btn-ghost">
            View our work
          </Link>
        </div>
      </section>

      {/* Section 1: How We Price */}
      <section className="py-24 md:py-32 border-b hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="section-label mb-6">/ Approach</div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em]">
              How we price projects.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-xl md:text-2xl font-light text-foreground/80 leading-relaxed mb-8">
              We do not price websites based on arbitrary templates. Every proposal is tailored
              according to scope, complexity, features, integrations, content, and timeline.
            </p>
            <p className="text-foreground/60 leading-relaxed">
              The figures below represent typical starting investments. We believe in providing
              clear estimates upfront so you can make informed decisions about your digital
              products.
            </p>
          </div>
        </div>
      </section>



      {/* Section 5: What's Included */}
      <section className="py-24 md:py-32 border-b hairline bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="section-label mb-6">/ Standard</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">
              Included in every project
            </h2>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-12 gap-y-6">
            {[
              "Discovery Session",
              "Custom Design",
              "Responsive Development",
              "Performance Optimisation",
              "Security Best Practices",
              "Basic SEO",
              "Analytics Setup",
              "Deployment Assistance",
              "Source Code Ownership",
              "Post-launch Support",
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 text-foreground/80 py-2 border-b hairline"
              >
                <Check className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: How We Work */}
      <section className="py-24 md:py-32 border-b hairline">
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

      {/* Section 7: FAQ */}
      <section className="py-24 md:py-32 border-b hairline">
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

      {/* Final CTA */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10 text-center">
          <div className="section-label mb-8">/ Next Steps</div>
          <h2
            className="font-display leading-[0.98] tracking-[-0.015em] mb-10"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            Let's build something <em className="italic text-foreground/70">exceptional.</em>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-12">
            Whether you're planning a website, web application, automation workflow or AI-powered
            solution, we'd love to understand your goals and explore how Step7Labs can help.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Start a project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Schedule Discovery
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
