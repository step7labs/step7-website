import {
  PRICING_DATA,
  TIER_CONFIG,
  MAINTENANCE_PACKAGES,
  type Feature,
  type ProjectType,
  type Tier,
} from "../config/pricing-data";

// ─── Types ───────────────────────────────────────────────────────────

export type Currency = "NPR" | "USD" | "INR";

export type EstimatorConfig = {
  typeId: string | null;
  tier: Tier;
  picks: string[]; // the client's own choices; tier-included features are added on top
  extraPages: number;
  maintenanceId: string | null;
  currency: Currency;
};

export type PagePlan = { allowance: number; perPage: number };

export type Estimate = {
  min: number; // NPR, rounded down to a friendly step
  max: number; // NPR, rounded up to a friendly step
  timelineMin: number;
  timelineMax: number;
  pagePlan: PagePlan | null;
  pagesUsed: number;
  chargeablePages: number;
};

// ─── Constants ───────────────────────────────────────────────────────

export const CURRENCIES: Currency[] = ["NPR", "USD", "INR"];

// Indicative conversion only — invoices are raised in NPR. INR is pegged (NPR 1.6 = INR 1).
export const NPR_PER_UNIT: Record<Currency, number> = { NPR: 1, USD: 150, INR: 1.6 };

export const MAX_EXTRA_PAGES = 30;

export const EMPTY_CONFIG: EstimatorConfig = {
  typeId: null,
  tier: "basic",
  picks: [],
  extraPages: 0,
  maintenanceId: null,
  currency: "NPR",
};

// ─── Lookups ─────────────────────────────────────────────────────────

export const findProjectType = (id: string | null) =>
  PRICING_DATA.projectTypes.find((pt) => pt.id === id);

export const findMaintenance = (id: string | null) => MAINTENANCE_PACKAGES.find((m) => m.id === id);

const unique = (ids: string[]) => [...new Set(ids)];

// ─── Feature rules ───────────────────────────────────────────────────

// Free and not removable: included by the tier, or a core (zero-price, default) feature.
export function isLocked(pt: ProjectType, f: Feature, tier: Tier): boolean {
  if (pt.hasTiers && f.includedInTiers?.includes(tier)) return true;
  return f.defaultChecked && f.priceDeltaNPR === 0;
}

export function pagePlan(pt: ProjectType, tier: Tier): PagePlan | null {
  if (pt.hasTiers) {
    const t = TIER_CONFIG[tier];
    return { allowance: t.basePageCount, perPage: t.additionalPagePriceNPR };
  }
  const { basePageCount, additionalPagePriceNPR } = pt.fixedPricing;
  return basePageCount && additionalPagePriceNPR
    ? { allowance: basePageCount, perPage: additionalPagePriceNPR }
    : null;
}

function withRequirements(pt: ProjectType, ids: string[]): string[] {
  const out = new Set(ids);
  let grew = true;
  while (grew) {
    grew = false;
    for (const f of pt.features) {
      if (!out.has(f.id)) continue;
      for (const r of f.requires ?? []) {
        if (!out.has(r)) {
          out.add(r);
          grew = true;
        }
      }
    }
  }
  return pt.features.map((f) => f.id).filter((id) => out.has(id));
}

// Starting picks for a newly chosen project: any default extras that aren't already locked in.
export function initialPicks(pt: ProjectType, tier: Tier): string[] {
  return withRequirements(
    pt,
    pt.features.filter((f) => f.defaultChecked && !isLocked(pt, f, tier)).map((f) => f.id),
  );
}

// Everything that is on: the tier's included features plus the client's picks. Picks survive
// tier changes, so switching Basic → Modern → Basic never loses anything the client chose.
export function selection(pt: ProjectType, cfg: EstimatorConfig): Set<string> {
  const locked = pt.features.filter((f) => isLocked(pt, f, cfg.tier)).map((f) => f.id);
  return new Set(withRequirements(pt, [...locked, ...cfg.picks]));
}

export function togglePick(pt: ProjectType, picks: string[], id: string, tier: Tier) {
  const f = pt.features.find((x) => x.id === id);
  if (!f || isLocked(pt, f, tier)) return picks;
  if (!picks.includes(id)) return withRequirements(pt, [...picks, id]);

  // Removing a feature also removes anything that depends on it.
  const drop = new Set([id]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const g of pt.features) {
      if (!drop.has(g.id) && !isLocked(pt, g, tier) && g.requires?.some((r) => drop.has(r))) {
        drop.add(g.id);
        grew = true;
      }
    }
  }
  return picks.filter((x) => !drop.has(x));
}

// ─── Pricing ─────────────────────────────────────────────────────────

const roundTo = (value: number, step: number, dir: "down" | "up") =>
  (dir === "down" ? Math.floor(value / step + 1e-9) : Math.ceil(value / step - 1e-9)) * step;

