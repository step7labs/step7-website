import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  PRICING_DATA,
  TIER_CONFIG,
  MAINTENANCE_PACKAGES,
  type ProjectType,
  type Tier,
  type Feature,
} from "../../config/pricing-data";
import {
  CURRENCIES,
  EMPTY_CONFIG,
  MAX_EXTRA_PAGES,
  NPR_PER_UNIT,
  estimate as computeEstimate,
  findMaintenance,
  findProjectType,
  formatMoney,
  formatRange,
  initialPicks,
  isLocked,
  loadConfig,
  saveConfig,
  selection,
  summarize,
  togglePick,
  type Currency,
  type EstimatorConfig,
} from "../../lib/estimate";
import { Check, ArrowRight, ArrowDown, Plus, Minus, Shield, RotateCcw } from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  pages: "Pages",
  features: "Features & Integrations",
  addons: "Add-ons",
};

const CURRENCY_LABELS: Record<Currency, string> = {
  NPR: "Nepalese Rupee",
  USD: "US Dollar",
  INR: "Indian Rupee",
};

const GENERIC_INCLUDED = [
  "**Domain, Hosting and Business emails**",
  "Mobile-responsive design",
  "Basic on-page SEO",
  "SSL certificate",
  "60 days post-launch support free",
];

const RANGE_DRIVERS = [
  "How ready your content, copy and images are",
  "Number of revision rounds and stakeholders",
  "Complexity of integrations and data migration",
  "How soon you need to launch",
];

const renderIncludedItem = (text: string) =>
  text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-black/90">
        {part.replace(/\*\*/g, "")}
      </strong>
    ) : (
      part
    ),
  );

// A selectable card backed by a real (visually hidden) radio or checkbox, so it works with
// the keyboard and screen readers. The outline appears only for keyboard focus.
function OptionCard({
  type,
  name,
  checked,
  disabled,
  onChange,
  className = "p-4",
  children,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label
      className={`relative block text-left rounded-lg border transition-all has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-foreground ${className} ${
        disabled
          ? "border-foreground/20 bg-foreground/[0.03] cursor-default"
          : checked
            ? "border-foreground bg-foreground/5 shadow-md cursor-pointer"
            : "border-border hover:border-foreground/30 hover:bg-surface cursor-pointer"
      }`}
    >
      <input
        type={type}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only"
      />
      {children}
    </label>
  );
}

