import { useState } from "react";
import { WebEstimator } from "./WebEstimator";
import { CustomQuoteCard } from "./CustomQuoteCard";
import { ReferencePricing } from "./ReferencePricing";

const tabs = [
  { id: "web", label: "Web Design & Development" },
  { id: "ai", label: "AI & Automation" },
  { id: "software", label: "Custom Software" },
  { id: "branding", label: "Branding" },
];

export function InvestmentTabs() {
  const [activeTab, setActiveTab] = useState("web");

  return (
    <div className="w-full">
      <div className="flex overflow-x-auto hide-scrollbar border-b border-border mb-10">
        <div className="flex min-w-max gap-8 px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
        {activeTab === "web" && <WebEstimator />}
        
        {activeTab === "ai" && (
          <CustomQuoteCard
            categoryId="ai"
            title="AI & Automation"
            description="Pragmatic AI features added where they move the needle, alongside internal tools and workflows that compound. We help teams remove manual work without locking into rigid platforms."
            startingPriceNPR={100000} // Placeholder
            includedFeatures={[
              "Workflow Automation",
              "AI Integration",
              "AI Assistants",
              "Internal Dashboards",
              "CRM Automation",
              "Internal Business Tools"
            ]}
          />
        )}

        {activeTab === "software" && (
          <CustomQuoteCard
            categoryId="software"
            title="Custom Software"
            description="Complex business logic translated into scalable architectures. We build bounded, logged-in-user products designed for specific operational needs or multi-tenant audiences."
            startingPriceNPR={200000} // Placeholder
            includedFeatures={[
              "SaaS",
              "Platforms",
              "Client Portals",
              "Booking Systems",
              "ERP-lite",
              "Admin Panels",
              "API Integrations"
            ]}
          />
        )}

        {activeTab === "branding" && (
          <CustomQuoteCard
            categoryId="branding"
            title="Branding"
            description="Identity work for digital-first companies. Marks, typography, voice, and motion principles — built to live as well in code as on a deck."
            startingPriceNPR={80000} // Placeholder
            includedFeatures={[
              "Identity systems", 
              "Naming & voice", 
              "Brand guidelines", 
              "Launch assets",
              "SEO", 
              "Analytics", 
              "Performance", 
              "Paid Advertising Strategy", 
              "Maintenance", 
              "Consulting"
            ]}
          />
        )}
      </div>

      <ReferencePricing />
    </div>
  );
}
