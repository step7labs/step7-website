import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  PRICING_DATA,
  TIER_CONFIG,
  MAINTENANCE_PACKAGES,
  type ProjectType,
  type Tier,
  type Feature,
} from "../../config/pricing-data";
import { Check, ArrowRight, Plus, Minus, Shield } from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────

type Currency = "NPR" | "USD" | "INR";

const formatCurrency = (val: number, currency: Currency = "NPR") => {
  let converted = val;
  if (currency === "USD") converted = val / 150;
  if (currency === "INR") converted = val / 1.6;

  const locales = {
    NPR: "en-IN",
    INR: "en-IN",
    USD: "en-US",
  };
  return new Intl.NumberFormat(locales[currency], {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(converted);
};

const CATEGORY_LABELS: Record<string, string> = {
  pages: "Pages",
  features: "Features & Integrations",
  addons: "Add-ons",
};

// ─── Component ───────────────────────────────────────────────────────

export function WebEstimator() {
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [currency, setCurrency] = useState<Currency>("NPR");
  const [selectedTier, setSelectedTier] = useState<Tier>("basic");
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [additionalPages, setAdditionalPages] = useState(0);
  const [maintenanceId, setMaintenanceId] = useState<string | null>(null);

  const selectedType = PRICING_DATA.projectTypes.find(
    (pt) => pt.id === selectedTypeId
  );

  // ── Handlers ─────────────────────────────────────────────────────

  const handleSelectType = (pt: ProjectType) => {
    setSelectedTypeId(pt.id);
    setAdditionalPages(0);
    setMaintenanceId(null);

    // Default to "basic" for tier-enabled, reset features
    if (pt.hasTiers) {
      setSelectedTier("basic");
      initFeatures(pt, "basic");
    } else {
      initFeatures(pt, null);
    }
  };

  const handleSelectTier = (tier: Tier) => {
    setSelectedTier(tier);
    setAdditionalPages(0);
    if (selectedType && selectedType.hasTiers) {
      initFeatures(selectedType, tier);
    }
  };

  const initFeatures = (pt: ProjectType, tier: Tier | null) => {
    const defaults = new Set<string>();
    pt.features.forEach((f) => {
      // Auto-check if it's included in the selected tier, or if it's defaultChecked
      const isIncluded = tier && f.includedInTiers?.includes(tier);
      if (isIncluded || f.defaultChecked) {
        defaults.add(f.id);
      }
    });
    setSelectedFeatures(defaults);
  };

  const toggleFeature = (feature: Feature) => {
    // Don't allow unchecking features that are included in the current tier
    const isIncluded =
      selectedType?.hasTiers &&
      feature.includedInTiers?.includes(selectedTier);
    if (isIncluded) return;

    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(feature.id)) {
        next.delete(feature.id);
      } else {
        next.add(feature.id);
      }
      return next;
    });
  };

  // ── Calculation ──────────────────────────────────────────────────

  const estimate = useMemo(() => {
    if (!selectedType) return null;

    let baseMin: number, baseMax: number;
    let timelineMin: number, timelineMax: number;
    let perPagePrice = 0;

    if (selectedType.hasTiers) {
      const tp = selectedType.tierPricing[selectedTier];
      baseMin = tp.basePriceRangeNPR[0];
      baseMax = tp.basePriceRangeNPR[1];
      timelineMin = tp.baseTimelineDays[0];
      timelineMax = tp.baseTimelineDays[1];
      perPagePrice = TIER_CONFIG[selectedTier].additionalPagePriceNPR;
    } else {
      baseMin = selectedType.fixedPricing.basePriceRangeNPR[0];
      baseMax = selectedType.fixedPricing.basePriceRangeNPR[1];
      timelineMin = selectedType.fixedPricing.baseTimelineDays[0];
      timelineMax = selectedType.fixedPricing.baseTimelineDays[1];
      perPagePrice = selectedType.fixedPricing.additionalPagePriceNPR ?? 0;
    }

    // Sum feature deltas (skip features that are tier-included)
    let featureCost = 0;
    selectedType.features.forEach((f) => {
      if (!selectedFeatures.has(f.id)) return;
      const isIncluded =
        selectedType.hasTiers && f.includedInTiers?.includes(selectedTier);
      if (!isIncluded) {
        featureCost += f.priceDeltaNPR;
      }
    });

    // Additional pages cost
    const pagesCost = additionalPages * perPagePrice;

    const subtotalMin = baseMin + featureCost + pagesCost;

    // Fixed 13k NPR range for all products
    const min = subtotalMin;
    const max = subtotalMin + 13000;

    // Timeline adjustment — roughly +1-2 days per 3 add-on features
    const addOnCount = selectedType.features.filter(
      (f) =>
        selectedFeatures.has(f.id) &&
        !(selectedType.hasTiers && f.includedInTiers?.includes(selectedTier)) &&
        f.priceDeltaNPR > 0
    ).length;
    const extraDays = Math.floor(addOnCount / 2);

    return {
      min,
      max,
      timelineMin: timelineMin + extraDays,
      timelineMax: timelineMax + extraDays,
      perPagePrice,
    };
  }, [selectedType, selectedTier, selectedFeatures, additionalPages]);

  // ── Grouped features ─────────────────────────────────────────────

  const groupedFeatures = useMemo(() => {
    if (!selectedType) return {};
    const groups: Record<string, Feature[]> = {};
    selectedType.features.forEach((f) => {
      const cat = f.category || "features";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(f);
    });
    return groups;
  }, [selectedType]);

  // ── Maintenance selection ────────────────────────────────────────

  const selectedMaintenance = MAINTENANCE_PACKAGES.find(
    (m) => m.id === maintenanceId
  );

  // ── What's included ──────────────────────────────────────────────

  const includedItems = useMemo(() => {
    if (!selectedType) return [];
    if (selectedType.hasTiers) {
      return TIER_CONFIG[selectedTier].includedItems;
    }
    // For non-tier types, return a generic list
    return [
      "**Domain, Hosting and Business emails**",
      "Mobile-responsive design",
      "Basic on-page SEO",
      "SSL certificate",
      "60 days post-launch support free",
    ];
  }, [selectedType, selectedTier]);

  const renderIncludedItem = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className="font-semibold text-black/90">
          {part.replace(/\*\*/g, "")}
        </strong>
      ) : (
        part
      )
    );
  };

  // ── Step number tracker ──────────────────────────────────────────

  let stepNumber = 1;

  return (
    <div className="space-y-8">
      {/* ──────────── Step 1: Project Type ──────────── */}
      <div className="bg-background border border-border p-6 md:p-10 rounded-xl">
        <h3 className="font-display text-2xl md:text-3xl mb-6">
          Step {stepNumber} — What are you building?
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PRICING_DATA.projectTypes.map((pt) => (
            <button
              key={pt.id}
              onClick={() => handleSelectType(pt)}
              className={`text-left p-4 rounded-lg border transition-all ${
                selectedTypeId === pt.id
                  ? "border-foreground bg-foreground/5 shadow-md"
                  : "border-border hover:border-foreground/30 hover:bg-surface"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans font-medium">{pt.label}</span>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedTypeId === pt.id
                      ? "border-foreground bg-foreground"
                      : "border-muted-foreground"
                  }`}
                >
                  {selectedTypeId === pt.id && (
                    <Check className="w-3 h-3 text-black" />
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {pt.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ──────────── Step 2: Currency Selector ──────────── */}
      {selectedType && (
        <div className="bg-background border border-border p-6 md:p-10 rounded-xl animate-fade-up">
          <h3 className="font-display text-2xl md:text-3xl mb-6">
            Step {++stepNumber} — Select your currency
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {(["NPR", "USD", "INR"] as const).map((cur) => {
              const isSelected = currency === cur;
              const labels = {
                NPR: "Nepalese Rupee",
                USD: "US Dollar",
                INR: "Indian Rupee",
              };
              return (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`text-left p-4 rounded-lg border transition-all ${
                    isSelected
                      ? "border-foreground bg-foreground/5 shadow-md"
                      : "border-border hover:border-foreground/30 hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans font-medium">{cur}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? "border-foreground bg-foreground"
                          : "border-muted-foreground"
                      }`}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3 text-black" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {labels[cur]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ──────────── Step 3: Tier Selector (if applicable) ──────────── */}
      {selectedType?.hasTiers && (
        <div className="bg-background border border-border p-6 md:p-10 rounded-xl animate-fade-up">
          <h3 className="font-display text-2xl md:text-3xl mb-6">
            Step {++stepNumber} — Choose your tier
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {(["basic", "modern"] as Tier[]).map((tier) => {
              const config = TIER_CONFIG[tier];
              const pricing = selectedType.tierPricing[tier];
              const isSelected = selectedTier === tier;
              return (
                <button
                  key={tier}
                  onClick={() => handleSelectTier(tier)}
                  className={`text-left p-6 rounded-lg border transition-all ${
                    isSelected
                      ? "border-foreground bg-foreground/5 shadow-md"
                      : "border-border hover:border-foreground/30 hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-sans font-semibold text-lg">
                      {config.label}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? "border-foreground bg-foreground"
                          : "border-muted-foreground"
                      }`}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3 text-black" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {config.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl">
                      {formatCurrency(pricing.basePriceRangeNPR[0], currency)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      starting · {config.basePageCount} pages included
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ──────────── Step 4: Features ──────────── */}
      {selectedType && (
        <div className="bg-background border border-border p-6 md:p-10 rounded-xl animate-fade-up">
          <h3 className="font-display text-2xl md:text-3xl mb-6">
            Step {++stepNumber} — Pick what you need
          </h3>

          {Object.entries(groupedFeatures).map(([category, features]) => (
            <div key={category} className="mb-6 last:mb-0">
              <h4 className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mb-3">
                {CATEGORY_LABELS[category] || category}
              </h4>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {features.map((f) => {
                  const isChecked = selectedFeatures.has(f.id);
                  const isIncluded =
                    selectedType.hasTiers &&
                    f.includedInTiers?.includes(selectedTier);
                  const showPrice =
                    !isIncluded && f.priceDeltaNPR > 0;

                  return (
                    <label
                      key={f.id}
                      onClick={() => toggleFeature(f)}
                      className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${
                        isIncluded
                          ? "border-foreground/20 bg-foreground/[0.03] cursor-default"
                          : isChecked
                          ? "border-foreground bg-foreground/5 cursor-pointer"
                          : "border-border hover:border-foreground/30 hover:bg-surface cursor-pointer"
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                          isChecked
                            ? "border-foreground bg-foreground text-black"
                            : "border-muted-foreground"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-sans text-sm select-none block">
                          {f.label}
                        </span>
                        {isIncluded && (
                          <span className="text-[11px] text-muted-foreground font-mono-tech mt-0.5 block">
                            Included
                          </span>
                        )}
                        {showPrice && (
                          <span className="text-[11px] text-muted-foreground font-mono-tech mt-0.5 block">
                            +{formatCurrency(f.priceDeltaNPR, currency)}
                          </span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {selectedType.routeToCustomSoftwareNote && (
            <div className="mt-6 p-4 bg-muted/30 border border-muted-foreground/20 rounded-lg text-sm text-foreground/80 italic">
              {selectedType.routeToCustomSoftwareNote}
            </div>
          )}
        </div>
      )}

      {/* ──────────── Step 5: Additional Pages ──────────── */}
      {selectedType && estimate && estimate.perPagePrice > 0 && (
        <div className="bg-background border border-border p-6 md:p-10 rounded-xl animate-fade-up">
          <h3 className="font-display text-2xl md:text-3xl mb-2">
            Step {++stepNumber} — Need more pages?
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            {selectedType.hasTiers
              ? `${TIER_CONFIG[selectedTier].basePageCount} pages are included in your ${TIER_CONFIG[selectedTier].label} tier.`
              : selectedType.fixedPricing.basePageCount
              ? `${selectedType.fixedPricing.basePageCount} pages are included.`
              : ""}
            {" "}Each additional page costs{" "}
            <strong className="text-foreground">
              {formatCurrency(estimate.perPagePrice, currency)}
            </strong>
            .
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() =>
                  setAdditionalPages(Math.max(0, additionalPages - 1))
                }
                className="p-3 hover:bg-surface transition-colors disabled:opacity-30"
                disabled={additionalPages === 0}
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="w-16 text-center font-mono-tech text-lg font-medium border-x border-border py-2">
                {additionalPages}
              </div>
              <button
                onClick={() => setAdditionalPages(additionalPages + 1)}
                className="p-3 hover:bg-surface transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-muted-foreground">
              extra page{additionalPages !== 1 ? "s" : ""}
              {additionalPages > 0 && (
                <span className="text-foreground ml-2 font-medium">
                  +{formatCurrency(additionalPages * estimate.perPagePrice, currency)}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ──────────── Step 6: Maintenance ──────────── */}
      {selectedType && (
        <div className="bg-background border border-border p-6 md:p-10 rounded-xl animate-fade-up">
          <h3 className="font-display text-2xl md:text-3xl mb-2">
            Step {++stepNumber} — Monthly maintenance?
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Keep your site secure, fast, and up-to-date after launch.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {/* No maintenance */}
            <button
              onClick={() => setMaintenanceId(null)}
              className={`text-left p-4 rounded-lg border transition-all ${
                maintenanceId === null
                  ? "border-foreground bg-foreground/5 shadow-md"
                  : "border-border hover:border-foreground/30 hover:bg-surface"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans font-medium text-sm">
                  No maintenance
                </span>
                <div className="w-5 h-5 rounded-full border border-foreground bg-foreground flex items-center justify-center">
                  {maintenanceId === null && (
                    <Check className="w-3 h-3 text-black" />
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                I'll handle it myself
              </p>
            </button>

            {/* Packages */}
            {MAINTENANCE_PACKAGES.map((pkg) => {
              const isSelected = maintenanceId === pkg.id;
              return (
                <button
                  key={pkg.id}
                  onClick={() => setMaintenanceId(pkg.id)}
                  className={`text-left p-4 rounded-lg border transition-all ${
                    isSelected
                      ? "border-foreground bg-foreground/5 shadow-md"
                      : "border-border hover:border-foreground/30 hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans font-medium text-sm">
                      {pkg.label}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? "border-foreground bg-foreground"
                          : "border-muted-foreground"
                      }`}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3 text-black" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {pkg.description}
                  </p>
                  <div className="font-mono-tech text-xs text-foreground/70">
                    {formatCurrency(pkg.priceRangeNPR[0], currency)} –{" "}
                    {formatCurrency(pkg.priceRangeNPR[1], currency)}/mo
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ──────────── Result Card ──────────── */}
      {selectedType && estimate && (
        <div className="bg-foreground text-black p-8 md:p-12 rounded-xl animate-fade-up">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Left: Estimate */}
            <div>
              <div className="font-mono-tech text-black/60 mb-2">
                Your Estimate
              </div>
              <h3 className="font-display text-4xl mb-1">
                {selectedType.label}
              </h3>
              {selectedType.hasTiers && (
                <span className="inline-block font-mono-tech text-sm text-black/50 mb-4 border border-black/20 rounded-full px-3 py-0.5">
                  {TIER_CONFIG[selectedTier].label} tier
                </span>
              )}

              <div className="space-y-1 mb-6 mt-4">
                <div className="text-2xl font-medium tracking-tight">
                  {formatCurrency(estimate.min, currency)} –{" "}
                  {formatCurrency(estimate.max, currency)}
                </div>
                <div className="text-black/80 font-mono-tech">
                  {estimate.timelineMin} – {estimate.timelineMax} business days
                </div>
              </div>

              {/* Maintenance line */}
              {selectedMaintenance && (
                <div className="flex items-center gap-2 text-sm text-black/70 mb-4 bg-black/10 rounded-lg px-4 py-2">
                  <Shield className="w-4 h-4 text-black/50" />
                  <span>
                    + {formatCurrency(selectedMaintenance.priceRangeNPR[0], currency)} –{" "}
                    {formatCurrency(selectedMaintenance.priceRangeNPR[1], currency)}/mo
                    maintenance
                  </span>
                </div>
              )}

              {/* Payment terms */}
              <div className="text-sm text-black/50 mb-4 space-y-1">
                <p className="italic">
                  Indicative only. Final pricing confirmed after a discovery call.
                </p>
                <p className="font-mono-tech text-xs">
                  Payment: 40-50% upfront · remainder on delivery
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  to="/contact"
                  search={{ service: selectedType.id }}
                  className="bg-black text-white hover:bg-black/90 px-6 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2 transition-colors"
                >
                  Start this project <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-black/80 hover:text-black transition-colors underline underline-offset-4"
                >
                  Talk to us instead
                </Link>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="space-y-6">
              {/* Selected features */}
              <div className="bg-black/10 rounded-lg p-6">
                <h4 className="font-sans font-medium mb-4">
                  Your Configuration
                </h4>
                <ul className="space-y-2">
                  {selectedType.features
                    .filter((f) => selectedFeatures.has(f.id))
                    .map((f) => {
                      const isIncluded =
                        selectedType.hasTiers &&
                        f.includedInTiers?.includes(selectedTier);
                      return (
                        <li
                          key={f.id}
                          className="text-sm text-black/80 flex items-start gap-2"
                        >
                          <Check className="w-4 h-4 text-black/60 shrink-0 mt-0.5" />
                          <span className="flex-1">{f.label}</span>
                          {isIncluded && (
                            <span className="text-[10px] font-mono-tech text-black/40">
                              included
                            </span>
                          )}
                        </li>
                      );
                    })}
                  {additionalPages > 0 && (
                    <li className="text-sm text-black/80 flex items-start gap-2">
                      <Plus className="w-4 h-4 text-black/60 shrink-0 mt-0.5" />
                      {additionalPages} additional page
                      {additionalPages !== 1 ? "s" : ""}
                    </li>
                  )}
                </ul>
              </div>

              {/* Always included */}
              <div className="bg-black/5 rounded-lg p-6">
                <h4 className="font-sans font-medium mb-3 text-sm text-black/60">
                  Always Included
                </h4>
                <ul className="space-y-1.5">
                  {includedItems.map((item, i) => (
                    <li
                      key={i}
                      className="text-xs text-black/50 flex items-start gap-2"
                    >
                      <Check className="w-3 h-3 text-black/30 shrink-0 mt-0.5" />
                      {renderIncludedItem(item)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
