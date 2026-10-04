# Step7Labs Website

> ## ✅ THIS IS THE MAIN BRANCH
> The code on `main` is the live website: **www.step7labs.com**.
> Anything pushed here goes to the real site, so check it first.

---

## Branches in this repo

| Branch | What it is for |
| --- | --- |
| `main` | **The live website.** This is the one that matters. |
| `development` | An older backup copy. It only has a short note saying it is a backup in case a push to `main` goes wrong. |
| `backup-of-core-structure` | An early backup of the basic site structure. |

## What the site is made with

- TanStack Start (React) with TypeScript
- Tailwind CSS for styling
- Built and edited with [Lovable](https://lovable.dev). The project is connected to it, so
  **never force-push or rewrite old commits**. That would wipe the history on Lovable's side.

## How to run it on your computer

```bash
npm install
npm run dev
```

## Where things live

- `src/routes/` — one file per page (`index.tsx` = Home, `work.tsx` = Work, `services.tsx`, `about.tsx`, `contact.tsx`, `process.tsx`, `investment-guide.tsx`, and the Insights articles).
- `src/components/site/` — header, footer, page hero, backgrounds.
- `src/components/pricing/` — the pricing / project estimator on the Investment page.
- `public/` — images used on the site, including the project pictures on the Work page.
- `DisabledFeatures.txt` — a list of things that were switched off on purpose but kept in the code so they can be turned back on.

### How to add a project to the Work page

1. Put a picture in `public/` (the existing ones are "showcase" collages: a few browser windows on a themed background).
2. Open `src/routes/work.tsx` and add an entry to the `projects` list (name, category, tag, year, short line, picture, and a `link` if the site is public).
3. If it is a new category, add it to the `filters` list in the same file.

A project with **no `link`** sends visitors to the Contact page when clicked.

---

## Change log (newest first)

Written in plain English so it is easy to understand later. Every item below is also a commit in GitHub's history.

### 4 October 2026 — Version: "estimator, design & logo update" (part 2 of 2: design, performance and new logo)

Released together with the estimator fixes below. Based on the "Dark glass studio site design upgrades" research report. The logo went through a few drafts (a constellation, a spark, a `<7>` tag) before the final "111"; those drafts appear in the commit history, but only "111" is used on the site.

**After deploying:** until Hostinger fixes the bare-domain mapping, copy the new build's `public` files (including the new `.webp`, `favicon.svg`, `apple-touch-icon.png`, `og-image.jpg` and `brand/` files) into `domains/step7labs.com/nodejs/public` in the File Manager, or step7labs.com (without www) will show unstyled.

- **Images 94% lighter:** every project picture now also exists as WebP (10.1 MB → 0.6 MB in total). The Work page loads the WebP copies (the PNGs remain as a fallback), lazy-loads cards below the first two, and gives images fixed sizes so the page doesn't jump while loading.
- **Readable Work card labels:** a soft dark fade behind the category/year labels, so they show on light images (Plant Meat, Paalo).
- **Glass used where it belongs:** the blur effect was removed from all repeated cards and kept only on floating layers (header, mobile menu, live price bar). It looks almost the same on the dark sky but is much lighter for phones.
- **Easier to read:** grey text slightly brighter, and the small uppercase labels are now at least 12px.
- **Keyboard users** see a clear white focus outline, and focused items no longer hide under the fixed header.
- **Accessibility settings respected:** people who turn on "reduce transparency", "increase contrast" or Windows high-contrast mode get solid, crisper surfaces. Animations made with framer-motion follow "reduce motion".
- **Lighter background animation:** the starfield draws at 30fps (looks the same), shows a still sky for "reduce motion", and stops when the tab is hidden. The hero animation renders at a lower pixel density on high-resolution phones.
- **Depth:** a very faint static grain over the page and a slightly stronger top highlight on glass cards.
- **New logo — "111":** seven in binary is **111** — three identical bits, all switched on. Each bit is raised one step, so together they climb a staircase. It says code, it carries the 7 in our name, and it stands for how we solve problems: one step, one bit at a time. One colour, simple silhouette, readable from 16px, works on dark and light.
  - Symbol + "Step7Labs" wordmark (Inter Semibold) in the header; symbol in the footer (`src/components/site/LogoMark.tsx`).
  - Files: `public/logo-symbol.svg` (white) and `public/logo-symbol-dark.svg` (black); full logo as transparent PNGs in `public/brand/` (`step7labs-logo-light.png`, `step7labs-logo-dark.png`).
  - App-tile favicon (`public/favicon.svg`), phone home-screen icon (`public/apple-touch-icon.png`) and link-share image (`public/og-image.jpg`). The site had no favicon before, which caused an error on every page.
- **Search engines:** the site now tells Google who Step7Labs is (Organization structured data).

### 4 October 2026 — Version: "estimator, design & logo update" (part 1 of 2: price estimator and contact form)

**Contact form now actually sends.** Before this, the form showed "Thanks" but sent nothing, so every inquiry was lost. Now:
- If a Web3Forms access key is set (`VITE_WEB3FORMS_ACCESS_KEY` in Hostinger → Environment variables, then redeploy), messages are emailed to us.
- Without a key, the visitor's email app opens with the whole message (and their estimate) already written, addressed to hello@step7labs.com.

**Estimator → contact handoff.** "Start this project" now opens the contact page with "Web Design & Development" selected, the client's currency selected, and their full estimate shown and attached to the message.

**New price rules** (decided by the owner on 3 Oct 2026):
- *Price range:* the low end is the build as configured; the high end uses each project's own spread from the pricing data (for example Modern 45k–65k is ×1.44). So bigger projects get a proportionally bigger range. Numbers are rounded to friendly values. At default settings every project shows exactly the range set in `src/config/pricing-data.ts`.
- *Hosting and Basic SEO are included:* the paid "Hosting & domain setup" add-on was removed everywhere, and Landing Page "Basic SEO" is now included, so the "Always included" list is true.
- *Pages:* each plan's included pages are used first (Basic 5, Modern 10, Ecommerce 10, and so on); every page after that costs the plan's single per-page price. No more double charging.
- *Starting prices:* the Investment Guide cards now match the homepage (AI NPR 1,00,000+, Custom Software NPR 2,00,000+, Branding NPR 80,000+).

**Estimator usability fixes:**
- Choices are kept when switching tier, re-clicking the same project, going back from the contact page, reloading, or switching homepage tabs.
- A live price bar stays on screen at the bottom while picking options.
- It now works fully with the keyboard and screen readers. Price changes are also read out.
- "Modern would cost less" appears when a Basic build becomes pricier than Modern.
- Extra pages are capped at 30, with a note to ask for a custom quote.
- Availability calendar now automatically includes the Booking engine it needs.
- The "No maintenance" option no longer looks selected when another option is chosen.
- Core features of a project (e.g. a store's cart and checkout) can no longer be removed.
- Pages beyond the included ones now add to the timeline too (about 1 day per 2 extra pages or paid add-ons).
- Converted USD/INR prices are marked as approximate, with the exchange rate shown.

**Small layout change:** the site's outer wrapper now uses `overflow: clip` instead of `overflow: hidden`. It looks the same, but it lets things like the live price bar stay on screen while scrolling.

**Where the logic lives:** all estimator maths is now in `src/lib/estimate.ts`; prices and features are still in `src/config/pricing-data.ts`.

### 3 October 2026 — Version: "portfolio update" (Work page: 4 new projects, 2 redesigned)

This was the first update to the site since July. Since then we built several new things, so they were added to the **Work** page.

**New projects on the Work page** (they appear first, at the top):

1. **Plant Meat** — a plant-based meat brand website. Shown as the new version we are building right now, marked "In development". Clicking it opens plantmeat.step7labs.com.
2. **Verde Theory** — the café website made by Plant Meat. It has its own card. It is marked "Pre-launch". Clicking it opens the Verde Theory page at pm.step7labs.com/verde/ (link added on 4 October 2026).
3. **NBC PartyLedger** — a custom software (SaaS) platform we built for our client NBC. It is private, so there is **no link and no real screenshots**. The picture uses blank, made-up dashboard shapes and a "Client confidential" lock. No real client data is shown. (The platform runs on our own in-house infrastructure, and that infrastructure's brand name is deliberately kept off the public site.)
4. **Paalo** — the website for an experiences and events company in Kathmandu. Clicking it opens paalo.step7labs.com.

**New pictures** — four new images were made in `public/` (`plant-meat.png`, `verde-theory.png`, `nbc-platform.png`, `paalo.png`). They follow the same "browser windows on a themed background" look as the NBC Colorzone and Aperture Cosmetics pictures, with each project's own colours and little handwritten notes. The top corners are left empty so the small category and year labels on each card stay readable.

**Bricks & Bolt and JSS Industries pictures redesigned** — these two cards used a single plain screenshot. They now use the same "browser windows on a themed background" style as the others, built from the best parts of each live site (`public/bricks-and-bolt.png` and `public/jss-industries.png`). Bricks & Bolt keeps its glowing 3D crane-and-towers hero, with the projects, vision and "Ready to build" sections around it, on a black and burnt-orange background. JSS shows its hero, product range, stats and brand strip on a dark brown and orange background. The old single screenshots are still in GitHub's history if they are ever needed.

**New filter buttons** on the Work page: **SaaS**, **Food & Beverage** and **Events**. The old filters are still there.

**Also today:** this README was added to `main`.

**Things to know:**
- The Plant Meat picture shows the version being built now, but its link still opens the older version that is currently online. It will match once the new version is published.
- Nothing else on the site was changed.

### 10 July 2026 — Work page links
- The NBC Colorzone and Bricks & Bolt cards now open their real websites when clicked.

### 9 July 2026 — Work page pictures, and the first merge
- New pictures for NBC Colorzone and Aperture Cosmetics were added to the Work page.
- The `development` branch was merged into `main` (pull request #1).

### 8 July 2026 — "Deployment Version 1.0"
- Added a night-sky background across the site.
- Gave the header and the cards on several pages (About, Services, Process, Contact, Insights, Investment) a softer "frosted glass" look.
- Small fixes to the footer and the website price estimator.

### 7 July 2026 — "pre-final-variant"
- Added the pricing and estimator tools used on the Investment page (web estimator, reference pricing, tabs, custom quote card).
- Added project pictures for Bricks & Bolt and JSS Industries.
- Added a glowing "digital thread" background effect. It is switched off for now but kept in the code.
- Added `DisabledFeatures.txt` (list of switched-off items) and `AGENTS.md` (the Lovable warning about not rewriting history).
- Footer and hero animation tweaks.

### 3 July 2026 — Insights articles
- Added five Insights articles and fixed the page links so they open correctly.

### 2 July 2026 — Investment guide and real projects
- Added the **Investment Guide** page and linked it from the header and footer.
- On the Work page, replaced some of the made-up sample projects with real ones (Bricks & Bolt, NBC Colorzone, JSS Industries).

### 1 July 2026 — "final-version"
- Added the animated hero on the home page and a smooth cursor-scroll effect.

### 25–27 June 2026 — The website is built
- The whole site was first built with Lovable: Home, Services, Work, Process, About, Insights and Contact pages, with a dark, premium black-and-white look.
- On 27 June an experiment with extra motion and new images was tried and then **reverted** (undone), going back to the cleaner version.

### 17 June 2026 — Starting point
- The project began from the standard Lovable "TanStack Start" template.
