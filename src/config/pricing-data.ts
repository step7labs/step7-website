// ─── Types ───────────────────────────────────────────────────────────

export type Tier = "basic" | "modern";

export type TierConfig = {
  label: string;
  description: string;
  basePageCount: number;
  additionalPagePriceNPR: number;
  includedItems: string[];
};

export type TierPricing = {
  basePriceRangeNPR: [number, number];
  baseTimelineDays: [number, number];
};

export type FixedPricing = {
  basePriceRangeNPR: [number, number];
  baseTimelineDays: [number, number];
  basePageCount?: number;
  additionalPagePriceNPR?: number;
};

export type Feature = {
  id: string;
  label: string;
  priceDeltaNPR: number;
  defaultChecked: boolean;
  includedInTiers?: Tier[];    // If the selected tier is in this list → included free, auto-checked
  category: "pages" | "features" | "addons";
};

export type ProjectType = {
  id: string;
  label: string;
  description: string;
  features: Feature[];
  routeToCustomSoftwareNote?: string;
} & (
  | { hasTiers: true;  tierPricing: Record<Tier, TierPricing>; fixedPricing?: never }
  | { hasTiers: false; fixedPricing: FixedPricing;            tierPricing?: never }
);

export type MaintenancePackage = {
  id: string;
  label: string;
  priceRangeNPR: [number, number];
  description: string;
};

// ─── Global Tier Definitions ─────────────────────────────────────────

export const TIER_CONFIG: Record<Tier, TierConfig> = {
  basic: {
    label: "Basic",
    description: "Professional site with premium design — ideal for getting online fast.",
    basePageCount: 5,
    additionalPagePriceNPR: 3000,
    includedItems: [
      "**Domain, Hosting and Business emails**",
      "Mobile-responsive design",
      "Contact form (email + WhatsApp)",
      "Basic on-page SEO (titles, meta, sitemap)",
      "Google Analytics + Search Console",
      "SSL certificate",
      "2 rounds of design revisions",
      "30 days post-launch support free",
    ],
  },
  modern: {
    label: "Modern",
    description: "Custom-designed, feature-rich site with advanced SEO and CMS access.",
    basePageCount: 10,
    additionalPagePriceNPR: 6000,
    includedItems: [
      "**Domain, Hosting and Business emails**",
      "Semi-custom or fully custom design",
      "CMS access (self-editable content)",
      "Advanced on-page SEO + schema markup",
      "Page-speed optimization (Core Web Vitals)",
      "Google Business Profile setup",
      "WhatsApp click-to-chat integration",
      "3 rounds of design revisions",
      "60 days post-launch support free",
    ],
  },
};

// ─── Maintenance Packages ────────────────────────────────────────────

export const MAINTENANCE_PACKAGES: MaintenancePackage[] = [
  {
    id: "standard",
    label: "Standard",
    priceRangeNPR: [3000, 5000],
    description: "Content updates, backups, security monitoring, bug fixes",
  },
  {
    id: "premium",
    label: "Premium",
    priceRangeNPR: [5000, 10000],
    description: "Adds SEO monitoring, performance optimization, priority support",
  },
];

// ─── Project Types ───────────────────────────────────────────────────

