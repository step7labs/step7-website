import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "../components/site/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

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
      />

      <section className="py-8 md:py-12 border-b hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
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
              We do not price websites based on arbitrary templates. Every proposal is tailored according to scope, complexity, features, integrations, content, and timeline.
            </p>
            <p className="text-foreground/60 leading-relaxed">
              The figures below represent typical starting investments. We believe in providing clear estimates upfront so you can make informed decisions about your digital products.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section Moved Below Custom Engineering */}

      {/* Section 3: Website Investment */}
      <section className="py-24 md:py-32 border-b hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-16 md:mb-24">
            <div className="section-label mb-6">/ Website Engagements</div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em] mb-6 max-w-2xl">
              Typical starting investments for standard websites.
            </h2>
            <p className="text-foreground/60 max-w-xl text-lg">
              Below are our most common website engagements. These figures represent typical starting investments. Projects may increase depending on complexity.
            </p>
          </div>

          <div className="space-y-px bg-border">
            {[
              {
                name: "Launch Website",
                price: "NPR 24,999",
                ideal: "Freelancers, Consultants, Small Businesses",
                timeline: "2–3 Weeks",
                features: ["Up to 5 Pages", "Responsive Design", "Contact Forms", "Basic SEO", "Analytics", "Deployment"],
              },
              {
                name: "Business Website",
                price: "NPR 39,999",
                ideal: "Growing Businesses, Professional Firms, Brands",
                timeline: "3–5 Weeks",
                features: ["CMS", "Blog", "SEO Setup", "Analytics", "Performance Optimisation"],
              },
              {
                name: "Professional Website",
                price: "NPR 59,999",
                ideal: "Premium Brands, Technology Companies, Growing Businesses",
                timeline: "4–6 Weeks",
                features: ["Custom UI", "Advanced CMS", "Animations", "Integrations", "SEO Foundation", "Performance Optimisation"],
              },
              {
                name: "Corporate Website",
                price: "NPR 79,999",
                ideal: "Construction, Healthcare, Education, Manufacturing, Large Organisations",
                timeline: "6–8 Weeks",
                features: ["Unlimited Core Pages", "Complex Navigation", "Advanced Components", "Scalable Architecture", "Content Strategy"],
              },
              {
                name: "Ecommerce",
                price: "NPR 89,999",
                ideal: "Retail, D2C, Online Stores",
                timeline: "6–8 Weeks",
                features: ["Catalogue", "Checkout", "Payments", "Inventory", "Marketing Integrations", "Analytics"],
              },
            ].map((tier, idx) => (
              <div key={idx} className="bg-background grid lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-12 hover:bg-surface/50 transition-colors">
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl tracking-tight mb-2">{tier.name}</h3>
                    <div className="font-mono-tech text-muted-foreground mb-6">Starting from</div>
                    <div className="text-2xl font-light">{tier.price}</div>
                  </div>
                </div>
                <div className="lg:col-span-4 space-y-6">
                  <div>
                    <div className="font-mono-tech text-muted-foreground mb-2">Ideal For</div>
                    <p className="text-foreground/80">{tier.ideal}</p>
                  </div>
                  <div>
                    <div className="font-mono-tech text-muted-foreground mb-2">Timeline</div>
                    <p className="text-foreground/80">{tier.timeline}</p>
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <div className="font-mono-tech text-muted-foreground mb-4">Includes</div>
                  <ul className="space-y-3">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm">
                        <Check className="w-4 h-4 text-foreground/40 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Custom Digital Products */}
      <section className="py-24 md:py-32 border-b hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <div className="section-label mb-6">/ Custom Engineering</div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em] mb-6">
              Tailored digital products.
            </h2>
            <p className="text-foreground/60 text-lg leading-relaxed">
              These engagements vary significantly in scope and are estimated following a detailed discovery session to understand your specific operational requirements.
            </p>
          </div>
          <div className="space-y-px bg-border">
            {[
              "Web Applications",
              "Business Automation",
              "AI Integrations",
              "Discovery Workshops",
            ].map((item, idx) => (
              <div key={idx} className="bg-background p-6 md:p-8 flex items-center justify-between group">
                <span className="font-display text-2xl md:text-3xl tracking-tight">{item}</span>
                <span className="font-mono-tech text-muted-foreground">Custom Quote</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Services */}
      <section className="py-24 md:py-32 border-b hairline bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="section-label mb-12">/ Services</div>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {[
              {
                title: "Website Design & Development",
                desc: "Modern business websites, corporate websites, landing pages and ecommerce experiences.",
              },
              {
                title: "Web Applications",
                desc: "Custom platforms, dashboards, portals and internal systems.",
              },
              {
                title: "Business Automation",
                desc: "Workflow optimisation, integrations and operational automation.",
              },
              {
                title: "AI Solutions",
                desc: "Custom AI integrations, assistants and intelligent workflows.",
              },
            ].map((s, i) => (
              <Link
                key={i}
                to="/contact"
                className="bg-background p-10 md:p-14 group hover:bg-surface transition-colors min-h-[280px] flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display text-3xl md:text-4xl mb-4 tracking-tight">{s.title}</h3>
                  <p className="text-foreground/60 leading-relaxed max-w-md">{s.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <span className="relative font-mono-tech text-foreground py-2 px-6 -ml-6 rounded-none transition-colors duration-300 group-hover:text-background z-10">
                    <span className="absolute inset-0 bg-foreground origin-center scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 ease-out -z-10"></span>
                    Request Quote
                  </span>
                  <ArrowUpRight className="w-6 h-6 text-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            ))}
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
              <div key={idx} className="flex items-center gap-4 text-foreground/80 py-2 border-b hairline">
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
          <div className="section-label mb-16">/ Process</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { num: "01", title: "Discover", desc: "Understanding your business goals, technical constraints, and defining the project scope." },
              { num: "02", title: "Design", desc: "Crafting editorial interfaces and establishing the visual language for your brand." },
              { num: "03", title: "Build", desc: "Engineering the platform with scalable, production-ready code and modern frameworks." },
              { num: "04", title: "Launch", desc: "Rigorous testing, deployment, and handing over the keys to your new digital product." },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="font-display text-7xl md:text-8xl text-foreground/10 mb-6 tracking-tighter">
                  {step.num}
                </div>
                <h3 className="font-display text-3xl mb-4">{step.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{step.desc}</p>
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
                q: "Why are prices \"starting from\"?",
                a: "Every project has unique requirements. A simple corporate site needs different architecture than an ecommerce platform. The starting price reflects our minimum engagement level for that category of work, with final costs determined by your specific feature set and complexity.",
              },
              {
                q: "How long does a project take?",
                a: "Typical websites take 3 to 8 weeks depending on size. Complex web applications or AI integrations can take 2 to 4 months. We provide a precise timeline alongside our proposal after the discovery phase.",
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
              <AccordionItem key={index} value={`item-${index}`} className="border-foreground/10 py-2">
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
          <h2 className="font-display leading-[0.98] tracking-[-0.015em] mb-10" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            Let's build something <em className="italic text-foreground/70">exceptional.</em>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-12">
            Whether you're planning a website, web application, automation workflow or AI-powered solution, we'd love to understand your goals and explore how Step7Labs can help.
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
