import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Check } from "lucide-react";

const referenceTiers = [
  {
    name: "Launch Website",
    price: "NPR 24,999",
    ideal: "Freelancers, Consultants, Small Businesses",
    timeline: "2–3 Weeks",
    features: [
      "Up to 5 Pages",
      "Responsive Design",
      "Contact Forms",
      "Basic SEO",
      "Analytics",
      "Deployment",
    ],
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
    features: [
      "Custom UI",
      "Advanced CMS",
      "Animations",
      "Integrations",
      "SEO Foundation",
      "Performance Optimisation",
    ],
  },
  {
    name: "Corporate Website",
    price: "NPR 79,999",
    ideal: "Construction, Healthcare, Education, Manufacturing, Large Organisations",
    timeline: "6–8 Weeks",
    features: [
      "Unlimited Core Pages",
      "Complex Navigation",
      "Advanced Components",
      "Scalable Architecture",
      "Content Strategy",
    ],
  },
  {
    name: "Ecommerce",
    price: "NPR 89,999",
    ideal: "Retail, D2C, Online Stores",
    timeline: "6–8 Weeks",
    features: [
      "Catalogue",
      "Checkout",
      "Payments",
      "Inventory",
      "Marketing Integrations",
      "Analytics",
    ],
  },
];

export function ReferencePricing() {
  return (
    <Accordion type="single" collapsible className="w-full mt-12 border-t border-border pt-6">
      <AccordionItem value="reference-pricing" className="border-none">
        <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline flex items-center justify-start gap-3">
          See detailed reference pricing
        </AccordionTrigger>
        <AccordionContent className="pt-8">
          <div className="space-y-px bg-border rounded-xl overflow-hidden">
            {referenceTiers.map((tier, idx) => (
              <div
                key={idx}
                className="bg-background grid lg:grid-cols-12 gap-8 lg:gap-12 p-8 hover:bg-surface/50 transition-colors"
              >
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl tracking-tight mb-2">
                      {tier.name}
                    </h3>
                    <div className="font-mono-tech text-muted-foreground text-xs mb-4">Starting from</div>
                    <div className="text-xl font-light">{tier.price}</div>
                  </div>
                </div>
                <div className="lg:col-span-4 space-y-6">
                  <div>
                    <div className="font-mono-tech text-muted-foreground text-xs mb-2">Ideal For</div>
                    <p className="text-foreground/80 text-sm">{tier.ideal}</p>
                  </div>
                  <div>
                    <div className="font-mono-tech text-muted-foreground text-xs mb-2">Timeline</div>
                    <p className="text-foreground/80 text-sm">{tier.timeline}</p>
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <div className="font-mono-tech text-muted-foreground text-xs mb-4">Includes</div>
                  <ul className="space-y-2">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm">
                        <Check className="w-3 h-3 text-foreground/40 mt-1 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