function Indicator({ shape, on }: { shape: "radio" | "checkbox"; on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 ${
        shape === "radio" ? "rounded-full" : "rounded"
      } ${on ? "border-foreground bg-foreground text-black" : "border-muted-foreground"}`}
    >
      {on && <Check className={shape === "radio" ? "w-3 h-3" : "w-3.5 h-3.5"} />}
    </span>
  );
}

function Step({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  const headingId = useId();
  return (
    <fieldset
      aria-labelledby={headingId}
      className="bg-background border border-border p-6 md:p-10 rounded-xl animate-fade-up min-w-0"
    >
      <h3 id={headingId} className={`font-display text-2xl md:text-3xl ${intro ? "mb-2" : "mb-6"}`}>
        {title}
      </h3>
      {intro && <div className="text-sm text-muted-foreground mb-6">{intro}</div>}
      {children}
    </fieldset>
  );
}

// ─── Component ───────────────────────────────────────────────────────

export function WebEstimator() {
  const [cfg, setCfg] = useState<EstimatorConfig>(EMPTY_CONFIG);
  const [restored, setRestored] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  // Restore after mount (sessionStorage is browser-only), then keep it saved.
  useEffect(() => {
    const saved = loadConfig();
    if (saved) setCfg(saved);
    setRestored(true);
  }, []);
  useEffect(() => {
    if (restored) saveConfig(cfg);
  }, [cfg, restored]);

  const selectedType = findProjectType(cfg.typeId);
  const tier = cfg.tier;
  const currency = cfg.currency;

  const on = useMemo(
    () => (selectedType ? selection(selectedType, cfg) : new Set<string>()),
    [selectedType, cfg],
  );
  const estimate = useMemo(
    () => (selectedType ? computeEstimate(selectedType, cfg) : null),
    [selectedType, cfg],
  );

  // Basic → Modern nudge: same picks, but Modern includes many of them.
  const modernEstimate = useMemo(
    () =>
      selectedType?.hasTiers && tier === "basic"
        ? computeEstimate(selectedType, { ...cfg, tier: "modern" })
        : null,
    [selectedType, tier, cfg],
  );
  const showModernNudge = !!(estimate && modernEstimate && modernEstimate.min <= estimate.min);

  // Announce price changes politely, after the client stops clicking.
  useEffect(() => {
    if (!selectedType || !estimate) return;
    const text = `Estimate ${formatRange(estimate.min, estimate.max, currency)}, ${estimate.timelineMin} to ${estimate.timelineMax} business days.`;
    const t = window.setTimeout(() => setAnnouncement(text), 700);
    return () => window.clearTimeout(t);
  }, [selectedType, estimate, currency]);

  // ── Handlers ─────────────────────────────────────────────────────

  const update = (patch: Partial<EstimatorConfig>) => setCfg((c) => ({ ...c, ...patch }));

  // A different project starts fresh; currency and maintenance carry over.
  const handleSelectType = (pt: ProjectType) => {
    if (pt.id === cfg.typeId) return;
    update({ typeId: pt.id, tier: "basic", picks: initialPicks(pt, "basic"), extraPages: 0 });
  };

  const handleToggle = (f: Feature) => {
    if (!selectedType) return;
    update({ picks: togglePick(selectedType, cfg.picks, f.id, tier) });
  };

  const setExtraPages = (n: number) =>
    update({ extraPages: Math.min(MAX_EXTRA_PAGES, Math.max(0, n)) });

  const handleReset = () => setCfg({ ...EMPTY_CONFIG, currency });

  // ── Grouped features ─────────────────────────────────────────────

  const groupedFeatures = useMemo(() => {
    if (!selectedType) return {};
    const groups: Record<string, Feature[]> = {};
    selectedType.features.forEach((f) => {
      (groups[f.category] ??= []).push(f);
    });
    return groups;
  }, [selectedType]);

  const selectedMaintenance = findMaintenance(cfg.maintenanceId);
  const includedItems = selectedType?.hasTiers ? TIER_CONFIG[tier].includedItems : GENERIC_INCLUDED;

  const plan = estimate?.pagePlan ?? null;
  const freePageSlots = plan ? Math.max(0, plan.allowance - (estimate?.pagesUsed ?? 0)) : 0;

  const featureMeta = (f: Feature, locked: boolean, checked: boolean) => {
    if (!selectedType) return null;
    if (locked) return "Included";
    if (plan && f.category === "pages") {
      if (checked) return "Uses 1 page";
      return freePageSlots > 0
        ? "Free · within included pages"
        : `+${formatMoney(plan.perPage, currency)}`;
    }
    return f.priceDeltaNPR > 0 ? `+${formatMoney(f.priceDeltaNPR, currency)}` : null;
  };

  let stepNumber = 1;

  return (
    <div className="space-y-8">
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      {/* ──────────── Step 1: Project Type ──────────── */}
      <Step title={`Step ${stepNumber} — What are you building?`}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PRICING_DATA.projectTypes.map((pt) => {
            const isSelected = cfg.typeId === pt.id;
            return (
              <OptionCard
                key={pt.id}
                type="radio"
                name="estimator-project"
                checked={isSelected}
                onChange={() => handleSelectType(pt)}
              >
                <span className="flex items-center justify-between mb-2">
                  <span className="font-sans font-medium">{pt.label}</span>
                  <Indicator shape="radio" on={isSelected} />
                </span>
                <span className="block text-xs text-muted-foreground">{pt.description}</span>
              </OptionCard>
            );
          })}
        </div>
      </Step>

      {/* ──────────── Step 2: Currency ──────────── */}
      {selectedType && (
        <Step
          title={`Step ${++stepNumber} — Select your currency`}
          intro={`Approximate conversion (NPR ${NPR_PER_UNIT.USD} = USD 1, NPR ${NPR_PER_UNIT.INR} = INR 1). Final invoices are in NPR.`}
        >
          <div className="grid sm:grid-cols-3 gap-4">
            {CURRENCIES.map((cur) => (
              <OptionCard
                key={cur}
                type="radio"
                name="estimator-currency"
                checked={currency === cur}
                onChange={() => update({ currency: cur })}
              >
                <span className="flex items-center justify-between mb-2">
                  <span className="font-sans font-medium">{cur}</span>
                  <Indicator shape="radio" on={currency === cur} />
                </span>
                <span className="block text-xs text-muted-foreground">{CURRENCY_LABELS[cur]}</span>
              </OptionCard>
            ))}
          </div>
        </Step>
      )}

      {/* ──────────── Step 3: Tier (if applicable) ──────────── */}
      {selectedType?.hasTiers && (
        <Step
          title={`Step ${++stepNumber} — Choose your tier`}
          intro="Switching tier keeps everything you've picked."
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {(["basic", "modern"] as Tier[]).map((t) => {
              const config = TIER_CONFIG[t];
              const pricing = selectedType.tierPricing[t];
              return (
                <OptionCard
                  key={t}
                  type="radio"
                  name="estimator-tier"
                  checked={tier === t}
                  onChange={() => update({ tier: t })}
                  className="p-6"
                >
                  <span className="flex items-center justify-between mb-3">
                    <span className="font-sans font-semibold text-lg">{config.label}</span>
                    <Indicator shape="radio" on={tier === t} />
                  </span>
                  <span className="block text-sm text-muted-foreground mb-4">
                    {config.description}
                  </span>
                  <span className="flex items-baseline gap-2">
                    <span className="font-display text-2xl">
                      {formatMoney(pricing.basePriceRangeNPR[0], currency)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      starting · {config.basePageCount} pages included
                    </span>
                  </span>
                </OptionCard>
              );
            })}
          </div>
        </Step>
      )}

      {/* ──────────── Step 4: Features ──────────── */}
      {selectedType && estimate && (
        <Step title={`Step ${++stepNumber} — Pick what you need`}>
          {Object.entries(groupedFeatures).map(([category, features]) => (
            <fieldset key={category} className="mb-6 last:mb-0 min-w-0">
              <legend className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mb-3">
                {CATEGORY_LABELS[category] || category}
                {category === "pages" && plan && (
                  <span className="normal-case tracking-normal font-sans ml-2">
                    — {estimate.pagesUsed} of {plan.allowance} included pages used
                  </span>
                )}
              </legend>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {features.map((f) => {
                  const locked = isLocked(selectedType, f, tier);
                  const checked = on.has(f.id);
                  const meta = featureMeta(f, locked, checked);
                  const needs = f.requires
                    ?.map((r) => selectedType.features.find((x) => x.id === r)?.label)
                    .filter(Boolean);
                  return (
                    <OptionCard
                      key={f.id}
                      type="checkbox"
                      name={`estimator-feature-${f.id}`}
                      checked={checked}
                      disabled={locked}
                      onChange={() => handleToggle(f)}
                    >
                      <span className="flex items-start gap-3">
                        <span className="mt-0.5">
                          <Indicator shape="checkbox" on={checked} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="font-sans text-sm block">{f.label}</span>
                          {meta && (
                            <span className="text-[11px] text-muted-foreground font-mono-tech mt-0.5 block">
                              {meta}
                            </span>
                          )}
                          {needs && needs.length > 0 && (
                            <span className="text-[11px] text-muted-foreground mt-0.5 block">
                              Comes with {needs.join(", ")}
                            </span>
                          )}
                        </span>
                      </span>
                    </OptionCard>
                  );
                })}
              </div>
            </fieldset>
          ))}

          {showModernNudge && modernEstimate && (
            <div className="mt-6 p-4 border border-foreground/30 rounded-lg text-sm flex flex-wrap items-center justify-between gap-4">
              <p className="text-foreground/85">
                <strong className="font-medium text-foreground">Modern would cost less.</strong> It
                includes much of what you've picked, plus custom design and CMS, from{" "}
                {formatMoney(modernEstimate.min, currency, "down")} (your Basic build starts at{" "}
                {formatMoney(estimate.min, currency, "down")}).
              </p>
              <button
                type="button"
                onClick={() => update({ tier: "modern" })}
                className="px-4 py-2 rounded-full text-sm border border-foreground hover:bg-foreground hover:text-black transition-colors"
              >
                Switch to Modern
              </button>
            </div>
          )}

          {selectedType.routeToCustomSoftwareNote && (
            <div className="mt-6 p-4 bg-muted/30 border border-muted-foreground/20 rounded-lg text-sm text-foreground/80 italic">
              {selectedType.routeToCustomSoftwareNote}
            </div>
          )}
        </Step>
      )}

      {/* ──────────── Step 5: Additional Pages ──────────── */}
      {selectedType && estimate && plan && (
        <Step
          title={`Step ${++stepNumber} — Need more pages?`}
          intro={
            <>
              {selectedType.hasTiers
                ? `Your ${TIER_CONFIG[tier].label} tier includes ${plan.allowance} pages`
                : `${plan.allowance} pages are included`}
              ; you're using {estimate.pagesUsed}. Each page beyond that costs{" "}
              <strong className="text-foreground">{formatMoney(plan.perPage, currency)}</strong>.
            </>
          }
        >
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setExtraPages(cfg.extraPages - 1)}
                className="p-3 hover:bg-surface transition-colors disabled:opacity-30"
                disabled={cfg.extraPages === 0}
                aria-label="Remove one page"
              >
                <Minus className="w-4 h-4" />
              </button>
              <output
                aria-label="Extra pages"
                className="w-16 text-center font-mono-tech text-lg font-medium border-x border-border py-2"
              >
                {cfg.extraPages}
              </output>
              <button
                type="button"
                onClick={() => setExtraPages(cfg.extraPages + 1)}
                className="p-3 hover:bg-surface transition-colors disabled:opacity-30"
                disabled={cfg.extraPages >= MAX_EXTRA_PAGES}
                aria-label="Add one page"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-muted-foreground">
              extra page{cfg.extraPages !== 1 ? "s" : ""}
              {estimate.chargeablePages > 0 && (
                <span className="text-foreground ml-2 font-medium">
                  {estimate.chargeablePages} beyond your included pages · +
                  {formatMoney(estimate.chargeablePages * plan.perPage, currency)}
                </span>
              )}
            </div>
          </div>
          {cfg.extraPages >= MAX_EXTRA_PAGES && (
            <p className="mt-4 text-sm text-foreground/80">
              Need more than {MAX_EXTRA_PAGES} extra pages? That's a custom build —{" "}
              <Link
                to="/contact"
                search={{ service: "web" }}
                className="underline underline-offset-4"
              >
                talk to us
              </Link>{" "}
              for a tailored quote.
            </p>
          )}
        </Step>
      )}

      {/* ──────────── Step 6: Maintenance ──────────── */}
      {selectedType && (
        <Step
          title={`Step ${++stepNumber} — Monthly maintenance?`}
          intro="Keep your site secure, fast, and up-to-date after launch."
        >
          <div className="grid sm:grid-cols-3 gap-4">
            <OptionCard
              type="radio"
              name="estimator-maintenance"
              checked={cfg.maintenanceId === null}
              onChange={() => update({ maintenanceId: null })}
            >
              <span className="flex items-center justify-between mb-2">
                <span className="font-sans font-medium text-sm">No maintenance</span>
                <Indicator shape="radio" on={cfg.maintenanceId === null} />
              </span>
              <span className="block text-xs text-muted-foreground">I'll handle it myself</span>
            </OptionCard>

            {MAINTENANCE_PACKAGES.map((pkg) => {
              const isSelected = cfg.maintenanceId === pkg.id;
              return (
                <OptionCard
                  key={pkg.id}
                  type="radio"
                  name="estimator-maintenance"
                  checked={isSelected}
                  onChange={() => update({ maintenanceId: pkg.id })}
                >
                  <span className="flex items-center justify-between mb-2">
                    <span className="font-sans font-medium text-sm">{pkg.label}</span>
                    <Indicator shape="radio" on={isSelected} />
                  </span>
                  <span className="block text-xs text-muted-foreground mb-2">
                    {pkg.description}
                  </span>
                  <span className="block font-mono-tech text-xs text-foreground/70">
                    {formatMoney(pkg.priceRangeNPR[0], currency)} –{" "}
                    {formatMoney(pkg.priceRangeNPR[1], currency)}/mo
                  </span>
                </OptionCard>
              );
            })}
          </div>
        </Step>
      )}

      {/* ──────────── Sticky live total ──────────── */}
      {selectedType && estimate && (
        <div className="sticky bottom-4 z-30" aria-hidden="true">
          <div className="flex items-center justify-between gap-4 rounded-full border border-border bg-black/85 backdrop-blur-xl px-5 py-3 shadow-2xl">
            <div className="min-w-0">
              <div className="font-mono-tech text-muted-foreground truncate">
                {selectedType.label}
                {selectedType.hasTiers ? ` · ${TIER_CONFIG[tier].label}` : ""}
              </div>
              <div className="text-sm md:text-base font-medium">
                {formatRange(estimate.min, estimate.max, currency)}
                <span className="block sm:inline text-muted-foreground font-normal text-xs sm:text-sm md:text-base">
                  <span className="hidden sm:inline"> · </span>
                  {estimate.timelineMin}–{estimate.timelineMax} days
                </span>
              </div>
            </div>
            <a
              href="#estimate-result"
              tabIndex={-1}
              className="shrink-0 inline-flex items-center gap-1.5 text-sm text-foreground/85 hover:text-foreground"
            >
              Details <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* ──────────── Result Card ──────────── */}
      {selectedType && estimate && (
        <div
          id="estimate-result"
          className="bg-foreground text-black p-8 md:p-12 rounded-xl animate-fade-up scroll-mt-24"
        >
          <div className="grid md:grid-cols-2 gap-10">
            {/* Left: Estimate */}
            <div>
              <div className="font-mono-tech text-black/60 mb-2">Your Estimate</div>
              <h3 className="font-display text-4xl mb-1">{selectedType.label}</h3>
              {selectedType.hasTiers && (
                <span className="inline-block font-mono-tech text-sm text-black/50 mb-4 border border-black/20 rounded-full px-3 py-0.5">
                  {TIER_CONFIG[tier].label} tier
                </span>
              )}

              <div className="space-y-1 mb-6 mt-4">
                <div className="text-2xl font-medium tracking-tight">
                  {formatRange(estimate.min, estimate.max, currency)}
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
                    + {formatMoney(selectedMaintenance.priceRangeNPR[0], currency)} –{" "}
                    {formatMoney(selectedMaintenance.priceRangeNPR[1], currency)}/mo maintenance
                  </span>
                </div>
              )}

              <div className="text-sm text-black/60 mb-4">
                <p className="font-medium text-black/70 mb-1">What moves this range</p>
                <ul className="list-disc pl-5 space-y-0.5">
                  {RANGE_DRIVERS.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>

              {/* Payment terms */}
              <div className="text-sm text-black/50 mb-4 space-y-1">
                <p className="italic">
                  Indicative only. Final pricing confirmed after a discovery call.
                  {currency !== "NPR" && " Converted figures are approximate; invoices are in NPR."}
                </p>
                <p className="font-mono-tech text-xs">
                  Payment: 40-50% upfront · remainder on delivery
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  to="/contact"
                  search={{
                    service: "web",
                    currency,
                    estimate: summarize(selectedType, cfg, estimate),
                  }}
                  className="bg-black text-white hover:bg-black/90 px-6 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2 transition-colors"
                >
                  Start this project <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-sm text-black/70 hover:text-black transition-colors inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" /> Start over
                </button>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="space-y-6">
              <div className="bg-black/10 rounded-lg p-6">
                <h4 className="font-sans font-medium mb-4">Your Configuration</h4>
                <ul className="space-y-2">
                  {selectedType.features
                    .filter((f) => on.has(f.id))
                    .map((f) => (
                      <li key={f.id} className="text-sm text-black/80 flex items-start gap-2">
                        <Check className="w-4 h-4 text-black/60 shrink-0 mt-0.5" />
                        <span className="flex-1">{f.label}</span>
                        {isLocked(selectedType, f, tier) && (
                          <span className="text-[10px] font-mono-tech text-black/40">included</span>
                        )}
                      </li>
                    ))}
                  {cfg.extraPages > 0 && (
                    <li className="text-sm text-black/80 flex items-start gap-2">
                      <Plus className="w-4 h-4 text-black/60 shrink-0 mt-0.5" />
                      {cfg.extraPages} additional page{cfg.extraPages !== 1 ? "s" : ""}
                    </li>
                  )}
                </ul>
                {plan && (
                  <p className="mt-4 text-xs text-black/50">
                    {estimate.pagesUsed} pages · {plan.allowance} included
                    {estimate.chargeablePages > 0 &&
                      ` · ${estimate.chargeablePages} extra at ${formatMoney(plan.perPage, currency)} each`}
                  </p>
                )}
              </div>

              <div className="bg-black/5 rounded-lg p-6">
                <h4 className="font-sans font-medium mb-3 text-sm text-black/60">
                  Always Included
                </h4>
                <ul className="space-y-1.5">
                  {includedItems.map((item, i) => (
                    <li key={i} className="text-xs text-black/50 flex items-start gap-2">
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