export const PRICING_DATA = {
  category: "web",
  estimatorEnabled: true,
  projectTypes: [
    // ── Business / Corporate Website ──────────────────────────────
    {
      id: "business-website",
      label: "Business / Corporate",
      description: "A professional site for an established business — company info, services, credibility.",
      hasTiers: true,
      tierPricing: {
        basic:  { basePriceRangeNPR: [25000, 35000], baseTimelineDays: [7, 10] },
        modern: { basePriceRangeNPR: [45000, 65000], baseTimelineDays: [14, 21] },
      },
      features: [
        // Pages — always included
        { id: "homepage",    label: "Homepage",  priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "about",       label: "About",     priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "services",    label: "Services / Products", priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "contact",     label: "Contact",   priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        // Pages — included in Modern, add-on in Basic
        { id: "portfolio",   label: "Portfolio / Gallery", priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "blog",        label: "Blog",                priceDeltaNPR: 5000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "testimonials",label: "Testimonials",        priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "faq",         label: "FAQ",                 priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "case-studies",label: "Case Studies",        priceDeltaNPR: 4000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "team",        label: "Team / Leadership",   priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "careers",     label: "Careers / Jobs",      priceDeltaNPR: 3000, defaultChecked: false, category: "pages" },
        { id: "pricing",     label: "Pricing / Plans",     priceDeltaNPR: 3000, defaultChecked: false, category: "pages" },
        { id: "privacy",     label: "Privacy Policy",      priceDeltaNPR: 1500, defaultChecked: false, category: "pages" },
        // Features
        { id: "cms",         label: "CMS (self-editable)",         priceDeltaNPR: 8000, defaultChecked: false, includedInTiers: ["modern"], category: "features" },
        { id: "advanced-seo",label: "Advanced SEO + Schema",       priceDeltaNPR: 5000, defaultChecked: false, includedInTiers: ["modern"], category: "features" },
        { id: "cwv",         label: "Page-speed optimization",     priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "features" },
        { id: "gbp",         label: "Google Business Profile",     priceDeltaNPR: 2000, defaultChecked: false, includedInTiers: ["modern"], category: "features" },
        // Add-ons
        { id: "hosting",     label: "Hosting & domain setup",      priceDeltaNPR: 2500, defaultChecked: false, category: "addons" },
      ],
    },

    // ── Portfolio / Creative ──────────────────────────────
    {
      id: "portfolio",
      label: "Portfolio / Creative",
      description: "Showcase your work, art, or agency projects to attract clients.",
      hasTiers: true,
      tierPricing: {
        basic:  { basePriceRangeNPR: [25000, 35000], baseTimelineDays: [7, 10] },
        modern: { basePriceRangeNPR: [45000, 65000], baseTimelineDays: [14, 21] },
      },
      features: [
        { id: "homepage",    label: "Homepage",      priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "projects",    label: "Projects / Work",priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "about",       label: "About Me/Us",   priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "contact",     label: "Contact",       priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "case-studies",label: "Case Studies",  priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "services",    label: "Services / Products", priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "testimonials",label: "Testimonials",  priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "resume",      label: "Resume / CV",   priceDeltaNPR: 2000, defaultChecked: false, category: "pages" },
        { id: "cms",         label: "CMS (self-editable)", priceDeltaNPR: 8000, defaultChecked: false, includedInTiers: ["modern"], category: "features" },
        { id: "hosting",     label: "Hosting & domain setup", priceDeltaNPR: 2500, defaultChecked: false, category: "addons" },
      ],
    },

    // ── Landing Page ──────────────────────────────────────────────
    {
      id: "landing-page",
      label: "Landing Page",
      description: "A focused, single-page experience designed for conversion.",
      hasTiers: false,
      fixedPricing: {
        basePriceRangeNPR: [20000, 25000],
        baseTimelineDays: [4, 7],
        basePageCount: 1,
      },
      features: [
        { id: "hero",          label: "Hero section",     priceDeltaNPR: 0,    defaultChecked: true, category: "pages" },
        { id: "features",      label: "Features section", priceDeltaNPR: 0,    defaultChecked: true, category: "pages" },
        { id: "social-proof",  label: "Social Proof",     priceDeltaNPR: 0,    defaultChecked: true, category: "pages" },
        { id: "pricing-teaser",label: "Pricing Teaser",   priceDeltaNPR: 0,    defaultChecked: true, category: "pages" },
        { id: "contact-cta",   label: "Contact / CTA",    priceDeltaNPR: 0,    defaultChecked: true, category: "pages" },
        { id: "faq",           label: "FAQ section",       priceDeltaNPR: 2000, defaultChecked: false, category: "pages" },
        { id: "terms",         label: "Terms & Conditions",priceDeltaNPR: 1500, defaultChecked: false, category: "pages" },
        { id: "privacy",       label: "Privacy Policy",    priceDeltaNPR: 1500, defaultChecked: false, category: "pages" },
        { id: "analytics",     label: "Analytics setup",   priceDeltaNPR: 0,    defaultChecked: true, category: "features" },
        { id: "seo",           label: "Basic SEO",         priceDeltaNPR: 2000, defaultChecked: false, category: "features" },
        { id: "mailchimp",     label: "Newsletter capture",priceDeltaNPR: 2000, defaultChecked: false, category: "features" },
        { id: "hosting",       label: "Hosting & domain setup", priceDeltaNPR: 2500, defaultChecked: false, category: "addons" },
      ],
    },

    // ── Ecommerce Store ───────────────────────────────────────────
    {
      id: "ecommerce",
      label: "Ecommerce Store",
      description: "A store that sells online — product catalog through checkout.",
      hasTiers: false,
      fixedPricing: {
        basePriceRangeNPR: [70000, 95000],
        baseTimelineDays: [14, 21],
        basePageCount: 10,
        additionalPagePriceNPR: 6000,
      },
      features: [
        // Core — included
        { id: "products",   label: "Product catalog",            priceDeltaNPR: 0, defaultChecked: true, category: "pages" },
        { id: "categories", label: "Categories & variants",      priceDeltaNPR: 0, defaultChecked: true, category: "pages" },
        { id: "cart",       label: "Cart",                       priceDeltaNPR: 0, defaultChecked: true, category: "features" },
        { id: "checkout",   label: "Checkout",                   priceDeltaNPR: 0, defaultChecked: true, category: "features" },
        { id: "esewa-khalti",label: "eSewa + Khalti integration",priceDeltaNPR: 0, defaultChecked: true, category: "features" },
        { id: "cod",        label: "Cash-on-delivery",           priceDeltaNPR: 0, defaultChecked: true, category: "features" },
        { id: "orders",     label: "Order management dashboard", priceDeltaNPR: 0, defaultChecked: true, category: "features" },
        // Optional Pages
        { id: "about",      label: "About Us",            priceDeltaNPR: 3000, defaultChecked: false, category: "pages" },
        { id: "contact",    label: "Contact",             priceDeltaNPR: 3000, defaultChecked: false, category: "pages" },
        { id: "faq",        label: "FAQ",                 priceDeltaNPR: 3000, defaultChecked: false, category: "pages" },
        { id: "terms",      label: "Terms & Conditions",  priceDeltaNPR: 1500, defaultChecked: false, category: "pages" },
        { id: "returns",    label: "Returns Policy",      priceDeltaNPR: 1500, defaultChecked: false, category: "pages" },
        { id: "blog",       label: "Blog",                priceDeltaNPR: 5000, defaultChecked: false, category: "pages" },
        // Optional Features
        { id: "wishlist",   label: "Wishlist",            priceDeltaNPR: 3000, defaultChecked: false, category: "features" },
        { id: "shipping",   label: "Shipping rules",      priceDeltaNPR: 5000, defaultChecked: false, category: "features" },
        { id: "coupons",    label: "Coupons / Discounts",  priceDeltaNPR: 3000, defaultChecked: false, category: "features" },
        { id: "inventory",  label: "Inventory tracking",   priceDeltaNPR: 7000, defaultChecked: false, category: "features" },
        { id: "seo",        label: "Product page SEO",     priceDeltaNPR: 5000, defaultChecked: false, category: "features" },
        // Add-ons
        { id: "cms",        label: "CMS (self-editable)",  priceDeltaNPR: 8000, defaultChecked: false, category: "addons" },
        { id: "hosting",    label: "Hosting & domain setup",priceDeltaNPR: 2500, defaultChecked: false, category: "addons" },
      ],
    },

    // ── Restaurant ────────────────────────────────────────────────
    {
      id: "restaurant",
      label: "Restaurant",
      description: "A complete digital presence for your dining establishment.",
      hasTiers: true,
      tierPricing: {
        basic:  { basePriceRangeNPR: [25000, 35000], baseTimelineDays: [7, 10] },
        modern: { basePriceRangeNPR: [45000, 65000], baseTimelineDays: [14, 21] },
      },
      features: [
        // Pages — always included
        { id: "menu",      label: "Menu",           priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "gallery",   label: "Gallery",        priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "chef",      label: "Chef / About",   priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "locations", label: "Locations / Map", priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "contact",   label: "Contact",        priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        // Pages — Modern included, Basic add-on
        { id: "blog",      label: "Blog",           priceDeltaNPR: 5000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "testimonials",label:"Testimonials",  priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "events",     label: "Events / Private Dining",priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "careers",    label: "Careers",       priceDeltaNPR: 3000, defaultChecked: false, category: "pages" },
        // Features
        { id: "reservations",label: "Reservations",       priceDeltaNPR: 4000, defaultChecked: false, includedInTiers: ["modern"], category: "features" },
        { id: "qr-menu",    label: "QR Menu",             priceDeltaNPR: 3000, defaultChecked: false, category: "features" },
        { id: "delivery",   label: "Delivery integration", priceDeltaNPR: 6000, defaultChecked: false, category: "features" },
        { id: "cms",        label: "CMS (self-editable)",  priceDeltaNPR: 8000, defaultChecked: false, includedInTiers: ["modern"], category: "features" },
        // Add-ons
        { id: "hosting",    label: "Hosting & domain setup", priceDeltaNPR: 2500, defaultChecked: false, category: "addons" },
      ],
    },

    // ── Hotel ─────────────────────────────────────────────────────
    {
      id: "hotel",
      label: "Hotel",
      description: "Showcase properties and accept bookings online.",
      hasTiers: true,
      tierPricing: {
        basic:  { basePriceRangeNPR: [25000, 35000], baseTimelineDays: [7, 12] },
        modern: { basePriceRangeNPR: [45000, 65000], baseTimelineDays: [14, 21] },
      },
      features: [
        // Pages — always included
        { id: "rooms",    label: "Rooms",     priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "gallery",  label: "Gallery",   priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "about",    label: "About",     priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "contact",  label: "Contact",   priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        // Pages — optional
        { id: "restaurant-page",label:"Dining / Restaurant",priceDeltaNPR: 4000,  defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "spa",           label: "Spa / Amenities",    priceDeltaNPR: 3000,  defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "experiences",   label: "Local experiences",  priceDeltaNPR: 3000,  defaultChecked: false, category: "pages" },
        { id: "offers",        label: "Special Offers",     priceDeltaNPR: 3000,  defaultChecked: false, category: "pages" },
        // Features
        { id: "booking",      label: "Booking engine",         priceDeltaNPR: 12000, defaultChecked: false, category: "features" },
        { id: "availability", label: "Availability calendar",   priceDeltaNPR: 5000,  defaultChecked: false, category: "features" },
        { id: "cms",           label: "CMS (self-editable)",    priceDeltaNPR: 8000,  defaultChecked: false, includedInTiers: ["modern"], category: "features" },
        // Add-ons
        { id: "hosting",      label: "Hosting & domain setup",  priceDeltaNPR: 2500,  defaultChecked: false, category: "addons" },
      ],
    },

    // ── Real Estate ───────────────────────────────────────────────
    {
      id: "real-estate",
      label: "Real Estate",
      description: "Property listings, agents, and lead generation.",
      hasTiers: true,
      tierPricing: {
        basic:  { basePriceRangeNPR: [25000, 35000], baseTimelineDays: [7, 12] },
        modern: { basePriceRangeNPR: [45000, 65000], baseTimelineDays: [14, 21] },
      },
      features: [
        // Pages — always included
        { id: "properties", label: "Property listings", priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "details",    label: "Property details",  priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "about",      label: "About Us",          priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "contact",    label: "Contact",           priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        // Pages — Modern included, Basic add-on
        { id: "agents",    label: "Agent profiles",    priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "blog",      label: "Blog / Insights",   priceDeltaNPR: 5000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "projects",  label: "New Projects",      priceDeltaNPR: 5000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        // Features
        { id: "maps",      label: "Interactive Maps",      priceDeltaNPR: 6000, defaultChecked: false, category: "features" },
        { id: "mortgage",  label: "Mortgage Calculator",   priceDeltaNPR: 12000, defaultChecked: false, category: "features" },
        { id: "advanced-search",label:"Advanced Filters",  priceDeltaNPR: 5000, defaultChecked: false, category: "features" },
        { id: "cms",       label: "CMS (self-editable)",   priceDeltaNPR: 8000, defaultChecked: false, includedInTiers: ["modern"], category: "features" },
        // Add-ons
        { id: "hosting",   label: "Hosting & domain setup",priceDeltaNPR: 2500, defaultChecked: false, category: "addons" },
      ],
    },

    // ── Blog / Magazine / News ──────────────────────────────
    {
      id: "blog-magazine",
      label: "Blog / Magazine / News",
      description: "A content-driven platform with articles, categories, and authors.",
      hasTiers: true,
      tierPricing: {
        basic:  { basePriceRangeNPR: [25000, 35000], baseTimelineDays: [7, 10] },
        modern: { basePriceRangeNPR: [45000, 65000], baseTimelineDays: [14, 21] },
      },
      features: [
        { id: "homepage",    label: "Homepage / Feed",priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "articles",    label: "Article Pages",  priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "categories",  label: "Categories",     priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "about",       label: "About",          priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "contact",     label: "Contact",        priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "authors",     label: "Author Profiles",priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "newsletter",  label: "Newsletter integration", priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "features" },
        { id: "monetization",label: "Ad Placement setup", priceDeltaNPR: 4000, defaultChecked: false, category: "features" },
        { id: "cms",         label: "CMS (self-editable)", priceDeltaNPR: 8000, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "features" },
        { id: "hosting",     label: "Hosting & domain setup", priceDeltaNPR: 2500, defaultChecked: false, category: "addons" },
      ],
    },
    
    // ── Educational / Course ──────────────────────────────
    {
      id: "educational",
      label: "Educational / Course",
      description: "Sell courses, handle student enrollments, or run an online school.",
      hasTiers: false,
      fixedPricing: {
        basePriceRangeNPR: [60000, 85000],
        baseTimelineDays: [14, 21],
        basePageCount: 8,
        additionalPagePriceNPR: 6000,
      },
      features: [
        { id: "courses",     label: "Course Catalog", priceDeltaNPR: 0, defaultChecked: true, category: "pages" },
        { id: "lessons",     label: "Lesson Pages",   priceDeltaNPR: 0, defaultChecked: true, category: "pages" },
        { id: "about",       label: "About / Instructors", priceDeltaNPR: 0, defaultChecked: true, category: "pages" },
        { id: "contact",     label: "Contact",        priceDeltaNPR: 0, defaultChecked: true, category: "pages" },
        { id: "faq",         label: "FAQ",            priceDeltaNPR: 3000, defaultChecked: false, category: "pages" },
        { id: "lms",         label: "Learning Management System (LMS)", priceDeltaNPR: 0, defaultChecked: true, category: "features" },
        { id: "enrollment",  label: "Student Enrollment & Checkout", priceDeltaNPR: 0, defaultChecked: true, category: "features" },
        { id: "quizzes",     label: "Quizzes & Certificates", priceDeltaNPR: 12000, defaultChecked: false, category: "features" },
        { id: "memberships", label: "Paid Subscriptions", priceDeltaNPR: 15000, defaultChecked: false, category: "features" },
        { id: "hosting",     label: "Hosting & domain setup", priceDeltaNPR: 2500, defaultChecked: false, category: "addons" },
      ],
    },

    // ── Non-Profit / NGO ──────────────────────────────
    {
      id: "ngo",
      label: "Non-Profit / NGO",
      description: "A platform for charities to raise awareness, accept donations, and share impact.",
      hasTiers: true,
      tierPricing: {
        basic:  { basePriceRangeNPR: [25000, 35000], baseTimelineDays: [7, 10] },
        modern: { basePriceRangeNPR: [45000, 65000], baseTimelineDays: [14, 21] },
      },
      features: [
        { id: "homepage",    label: "Homepage",       priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "about",       label: "About Us / Mission", priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "impact",      label: "Our Impact",     priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "contact",     label: "Contact",        priceDeltaNPR: 0, defaultChecked: true, includedInTiers: ["basic", "modern"], category: "pages" },
        { id: "projects",    label: "Projects / Campaigns", priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "team",        label: "Team / Volunteers", priceDeltaNPR: 3000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "blog",        label: "News / Updates", priceDeltaNPR: 5000, defaultChecked: false, includedInTiers: ["modern"], category: "pages" },
        { id: "donations",   label: "Online Donations (eSewa/Khalti)", priceDeltaNPR: 8000, defaultChecked: false, category: "features" },
        { id: "cms",         label: "CMS (self-editable)", priceDeltaNPR: 8000, defaultChecked: false, includedInTiers: ["modern"], category: "features" },
        { id: "hosting",     label: "Hosting & domain setup", priceDeltaNPR: 2500, defaultChecked: false, category: "addons" },
      ],
    },

    // ── Directory / Listing ──────────────────────────────
    {
      id: "directory",
      label: "Directory / Listings",
      description: "A classifieds board, local business directory, or job portal.",
      hasTiers: false,
      fixedPricing: {
        basePriceRangeNPR: [85000, 110000],
        baseTimelineDays: [21, 28],
        basePageCount: 8,
        additionalPagePriceNPR: 6000,
      },
      features: [
        { id: "search",      label: "Advanced Search & Filters", priceDeltaNPR: 0, defaultChecked: true, category: "features" },
        { id: "listings",    label: "Listing Pages",             priceDeltaNPR: 0, defaultChecked: true, category: "pages" },
        { id: "submit",      label: "Frontend Submission",       priceDeltaNPR: 0, defaultChecked: true, category: "features" },
        { id: "user-dash",   label: "User Dashboard",            priceDeltaNPR: 0, defaultChecked: true, category: "features" },
        { id: "about",       label: "About Us",                  priceDeltaNPR: 0, defaultChecked: true, category: "pages" },
        { id: "contact",     label: "Contact",                   priceDeltaNPR: 0, defaultChecked: true, category: "pages" },
        { id: "payments",    label: "Paid Listings / Checkout",  priceDeltaNPR: 12000, defaultChecked: false, category: "features" },
        { id: "reviews",     label: "Reviews & Ratings",         priceDeltaNPR: 8000, defaultChecked: false, category: "features" },
        { id: "maps",        label: "Interactive Maps",          priceDeltaNPR: 6000, defaultChecked: false, category: "features" },
        { id: "hosting",     label: "Hosting & domain setup",    priceDeltaNPR: 2500, defaultChecked: false, category: "addons" },
      ],
    },

    // ── Web Application ───────────────────────────────────────────
    {
      id: "web-application",
      label: "Web Application",
      description: "A bounded, logged-in-user product — client portal, booking tool, membership site.",
      hasTiers: false,
      fixedPricing: {
        basePriceRangeNPR: [300000, 400000],
        baseTimelineDays: [21, 30],
      },
      features: [
        { id: "auth",          label: "Authentication",        priceDeltaNPR: 0,     defaultChecked: true, category: "features" },
        { id: "dashboard",     label: "User dashboard",        priceDeltaNPR: 0,     defaultChecked: true, category: "features" },
        { id: "roles",         label: "Roles & permissions",   priceDeltaNPR: 9000,  defaultChecked: false, category: "features" },
        { id: "notifications", label: "Notifications",         priceDeltaNPR: 4000,  defaultChecked: false, category: "features" },
        { id: "api",           label: "API integration",       priceDeltaNPR: 10000, defaultChecked: false, category: "features" },
        { id: "reports",       label: "Reports / exports",     priceDeltaNPR: 6000,  defaultChecked: false, category: "features" },
      ],
      routeToCustomSoftwareNote: "Building something with multiple user roles or its own subscription logic? That's Custom Software — request a custom quote instead.",
    },
  ] as ProjectType[],
};