export function estimate(pt: ProjectType, cfg: EstimatorConfig): Estimate {
  const base = pt.hasTiers ? pt.tierPricing[cfg.tier] : pt.fixedPricing;
  const [baseMin, baseMax] = base.basePriceRangeNPR;
  const [daysMin, daysMax] = base.baseTimelineDays;
  const plan = pagePlan(pt, cfg.tier);
  const on = selection(pt, cfg);
  const selected = pt.features.filter((f) => on.has(f.id));

  // Paid features. Where a page plan exists, pages are priced by the allowance instead.
  let featureCost = 0;
  let paidItems = 0;
  for (const f of selected) {
    if (isLocked(pt, f, cfg.tier) || (plan && f.category === "pages")) continue;
    featureCost += f.priceDeltaNPR;
    if (f.priceDeltaNPR > 0) paidItems++;
  }

  // Pages: the allowance is used first, then every page costs the same per-page price.
  const pageFeatures = selected.filter((f) => f.category === "pages").length;
  const pagesUsed = pageFeatures + (plan ? cfg.extraPages : 0);
  const chargeablePages = plan ? Math.max(0, pagesUsed - plan.allowance) : 0;
  const pagesCost = plan ? chargeablePages * plan.perPage : 0;

  // Range: the low end is the build as configured; the high end applies the project's own
  // spread (baseMax / baseMin) to the whole subtotal, so the band grows in proportion to the
  // size of the build. Friendly rounding: down for the low end, up for the high end.
  const subtotal = baseMin + featureCost + pagesCost;
  const step = subtotal < 100000 ? 1000 : 5000;
  const min = roundTo(subtotal, step, "down");
  const max = roundTo((subtotal * baseMax) / baseMin, step, "up");

  // Timeline: +1 day for every two paid add-ons or chargeable pages.
  const extraDays = Math.floor((paidItems + chargeablePages) / 2);

  return {
    min,
    max,
    timelineMin: daysMin + extraDays,
    timelineMax: daysMax + extraDays,
    pagePlan: plan,
    pagesUsed,
    chargeablePages,
  };
}

// ─── Formatting ──────────────────────────────────────────────────────

const LOCALES: Record<Currency, string> = { NPR: "en-IN", INR: "en-IN", USD: "en-US" };
const RANGE_STEP: Record<Currency, number> = { NPR: 1, USD: 10, INR: 100 };

// `round` is used for range ends so converted figures stay friendly (e.g. $170 – $240).
export function formatMoney(npr: number, currency: Currency, round?: "down" | "up") {
  let value = npr / NPR_PER_UNIT[currency];
  if (round) value = roundTo(value, RANGE_STEP[currency], round);
  return new Intl.NumberFormat(LOCALES[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatRange(min: number, max: number, currency: Currency) {
  const approx = currency === "NPR" ? "" : "≈ ";
  return `${approx}${formatMoney(min, currency, "down")} – ${formatMoney(max, currency, "up")}`;
}

// Plain-text summary handed to the contact form with "Start this project".
export function summarize(pt: ProjectType, cfg: EstimatorConfig, est: Estimate): string {
  const on = selection(pt, cfg);
  const addOns = pt.features
    .filter((f) => on.has(f.id) && !isLocked(pt, f, cfg.tier))
    .map((f) => f.label);
  const maintenance = findMaintenance(cfg.maintenanceId);
  const lines = [
    `Project: ${pt.label}${pt.hasTiers ? ` (${TIER_CONFIG[cfg.tier].label} tier)` : ""}`,
    `Estimate: ${formatRange(est.min, est.max, "NPR")}` +
      (cfg.currency === "NPR" ? "" : ` (${formatRange(est.min, est.max, cfg.currency)})`),
    `Timeline: ${est.timelineMin}–${est.timelineMax} business days`,
  ];
  if (est.pagePlan) {
    lines.push(`Pages: ${est.pagesUsed} (${est.pagePlan.allowance} included)`);
  }
  if (addOns.length) lines.push(`Add-ons: ${addOns.join(", ")}`);
  if (maintenance) {
    lines.push(
      `Maintenance: ${maintenance.label} (${formatMoney(maintenance.priceRangeNPR[0], "NPR")}–${formatMoney(maintenance.priceRangeNPR[1], "NPR")}/mo)`,
    );
  }
  return lines.join("\n");
}

// ─── Persistence (per-visitor convenience; safe to fail) ─────────────

const STORAGE_KEY = "step7:web-estimator:v2";

export function loadConfig(): EstimatorConfig | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Partial<EstimatorConfig>;
    const pt = findProjectType(c.typeId ?? null);
    if (!pt) return null;
    const tier: Tier = c.tier === "modern" && pt.hasTiers ? "modern" : "basic";
    const valid = new Set(pt.features.map((f) => f.id));
    const picked = unique((c.picks ?? []).filter((id) => valid.has(id)));
    return {
      typeId: pt.id,
      tier,
      picks: withRequirements(pt, picked),
      extraPages: Math.min(MAX_EXTRA_PAGES, Math.max(0, Math.floor(Number(c.extraPages) || 0))),
      maintenanceId: findMaintenance(c.maintenanceId ?? null)?.id ?? null,
      currency: CURRENCIES.includes(c.currency as Currency) ? (c.currency as Currency) : "NPR",
    };
  } catch {
    return null;
  }
}

export function saveConfig(cfg: EstimatorConfig) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  } catch {
    // Storage can be unavailable (private mode, blocked site data) — the estimator still works.
  }
}
