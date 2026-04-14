# Rozanowska v1 — Brand Credibility Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page premium real estate credibility site for rozanowska.com with Polish/English i18n, Apple-inspired dark/light section rhythm, OS-000 design system, and AI-generated placeholder imagery.

**Architecture:** Next.js App Router with `[locale]` dynamic segment via `next-intl`. Polish is the default locale. The existing OS-000 component library is extended with domain-specific components (CityCard, ListingCard, etc.). The current all-dark theme is replaced with a binary dark/light section rhythm per the Apple DESIGN.md. Images are generated via Nano Banana (Gemini 3 Pro) and placed in `public/images/`.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, next-intl, OS-000 design tokens + theme-rozanowska.css

**Design doc:** `~/OG/vault/projects/OG-017-Magdas-Website/2026-04-13-v1-design.md`
**Design system:** `DESIGN.md` (Apple-inspired, with personas §9 and tone of voice §10)

---

## File Structure

### New files

```
src/
  i18n/
    request.ts                    # next-intl request config
    routing.ts                    # locale routing config (pl default, en secondary)
  messages/
    pl.json                       # Polish translations — all UI strings + dummy content
    en.json                       # English translations
  middleware.ts                   # next-intl locale detection middleware
  app/
    [locale]/
      layout.tsx                  # Root layout with NextIntlClientProvider + Inter font
      page.tsx                    # Homepage — 8 sections
      o-nas/page.tsx              # About Rozanowska
      oferty/page.tsx             # Opportunities — static listing grid
      kontakt/page.tsx            # Contact — segmented form
    design-system/
      page.tsx                    # (move existing, no locale prefix)
  components/
    ds/
      LanguageSwitcher.tsx        # Globe icon + dropdown, reads current locale
      CityCard.tsx                # Image card with city name overlay
      CategoryTile.tsx            # Investment category with icon + label
      ListingCard.tsx             # Property card with image + investment stats
      StatBlock.tsx               # Large number + label + detail
      CTAPanel.tsx                # Full-width dark CTA section
      ContactForm.tsx             # Tabbed form (investor/owner/general)
  styles/
    tokens/
      theme-rozanowska.css        # Apple-inspired: binary dark/light, blue accent
public/
  images/
    hero/                         # Hero images
    cities/                       # City card images (warsaw, krakow, wroclaw, tricity, poznan)
    categories/                   # Category tile images
    listings/                     # Listing card images
    personas/                     # Klaus, Anna, James portraits
    about/                        # Magda portrait placeholder
    cta/                          # Off-market CTA background
```

### Modified files

```
src/app/globals.css               # Replace inline theme with import of theme-rozanowska.css; add dark/light section utility classes
src/components/ds/index.js        # Re-export new components
src/components/ds/Nav.tsx          # Add sticky/transparent behaviour, LanguageSwitcher slot, locale-aware links
src/components/ds/Hero.tsx         # Add 'cinematic' variant with bg image + dark overlay
src/components/ds/Section.tsx      # Add 'dark' bg variant for black sections
src/components/ds/Footer.tsx       # Add locale-aware links, language switcher in footer
src/components/ds/Button.tsx       # Add pill variant (radius-full) for Apple-style CTAs
package.json                       # Add next-intl dependency
next.config.ts                     # Add next-intl plugin if needed
```

### Deleted files

```
src/app/layout.tsx                 # Replaced by src/app/[locale]/layout.tsx
src/app/page.tsx                   # Replaced by src/app/[locale]/page.tsx
src/app/design-system/page.tsx     # Moved to src/app/design-system/page.tsx (same path, but outside [locale])
src/styles/tokens/theme-oganiko.css # Not used in this project
```

---

## Task 1: Install next-intl and configure i18n foundation

**Files:**
- Modify: `package.json` (add next-intl)
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/middleware.ts`
- Create: `src/messages/pl.json`
- Create: `src/messages/en.json`

- [ ] **Step 1: Install next-intl**

```bash
cd ~/OG/dev/OG-017-Magdas-Website
npm install next-intl
```

- [ ] **Step 2: Create routing config**

Create `src/i18n/routing.ts`:

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'as-needed', // no /pl/ prefix for default locale
  pathnames: {
    '/': '/',
    '/o-nas': {
      pl: '/o-nas',
      en: '/about',
    },
    '/oferty': {
      pl: '/oferty',
      en: '/opportunities',
    },
    '/kontakt': {
      pl: '/kontakt',
      en: '/contact',
    },
  },
});
```

- [ ] **Step 3: Create request config**

Create `src/i18n/request.ts`:

```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 4: Create middleware**

Create `src/middleware.ts`:

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except: _next, api, static files, design-system
    '/((?!_next|api|images|favicon.ico|design-system|.*\\..*).*)',
  ],
};
```

- [ ] **Step 5: Create minimal Polish translation file**

Create `src/messages/pl.json`:

```json
{
  "meta": {
    "title": "Rozanowska — Wyselekcjonowane inwestycje w nieruchomości w Polsce",
    "description": "Premium nieruchomości komercyjne w Polsce. Starannie wyselekcjonowane dla poważnych inwestorów."
  },
  "nav": {
    "opportunities": "Oferty",
    "explorePoland": "O Polsce",
    "about": "O nas",
    "contact": "Kontakt",
    "cta": "Zapytaj"
  },
  "hero": {
    "headline": "Wyselekcjonowane inwestycje w nieruchomości w Polsce",
    "subtitle": "Starannie dobrane nieruchomości komercyjne dla wymagających inwestorów. Warszawa i cała Polska.",
    "cta": "Zobacz oferty"
  },
  "cities": {
    "title": "Odkryj Polskę",
    "subtitle": "Kluczowe rynki inwestycyjne w najdynamiczniejszych miastach Polski.",
    "warsaw": "Warszawa",
    "krakow": "Kraków",
    "wroclaw": "Wrocław",
    "tricity": "Trójmiasto",
    "poznan": "Poznań"
  },
  "categories": {
    "title": "Kategorie inwestycji",
    "subtitle": "Cztery klasy aktywów, każda z własnym profilem zwrotu.",
    "commercial": "Komercyjne",
    "investment": "Inwestycyjne",
    "land": "Grunty",
    "residential": "Rezydencje"
  },
  "featured": {
    "title": "Wybrane oferty",
    "subtitle": "Wyselekcjonowane nieruchomości z potwierdzonymi parametrami inwestycyjnymi.",
    "viewDetails": "Szczegóły",
    "listings": {
      "l1": {
        "title": "Biurowiec klasy A, Mokotów",
        "location": "Warszawa",
        "category": "Komercyjne",
        "price": "12 500 000 PLN",
        "roi": "7,2%",
        "area": "2 400 m²",
        "status": "Wynajęte"
      },
      "l2": {
        "title": "Centrum logistyczne",
        "location": "Kraków",
        "category": "Komercyjne",
        "price": "18 200 000 PLN",
        "roi": "8,1%",
        "area": "12 000 m²",
        "status": "Wynajęte"
      },
      "l3": {
        "title": "Budynek wielofunkcyjny",
        "location": "Wrocław",
        "category": "Inwestycyjne",
        "price": "8 900 000 PLN",
        "roi": "6,8%",
        "area": "3 200 m²",
        "status": "Wynajęte"
      },
      "l4": {
        "title": "Powierzchnia handlowa, Stare Miasto",
        "location": "Poznań",
        "category": "Komercyjne",
        "price": "4 200 000 PLN",
        "roi": "7,5%",
        "area": "850 m²",
        "status": "Wynajęte"
      },
      "l5": {
        "title": "Działka inwestycyjna",
        "location": "Trójmiasto",
        "category": "Grunty",
        "price": "6 800 000 PLN",
        "roi": "—",
        "area": "15 000 m²",
        "status": "Dostępne"
      },
      "l6": {
        "title": "Penthouse z widokiem",
        "location": "Warszawa",
        "category": "Rezydencje",
        "price": "5 600 000 PLN",
        "roi": "5,4%",
        "area": "280 m²",
        "status": "Dostępne"
      }
    }
  },
  "whyPoland": {
    "title": "Dlaczego Polska",
    "subtitle": "Solidne fundamenty makroekonomiczne wspierające inwestycje w nieruchomości.",
    "stats": {
      "gdp": { "value": "5,3%", "label": "Wzrost PKB", "detail": "Najszybciej rosnąca duża gospodarka UE" },
      "population": { "value": "38M", "label": "Populacja", "detail": "Największy rynek Europy Środkowej" },
      "fdi": { "value": "4,2 mld €", "label": "Napływ BIZ", "detail": "Roczne bezpośrednie inwestycje zagraniczne" },
      "yields": { "value": "7–9%", "label": "Stopy zwrotu", "detail": "Stopy kapitalizacji nieruchomości komercyjnych" }
    }
  },
  "forAgents": {
    "title": "Dla agentów i właścicieli",
    "subtitle": "Rozanowska to platforma wyselekcjonowana. Przyjmujemy nieruchomości wyłącznie po weryfikacji.",
    "cta": "Złóż wniosek"
  },
  "offMarket": {
    "title": "Oferty poza rynkiem",
    "subtitle": "Dostęp do ekskluzywnych nieruchomości, które nie pojawiają się w publicznych ofertach. Dyskrecja. Selekcja. Relacja.",
    "cta": "Zapytaj o dostęp"
  },
  "contactStrip": {
    "title": "Porozmawiajmy",
    "subtitle": "Niezależnie od tego, czy szukasz inwestycji, czy chcesz przedstawić nieruchomość — zacznij od rozmowy.",
    "ctaInvestor": "Zapytanie inwestora",
    "ctaOwner": "Zgłoś nieruchomość"
  },
  "about": {
    "title": "O Rozanowska",
    "intro": "Doradca w zakresie nieruchomości komercyjnych z siedzibą w Warszawie, łączący międzynarodowych inwestorów z najlepszymi okazjami w Polsce.",
    "bio1": "Dzięki dogłębnej znajomości polskiego rynku nieruchomości komercyjnych i sieci kontaktów obejmującej deweloperów, właścicieli instytucjonalnych i inwestorów prywatnych, Rozanowska oferuje wyselekcjonowane, oparte na zaufaniu podejście do inwestycji w nieruchomości.",
    "bio2": "Każda oferta jest zweryfikowana. Każde przedstawienie jest celowe. Bez szumu rynkowego — tylko starannie wyselekcjonowane nieruchomości i wsparcie doradcze umożliwiające świadome decyzje.",
    "howTitle": "Jak pracuję",
    "values": {
      "curation": { "title": "Selekcja", "description": "Każda nieruchomość przechodzi rygorystyczną weryfikację. Jakość, nie ilość." },
      "discretion": { "title": "Dyskrecja", "description": "Dostęp poza rynkiem i poufna obsługa transakcji dla poważnych inwestorów." },
      "market": { "title": "Znajomość rynku", "description": "Głęboka wiedza o polskim rynku komercyjnym — Warszawa, Kraków, Wrocław, Trójmiasto, Poznań." }
    },
    "cta": "Skontaktuj się"
  },
  "opportunities": {
    "title": "Oferty",
    "subtitle": "Wyselekcjonowane nieruchomości inwestycyjne na polskim rynku."
  },
  "contact": {
    "title": "Kontakt",
    "subtitle": "Wybierz rodzaj zapytania i opisz swoje potrzeby.",
    "tabs": {
      "investor": "Inwestor",
      "owner": "Właściciel / Agent",
      "general": "Ogólne"
    },
    "fields": {
      "name": "Imię i nazwisko",
      "email": "E-mail",
      "phone": "Telefon (opcjonalnie)",
      "message": "Wiadomość",
      "submit": "Wyślij"
    },
    "investorPlaceholder": "Szukam nieruchomości komercyjnych w Polsce. Interesuje mnie...",
    "ownerPlaceholder": "Chciałbym przedstawić nieruchomość inwestycyjną do rozpatrzenia...",
    "generalPlaceholder": "Mam pytanie dotyczące..."
  },
  "footer": {
    "tagline": "Wyselekcjonowane inwestycje w nieruchomości w Polsce",
    "columns": {
      "cities": "Miasta",
      "categories": "Kategorie",
      "company": "Firma",
      "legal": "Prawne"
    },
    "privacy": "Polityka prywatności",
    "terms": "Regulamin",
    "cookies": "Cookies"
  }
}
```

- [ ] **Step 6: Create English translation file**

Create `src/messages/en.json`:

```json
{
  "meta": {
    "title": "Rozanowska — Curated Real Estate Investment in Poland",
    "description": "Premium commercial real estate opportunities in Poland. Carefully selected for serious investors."
  },
  "nav": {
    "opportunities": "Opportunities",
    "explorePoland": "Explore Poland",
    "about": "About",
    "contact": "Contact",
    "cta": "Inquire"
  },
  "hero": {
    "headline": "Curated Real Estate Investment in Poland",
    "subtitle": "Premium commercial properties, carefully selected for serious investors. Warsaw and beyond.",
    "cta": "Explore Opportunities"
  },
  "cities": {
    "title": "Explore Poland",
    "subtitle": "Key investment markets in Poland's most dynamic cities.",
    "warsaw": "Warsaw",
    "krakow": "Kraków",
    "wroclaw": "Wrocław",
    "tricity": "Tricity",
    "poznan": "Poznań"
  },
  "categories": {
    "title": "Investment Categories",
    "subtitle": "Four asset classes, each with a distinct return profile.",
    "commercial": "Commercial",
    "investment": "Investment",
    "land": "Land",
    "residential": "Premium Residential"
  },
  "featured": {
    "title": "Featured Opportunities",
    "subtitle": "Curated properties with verified investment parameters.",
    "viewDetails": "View Details",
    "listings": {
      "l1": {
        "title": "Class A Office, Mokotów",
        "location": "Warsaw",
        "category": "Commercial",
        "price": "12,500,000 PLN",
        "roi": "7.2%",
        "area": "2,400 m²",
        "status": "Tenanted"
      },
      "l2": {
        "title": "Logistics Hub",
        "location": "Kraków",
        "category": "Commercial",
        "price": "18,200,000 PLN",
        "roi": "8.1%",
        "area": "12,000 m²",
        "status": "Tenanted"
      },
      "l3": {
        "title": "Mixed-Use Building",
        "location": "Wrocław",
        "category": "Investment",
        "price": "8,900,000 PLN",
        "roi": "6.8%",
        "area": "3,200 m²",
        "status": "Tenanted"
      },
      "l4": {
        "title": "Retail Space, Old Town",
        "location": "Poznań",
        "category": "Commercial",
        "price": "4,200,000 PLN",
        "roi": "7.5%",
        "area": "850 m²",
        "status": "Tenanted"
      },
      "l5": {
        "title": "Investment Land Plot",
        "location": "Tricity",
        "category": "Land",
        "price": "6,800,000 PLN",
        "roi": "—",
        "area": "15,000 m²",
        "status": "Available"
      },
      "l6": {
        "title": "Penthouse with View",
        "location": "Warsaw",
        "category": "Premium Residential",
        "price": "5,600,000 PLN",
        "roi": "5.4%",
        "area": "280 m²",
        "status": "Available"
      }
    }
  },
  "whyPoland": {
    "title": "Why Poland",
    "subtitle": "Strong macroeconomic fundamentals supporting real estate investment.",
    "stats": {
      "gdp": { "value": "5.3%", "label": "GDP Growth", "detail": "Fastest-growing major EU economy" },
      "population": { "value": "38M", "label": "Population", "detail": "Largest market in Central Europe" },
      "fdi": { "value": "€4.2B", "label": "FDI Inflow", "detail": "Annual foreign direct investment" },
      "yields": { "value": "7–9%", "label": "Yields", "detail": "Commercial property cap rates" }
    }
  },
  "forAgents": {
    "title": "For Agents & Owners",
    "subtitle": "Rozanowska is a curated platform. We accept properties by application only.",
    "cta": "Apply to List"
  },
  "offMarket": {
    "title": "Off-Market Opportunities",
    "subtitle": "Access exclusive properties that never appear in public listings. Discretion. Curation. Relationship.",
    "cta": "Request Access"
  },
  "contactStrip": {
    "title": "Let's Talk",
    "subtitle": "Whether you're looking to invest or have a property to present — start with a conversation.",
    "ctaInvestor": "Investor Inquiry",
    "ctaOwner": "Submit a Property"
  },
  "about": {
    "title": "About Rozanowska",
    "intro": "Warsaw-based commercial real estate advisor connecting international investors with Poland's best opportunities.",
    "bio1": "With deep knowledge of Poland's commercial property markets and a network spanning developers, institutional owners, and private investors, Rozanowska provides a curated, trust-first approach to real estate investment.",
    "bio2": "Every opportunity is vetted. Every introduction is intentional. No marketplace noise — just carefully selected properties and the advisory support to make informed decisions.",
    "howTitle": "How I Work",
    "values": {
      "curation": { "title": "Curation", "description": "Every property passes rigorous vetting. Quality over quantity." },
      "discretion": { "title": "Discretion", "description": "Off-market access and confidential transaction handling for serious investors." },
      "market": { "title": "Market Knowledge", "description": "Deep expertise across Poland's commercial markets — Warsaw, Kraków, Wrocław, Tricity, Poznań." }
    },
    "cta": "Get in Touch"
  },
  "opportunities": {
    "title": "Opportunities",
    "subtitle": "Curated investment properties across the Polish market."
  },
  "contact": {
    "title": "Contact",
    "subtitle": "Choose your inquiry type and describe your needs.",
    "tabs": {
      "investor": "Investor",
      "owner": "Owner / Agent",
      "general": "General"
    },
    "fields": {
      "name": "Full name",
      "email": "Email",
      "phone": "Phone (optional)",
      "message": "Message",
      "submit": "Send"
    },
    "investorPlaceholder": "I'm looking for commercial property in Poland. I'm interested in...",
    "ownerPlaceholder": "I'd like to present an investment property for consideration...",
    "generalPlaceholder": "I have a question about..."
  },
  "footer": {
    "tagline": "Curated real estate investment in Poland",
    "columns": {
      "cities": "Cities",
      "categories": "Categories",
      "company": "Company",
      "legal": "Legal"
    },
    "privacy": "Privacy Policy",
    "terms": "Terms of Service",
    "cookies": "Cookies"
  }
}
```

- [ ] **Step 7: Verify next-intl is installed and translation files load**

```bash
cd ~/OG/dev/OG-017-Magdas-Website
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors related to next-intl imports (there may be other pre-existing errors).

- [ ] **Step 8: Commit**

```bash
git add src/i18n/ src/messages/ src/middleware.ts package.json package-lock.json
git commit -m "feat: add next-intl i18n foundation with PL/EN translations

Polish default locale, English secondary. Locale routing with
pathnames (/o-nas → /about, /oferty → /opportunities, etc.).
Full dummy content in both languages."
```

---

## Task 2: Create Rozanowska theme and update global CSS

**Files:**
- Create: `src/styles/tokens/theme-rozanowska.css`
- Modify: `src/app/globals.css`
- Delete: `src/styles/tokens/theme-oganiko.css`

- [ ] **Step 1: Create theme-rozanowska.css**

Create `src/styles/tokens/theme-rozanowska.css`:

```css
/* ═══════════════════════════════════════════════════════════════
   Rozanowska Theme — Apple-Inspired Binary Dark/Light
   Premium real estate investment. See DESIGN.md for full spec.
   Import AFTER base.css.
   ═══════════════════════════════════════════════════════════════ */

@theme {
  /* ── Brand Palette ───────────────────────────────────────── */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-primary: #0071e3;
  --color-primary-light: #2997ff;
  --color-primary-dark: #0066cc;

  /* ── Neutrals (Apple-aligned) ────────────────────────────── */
  --color-gray-50: #f5f5f7;
  --color-gray-100: #e8e8ed;
  --color-gray-200: #d2d2d7;
  --color-gray-300: #b0b0b5;
  --color-gray-400: #86868b;
  --color-gray-500: #6e6e73;
  --color-gray-600: #515154;
  --color-gray-700: #3a3a3c;
  --color-gray-800: #2c2c2e;
  --color-gray-900: #1d1d1f;

  /* ── Semantic: Backgrounds (light mode = default) ─────────── */
  --color-bg: var(--color-white);
  --color-bg-secondary: var(--color-gray-50);
  --color-bg-card: var(--color-white);
  --color-bg-muted: var(--color-gray-100);
  --color-bg-dark: var(--color-black);

  /* ── Semantic: Text ───────────────────────────────────────── */
  --color-text: var(--color-gray-900);
  --color-text-secondary: rgba(0, 0, 0, 0.8);
  --color-text-muted: rgba(0, 0, 0, 0.48);
  --color-text-inverse: var(--color-white);

  /* ── Semantic: Interactive ─────────────────────────────────── */
  --color-accent: var(--color-primary);
  --color-cta: var(--color-primary);
  --color-cta-hover: #0077ed;
  --color-link: var(--color-primary-dark);
  --color-link-dark: var(--color-primary-light);
  --color-highlight: var(--color-primary);

  /* ── Semantic: Borders ────────────────────────────────────── */
  --color-border: var(--color-gray-200);
  --color-border-subtle: var(--color-gray-100);
  --color-border-focus: var(--color-primary);

  /* ── Semantic: States ─────────────────────────────────────── */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: var(--color-primary);

  /* ── Typography: Apple-Inspired ──────────────────────────── */
  --font-primary: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

- [ ] **Step 2: Update globals.css**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

/* ── OS-000 Design System Foundation ── */
@import "../styles/tokens/base.css";
@import "../styles/tokens/theme-rozanowska.css";

/* ── Dark section utility ─────────────────────────────────── */
/* Applied to sections that use the black background rhythm */
.section-dark {
  background: var(--color-black);
  color: var(--color-white);
}

.section-dark .text-muted {
  color: rgba(255, 255, 255, 0.56);
}

.section-dark .text-secondary {
  color: rgba(255, 255, 255, 0.8);
}

.section-dark a:not(.btn) {
  color: var(--color-link-dark);
}

/* ── Light section utility ────────────────────────────────── */
.section-light {
  background: var(--color-gray-50);
  color: var(--color-gray-900);
}

/* ── Global base styles ───────────────────────────────────── */
body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Apple-style headline typography */
h1, h2, h3 {
  font-family: var(--font-primary);
  letter-spacing: -0.02em;
}

h1 {
  line-height: 1.07;
  letter-spacing: -0.028em;
}

h2 {
  line-height: 1.14;
  letter-spacing: -0.022em;
}
```

- [ ] **Step 3: Delete unused theme file**

```bash
rm src/styles/tokens/theme-oganiko.css
```

- [ ] **Step 4: Verify the dev server starts without CSS errors**

```bash
npm run dev &
sleep 3
curl -s http://localhost:3000 | head -20
kill %1
```

Expected: page loads without CSS import errors.

- [ ] **Step 5: Commit**

```bash
git add src/styles/tokens/theme-rozanowska.css src/app/globals.css
git rm src/styles/tokens/theme-oganiko.css
git commit -m "feat: add Rozanowska theme — Apple-inspired dark/light binary rhythm

Replaces all-dark gold theme with Apple-aligned palette: pure black /
light grey section rhythm, single blue accent (#0071e3), Inter font.
Dark/light section utility classes for binary pacing."
```

---

## Task 3: Update Section component with dark variant

**Files:**
- Modify: `src/components/ds/Section.tsx`

- [ ] **Step 1: Add 'dark' background variant to Section**

In `src/components/ds/Section.tsx`, update the `backgrounds` record and `SectionProps.bg` type:

```typescript
/**
 * OS-000 Section Component
 * Wrapper for content sections with consistent spacing and max-width.
 * Supports Apple-inspired dark/light binary rhythm.
 */
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  bg?: 'default' | 'secondary' | 'muted' | 'accent' | 'dark';
  padding?: 'none' | 'sm' | 'default' | 'lg' | 'xl';
  className?: string;
  [key: string]: any;
}

export function Section({
  children,
  id,
  bg = 'default',
  padding = 'default',
  className = '',
  ...props
}: SectionProps) {
  const backgrounds: Record<string, string> = {
    default: 'bg-[var(--color-bg)]',
    secondary: 'bg-[var(--color-bg-secondary)]',
    muted: 'bg-[var(--color-bg-muted)]',
    accent: 'bg-[var(--color-accent)] text-[var(--color-text-inverse)]',
    dark: 'section-dark',
  };

  const paddings: Record<string, string> = {
    none: '',
    sm: 'py-[var(--spacing-8)]',
    default: 'py-[var(--spacing-16)]',
    lg: 'py-[var(--spacing-24)]',
    xl: 'py-32', /* 128px — cinematic spacing for hero-adjacent sections */
  };

  return (
    <section
      id={id}
      className={`w-full px-[var(--spacing-6)] ${backgrounds[bg]} ${paddings[padding]} ${className}`}
      {...props}
    >
      <div className="max-w-[var(--container-max)] mx-auto">
        {children}
      </div>
    </section>
  );
}

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionTitle({ children, subtitle, align = 'left', className = '' }: SectionTitleProps) {
  const alignment = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`mb-[var(--spacing-10)] ${alignment} ${className}`}>
      <h2 className="font-[var(--font-primary)] text-[var(--text-3xl)] font-[var(--weight-bold)] leading-[var(--leading-snug)]">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-[var(--spacing-4)] text-[var(--text-lg)] leading-[var(--leading-relaxed)] max-w-2xl mx-auto opacity-80">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

Key changes:
- Added `dark` to bg options — applies `section-dark` class from globals.css
- Added `xl` padding for cinematic spacing
- Removed hardcoded text colors from SectionTitle (inherits from section context — dark sections get white text automatically)

- [ ] **Step 2: Commit**

```bash
git add src/components/ds/Section.tsx
git commit -m "feat: add dark variant and xl padding to Section component

Supports Apple-inspired binary dark/light section rhythm.
SectionTitle inherits text color from section context."
```

---

## Task 4: Update Button with pill variant

**Files:**
- Modify: `src/components/ds/Button.tsx`

- [ ] **Step 1: Add pill shape option**

In `src/components/ds/Button.tsx`, replace the `rounded-[var(--radius-md)]` in the base class with a conditional, and add `pill` to the interface:

```typescript
/**
 * OS-000 Button Component
 * Variants: primary, outline, ghost, gold
 * Sizes: sm, md, lg
 * Shape: default (rounded corners) or pill (Apple-style capsule)
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  href,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  href?: string;
  className?: string;
  [key: string]: any;
}) {
  const radius = pill ? 'rounded-full' : 'rounded-[var(--radius-md)]';
  const base = `inline-flex items-center justify-center gap-2 font-medium ${radius} border-none cursor-pointer transition-all duration-[var(--transition-base)] no-underline`;

  const variants = {
    primary: 'bg-[var(--color-cta)] text-white hover:bg-[var(--color-cta-hover)] hover:-translate-y-0.5',
    outline: 'bg-transparent text-[var(--color-cta)] border border-[var(--color-cta)] hover:bg-[var(--color-cta)] hover:text-white',
    ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]',
    gold: 'bg-[var(--color-highlight)] text-white hover:brightness-110 hover:-translate-y-0.5',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-[var(--text-sm)]',
    md: 'px-6 py-2.5 text-[var(--text-sm)]',
    lg: 'px-8 py-3.5 text-[var(--text-base)]',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return <a href={href} className={classes} {...props}>{children}</a>;
  }

  return <button className={classes} {...props}>{children}</button>;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ds/Button.tsx
git commit -m "feat: add pill shape option to Button component

Apple-style capsule buttons via pill prop. Default remains
rounded corners for backward compatibility."
```

---

## Task 5: Create new domain components

**Files:**
- Create: `src/components/ds/LanguageSwitcher.tsx`
- Create: `src/components/ds/CityCard.tsx`
- Create: `src/components/ds/CategoryTile.tsx`
- Create: `src/components/ds/ListingCard.tsx`
- Create: `src/components/ds/StatBlock.tsx`
- Create: `src/components/ds/CTAPanel.tsx`
- Create: `src/components/ds/ContactForm.tsx`
- Modify: `src/components/ds/index.js`

- [ ] **Step 1: Create LanguageSwitcher**

Create `src/components/ds/LanguageSwitcher.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { routing } from '@/i18n/routing';

const localeLabels: Record<string, string> = {
  pl: 'PL',
  en: 'EN',
};

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(newLocale: string) {
    // Replace current locale prefix in pathname
    const segments = pathname.split('/').filter(Boolean);
    if (routing.locales.includes(segments[0] as any)) {
      segments[0] = newLocale === routing.defaultLocale ? '' : newLocale;
    } else {
      segments.unshift(newLocale === routing.defaultLocale ? '' : newLocale);
    }
    const newPath = '/' + segments.filter(Boolean).join('/') || '/';
    router.push(newPath);
    setOpen(false);
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-[var(--text-sm)] font-medium opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
        aria-label="Change language"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {localeLabels[locale]}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-md)] border border-[var(--color-gray-200)] py-1 min-w-[80px] z-50">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`block w-full text-left px-4 py-2 text-[var(--text-sm)] cursor-pointer transition-colors ${
                loc === locale
                  ? 'text-[var(--color-cta)] font-medium bg-[var(--color-gray-50)]'
                  : 'text-[var(--color-gray-900)] hover:bg-[var(--color-gray-50)]'
              }`}
            >
              {localeLabels[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create CityCard**

Create `src/components/ds/CityCard.tsx`:

```typescript
import Image from 'next/image';

interface CityCardProps {
  name: string;
  image: string;
  href?: string;
  className?: string;
}

export function CityCard({ name, image, href = '#', className = '' }: CityCardProps) {
  return (
    <a
      href={href}
      className={`group relative block overflow-hidden rounded-[var(--radius-lg)] aspect-[3/4] no-underline ${className}`}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 20vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-[var(--spacing-6)]">
        <h3 className="text-white text-[var(--text-2xl)] font-[var(--weight-semibold)] leading-[var(--leading-tight)]">
          {name}
        </h3>
      </div>
    </a>
  );
}
```

- [ ] **Step 3: Create CategoryTile**

Create `src/components/ds/CategoryTile.tsx`:

```typescript
import Image from 'next/image';

interface CategoryTileProps {
  name: string;
  image: string;
  href?: string;
  className?: string;
}

export function CategoryTile({ name, image, href = '#', className = '' }: CategoryTileProps) {
  return (
    <a
      href={href}
      className={`group relative block overflow-hidden rounded-[var(--radius-lg)] aspect-[4/3] no-underline ${className}`}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 25vw"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-white text-[var(--text-xl)] font-[var(--weight-semibold)] tracking-[var(--tracking-wide)]">
          {name}
        </h3>
      </div>
    </a>
  );
}
```

- [ ] **Step 4: Create ListingCard**

Create `src/components/ds/ListingCard.tsx`:

```typescript
import Image from 'next/image';
import { Button } from './Button';

interface ListingData {
  image: string;
  title: string;
  location: string;
  category: string;
  price: string;
  roi: string;
  area: string;
  status: string;
}

interface ListingCardProps {
  listing: ListingData;
  ctaLabel?: string;
  href?: string;
  className?: string;
}

export function ListingCard({ listing, ctaLabel = 'View Details', href = '#', className = '' }: ListingCardProps) {
  return (
    <div className={`group bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border-subtle)] hover:shadow-[var(--shadow-md)] transition-all duration-[var(--transition-base)] ${className}`}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute top-3 left-3 bg-black/70 text-white text-[var(--text-xs)] font-medium px-2.5 py-1 rounded-full">
          {listing.category}
        </span>
      </div>
      <div className="p-[var(--spacing-5)]">
        <h3 className="text-[var(--text-lg)] font-[var(--weight-semibold)] text-[var(--color-text)] mb-1 leading-[var(--leading-snug)]">
          {listing.title}
        </h3>
        <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mb-[var(--spacing-4)]">
          {listing.location}
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-[var(--spacing-4)] text-[var(--text-sm)]">
          <div>
            <span className="text-[var(--color-text-muted)]">Price </span>
            <span className="font-[var(--weight-medium)] text-[var(--color-text)]">{listing.price}</span>
          </div>
          <div>
            <span className="text-[var(--color-text-muted)]">ROI </span>
            <span className="font-[var(--weight-medium)] text-[var(--color-cta)]">{listing.roi}</span>
          </div>
          <div>
            <span className="text-[var(--color-text-muted)]">Area </span>
            <span className="font-[var(--weight-medium)] text-[var(--color-text)]">{listing.area}</span>
          </div>
          <div>
            <span className="text-[var(--color-text-muted)]">Status </span>
            <span className="font-[var(--weight-medium)] text-[var(--color-text)]">{listing.status}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" href={href} pill>{ctaLabel}</Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create StatBlock**

Create `src/components/ds/StatBlock.tsx`:

```typescript
interface StatBlockProps {
  value: string;
  label: string;
  detail?: string;
  className?: string;
}

export function StatBlock({ value, label, detail, className = '' }: StatBlockProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-[var(--text-4xl)] font-[var(--weight-bold)] text-[var(--color-cta)] mb-[var(--spacing-2)] leading-[1.07]">
        {value}
      </p>
      <p className="text-[var(--text-lg)] font-[var(--weight-medium)] mb-[var(--spacing-1)]">
        {label}
      </p>
      {detail && (
        <p className="text-[var(--text-sm)] opacity-60">
          {detail}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Create CTAPanel**

Create `src/components/ds/CTAPanel.tsx`:

```typescript
import { Button } from './Button';

interface CTAPanelProps {
  headline: string;
  subtitle?: string;
  cta: string;
  ctaHref?: string;
  secondaryCta?: string;
  secondaryCtaHref?: string;
  className?: string;
}

export function CTAPanel({
  headline,
  subtitle,
  cta,
  ctaHref = '#',
  secondaryCta,
  secondaryCtaHref,
  className = '',
}: CTAPanelProps) {
  return (
    <div className={`section-dark py-[var(--spacing-24)] px-[var(--spacing-6)] ${className}`}>
      <div className="max-w-[var(--container-max)] mx-auto text-center">
        <h2 className="text-[var(--text-3xl)] lg:text-[var(--text-4xl)] font-[var(--weight-bold)] text-white mb-[var(--spacing-4)] leading-[1.14]">
          {headline}
        </h2>
        {subtitle && (
          <p className="text-[var(--text-lg)] text-white/70 max-w-2xl mx-auto mb-[var(--spacing-8)] leading-[var(--leading-relaxed)]">
            {subtitle}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-[var(--spacing-4)]">
          <Button href={ctaHref} pill size="lg">{cta}</Button>
          {secondaryCta && (
            <Button href={secondaryCtaHref} variant="outline" pill size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              {secondaryCta}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create ContactForm**

Create `src/components/ds/ContactForm.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { Button } from './Button';

interface ContactFormProps {
  tabs: { key: string; label: string }[];
  fields: {
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
  };
  placeholders: Record<string, string>;
  className?: string;
}

export function ContactForm({ tabs, fields, placeholders, className = '' }: ContactFormProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || '');

  return (
    <div className={`max-w-xl mx-auto ${className}`}>
      {/* Tabs */}
      <div className="flex gap-1 mb-[var(--spacing-8)] bg-[var(--color-bg-muted)] rounded-full p-1">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-2.5 px-4 rounded-full text-[var(--text-sm)] font-medium transition-all cursor-pointer ${
              activeTab === key
                ? 'bg-white text-[var(--color-text)] shadow-[var(--shadow-sm)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // v1: no submission handler — just prevents page reload
        }}
        className="space-y-[var(--spacing-4)]"
      >
        <div>
          <label htmlFor="name" className="block text-[var(--text-sm)] font-medium text-[var(--color-text)] mb-1">
            {fields.name}
          </label>
          <input
            id="name"
            type="text"
            required
            className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-[var(--color-cta)] focus:border-transparent transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[var(--text-sm)] font-medium text-[var(--color-text)] mb-1">
            {fields.email}
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-[var(--color-cta)] focus:border-transparent transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-[var(--text-sm)] font-medium text-[var(--color-text)] mb-1">
            {fields.phone}
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-[var(--color-cta)] focus:border-transparent transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-[var(--text-sm)] font-medium text-[var(--color-text)] mb-1">
            {fields.message}
          </label>
          <textarea
            id="message"
            rows={5}
            required
            placeholder={placeholders[activeTab] || ''}
            className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-[var(--color-cta)] focus:border-transparent transition-shadow resize-y"
          />
        </div>
        <Button type="submit" pill size="lg" className="w-full">
          {fields.submit}
        </Button>
      </form>
    </div>
  );
}
```

- [ ] **Step 8: Update component index**

Replace `src/components/ds/index.js` with `src/components/ds/index.ts`:

```typescript
// OS-000 Design System — Component Exports (Rozanowska v1)
export { Button } from './Button';
export { Card, CardImage, CardTitle, CardBody } from './Card';
export { Hero } from './Hero';
export { Nav } from './Nav';
export { Footer } from './Footer';
export { Section, SectionTitle } from './Section';
export { LanguageSwitcher } from './LanguageSwitcher';
export { CityCard } from './CityCard';
export { CategoryTile } from './CategoryTile';
export { ListingCard } from './ListingCard';
export { StatBlock } from './StatBlock';
export { CTAPanel } from './CTAPanel';
export { ContactForm } from './ContactForm';
```

- [ ] **Step 9: Commit**

```bash
git rm src/components/ds/index.js
git add src/components/ds/
git commit -m "feat: add domain components — CityCard, CategoryTile, ListingCard, StatBlock, CTAPanel, ContactForm, LanguageSwitcher

Seven new components extending OS-000 for the Rozanowska real estate
domain. All use design tokens for consistent theming. ListingCard
surfaces investment data (ROI, area, status). ContactForm has tabbed
inquiry types. LanguageSwitcher reads current locale from next-intl."
```

---

## Task 6: Update Nav with sticky/transparent behaviour

**Files:**
- Modify: `src/components/ds/Nav.tsx`

- [ ] **Step 1: Rewrite Nav for sticky + transparent-over-hero + language switcher**

Replace `src/components/ds/Nav.tsx`:

```typescript
/**
 * OS-000 Nav Component — Rozanowska variant
 * Sticky, transparent over hero (dark bg), solid on scroll.
 * Includes LanguageSwitcher and CTA button.
 */
'use client';
import { useState, useEffect } from 'react';
import { Button } from './Button';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavLink { label: string; href: string; }

export function Nav({
  brand,
  brandHref = '/',
  links = [] as NavLink[],
  cta,
  ctaHref,
  className = '',
}: {
  brand: string;
  brandHref?: string;
  links?: NavLink[];
  cta?: string;
  ctaHref?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBg = scrolled
    ? 'bg-white/95 backdrop-blur-md border-b border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)]'
    : 'bg-transparent';

  const textColor = scrolled ? 'text-[var(--color-gray-900)]' : 'text-white';
  const linkColor = scrolled
    ? 'text-[var(--color-gray-600)] hover:text-[var(--color-gray-900)]'
    : 'text-white/80 hover:text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg} ${className}`}>
      <div className="max-w-[var(--container-max)] mx-auto px-[var(--spacing-6)] flex items-center justify-between h-16">
        {/* Brand */}
        <a href={brandHref} className={`font-[var(--font-primary)] text-[var(--text-xl)] font-[var(--weight-bold)] no-underline transition-colors ${textColor}`}>
          {brand}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-[var(--spacing-8)]">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`text-[var(--text-sm)] font-[var(--weight-medium)] transition-colors no-underline ${linkColor}`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right side: language switcher + CTA */}
        <div className="hidden md:flex items-center gap-[var(--spacing-4)]">
          <LanguageSwitcher className={textColor} />
          {cta && <Button href={ctaHref} size="sm" pill>{cta}</Button>}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 ${textColor}`}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open
              ? <path d="M6 6l12 12M6 18L18 6" />
              : <path d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[var(--color-border-subtle)] px-[var(--spacing-6)] py-[var(--spacing-4)]">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="block py-[var(--spacing-3)] text-[var(--text-base)] text-[var(--color-gray-600)] hover:text-[var(--color-gray-900)] no-underline"
            >
              {label}
            </a>
          ))}
          <div className="pt-[var(--spacing-4)] flex items-center justify-between">
            <LanguageSwitcher />
            {cta && <Button href={ctaHref} pill>{cta}</Button>}
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ds/Nav.tsx
git commit -m "feat: update Nav — sticky, transparent over hero, language switcher

Fixed to top, transparent with white text over dark hero, transitions
to solid white on scroll. LanguageSwitcher integrated in desktop and
mobile views."
```

---

## Task 7: Update Hero with cinematic background image variant

**Files:**
- Modify: `src/components/ds/Hero.tsx`

- [ ] **Step 1: Add 'cinematic' variant with background image + dark overlay**

Replace `src/components/ds/Hero.tsx`:

```typescript
/**
 * OS-000 Hero Component
 * Variants: centered, left, split, cinematic
 * Cinematic: full-viewport background image with dark overlay.
 */
import Image from 'next/image';
import { Button } from './Button';

interface HeroProps {
  headline: string;
  subtitle?: string;
  cta?: string;
  ctaHref?: string;
  ctaVariant?: 'primary' | 'outline' | 'ghost' | 'gold';
  secondaryCta?: string;
  secondaryCtaHref?: string;
  image?: string;
  imageAlt?: string;
  variant?: 'centered' | 'left' | 'split' | 'cinematic';
  className?: string;
}

export function Hero({
  headline,
  subtitle,
  cta,
  ctaHref,
  ctaVariant = 'primary',
  secondaryCta,
  secondaryCtaHref,
  image,
  imageAlt = '',
  variant = 'centered',
  className = '',
}: HeroProps) {
  if (variant === 'cinematic') {
    return (
      <section className={`relative w-full min-h-screen flex items-center justify-center ${className}`}>
        {/* Background image */}
        {image && (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-[var(--spacing-6)] text-center pt-16">
          <h1 className="font-[var(--font-primary)] text-[var(--text-4xl)] lg:text-[var(--text-5xl)] font-[var(--weight-bold)] text-white mb-[var(--spacing-6)] max-w-4xl mx-auto" style={{ lineHeight: '1.07', letterSpacing: '-0.028em' }}>
            {headline}
          </h1>
          {subtitle && (
            <p className="text-[var(--text-lg)] lg:text-[var(--text-xl)] text-white/75 mb-[var(--spacing-8)] max-w-2xl mx-auto leading-[var(--leading-relaxed)]">
              {subtitle}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-[var(--spacing-4)]">
            {cta && <Button href={ctaHref} variant={ctaVariant} size="lg" pill>{cta}</Button>}
            {secondaryCta && (
              <Button href={secondaryCtaHref} variant="outline" size="lg" pill className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                {secondaryCta}
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section className={`w-full py-[var(--spacing-20)] px-[var(--spacing-6)] ${className}`}>
        <div className="max-w-[var(--container-max)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-12)] items-center">
          <div>
            <h1 className="font-[var(--font-primary)] text-[var(--text-4xl)] lg:text-[var(--text-5xl)] font-[var(--weight-bold)] leading-[var(--leading-tight)] text-[var(--color-text)] mb-[var(--spacing-6)]">
              {headline}
            </h1>
            {subtitle && (
              <p className="text-[var(--text-lg)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)] mb-[var(--spacing-8)] max-w-lg">
                {subtitle}
              </p>
            )}
            <div className="flex flex-wrap gap-[var(--spacing-4)]">
              {cta && <Button href={ctaHref} variant={ctaVariant} size="lg" pill>{cta}</Button>}
              {secondaryCta && <Button href={secondaryCtaHref} variant="outline" size="lg" pill>{secondaryCta}</Button>}
            </div>
          </div>
          {image && (
            <div className="relative aspect-[4/3]">
              <Image src={image} alt={imageAlt} fill className="object-cover rounded-[var(--radius-xl)]" sizes="50vw" />
            </div>
          )}
        </div>
      </section>
    );
  }

  // centered or left-aligned
  const alignment = variant === 'centered' ? 'text-center items-center' : 'text-left items-start';

  return (
    <section className={`w-full py-[var(--spacing-20)] px-[var(--spacing-6)] ${className}`}>
      <div className={`max-w-[var(--container-max)] mx-auto flex flex-col ${alignment}`}>
        <h1 className="font-[var(--font-primary)] text-[var(--text-4xl)] lg:text-[var(--text-5xl)] font-[var(--weight-bold)] leading-[var(--leading-tight)] text-[var(--color-text)] mb-[var(--spacing-6)] max-w-3xl">
          {headline}
        </h1>
        {subtitle && (
          <p className="text-[var(--text-lg)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)] mb-[var(--spacing-8)] max-w-2xl">
            {subtitle}
          </p>
        )}
        <div className="flex flex-wrap gap-[var(--spacing-4)]">
          {cta && <Button href={ctaHref} variant={ctaVariant} size="lg" pill>{cta}</Button>}
          {secondaryCta && <Button href={secondaryCtaHref} variant="outline" size="lg" pill>{secondaryCta}</Button>}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ds/Hero.tsx
git commit -m "feat: add cinematic Hero variant with bg image + dark overlay

Full-viewport hero with background image, dark overlay gradient, and
Apple-style tight headline typography. All buttons now use pill shape."
```

---

## Task 8: Restructure app directory for i18n and build pages

**Files:**
- Delete: `src/app/layout.tsx`, `src/app/page.tsx`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx` (homepage)
- Create: `src/app/[locale]/o-nas/page.tsx` (about)
- Create: `src/app/[locale]/oferty/page.tsx` (opportunities)
- Create: `src/app/[locale]/kontakt/page.tsx` (contact)
- Move: `src/app/design-system/page.tsx` (stays outside [locale])

- [ ] **Step 1: Create locale layout**

Delete `src/app/layout.tsx` and `src/app/page.tsx`. Create `src/app/[locale]/layout.tsx`:

```typescript
import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = (messages as any).meta;

  return {
    title: meta?.title || 'Rozanowska',
    description: meta?.description || '',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`h-full antialiased ${inter.variable}`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-primary)' }}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create homepage**

Create `src/app/[locale]/page.tsx`:

```typescript
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/ds/Nav';
import { Hero } from '@/components/ds/Hero';
import { Section, SectionTitle } from '@/components/ds/Section';
import { CityCard } from '@/components/ds/CityCard';
import { CategoryTile } from '@/components/ds/CategoryTile';
import { ListingCard } from '@/components/ds/ListingCard';
import { StatBlock } from '@/components/ds/StatBlock';
import { CTAPanel } from '@/components/ds/CTAPanel';
import { Button } from '@/components/ds/Button';
import { Footer } from '@/components/ds/Footer';

// Placeholder image paths — replaced with Nano Banana images in Task 10
const PLACEHOLDER = '/images/placeholder.svg';

const cities = ['warsaw', 'krakow', 'wroclaw', 'tricity', 'poznan'] as const;
const categories = ['commercial', 'investment', 'land', 'residential'] as const;
const listingKeys = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6'] as const;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = useTranslations();

  return (
    <main>
      <Nav
        brand="Rozanowska"
        brandHref={`/${locale === 'pl' ? '' : locale}`}
        links={[
          { label: t('nav.opportunities'), href: locale === 'pl' ? '/oferty' : `/${locale}/opportunities` },
          { label: t('nav.explorePoland'), href: '#explore' },
          { label: t('nav.about'), href: locale === 'pl' ? '/o-nas' : `/${locale}/about` },
          { label: t('nav.contact'), href: locale === 'pl' ? '/kontakt' : `/${locale}/contact` },
        ]}
        cta={t('nav.cta')}
        ctaHref={locale === 'pl' ? '/kontakt' : `/${locale}/contact`}
      />

      {/* 1. Hero */}
      <Hero
        headline={t('hero.headline')}
        subtitle={t('hero.subtitle')}
        cta={t('hero.cta')}
        ctaHref={locale === 'pl' ? '/oferty' : `/${locale}/opportunities`}
        image={`/images/hero/warsaw-skyline.jpg`}
        imageAlt="Warsaw skyline"
        variant="cinematic"
      />

      {/* 2. Explore Poland */}
      <Section id="explore" bg="secondary" padding="lg">
        <SectionTitle align="center" subtitle={t('cities.subtitle')}>
          {t('cities.title')}
        </SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[var(--spacing-4)]">
          {cities.map((city) => (
            <CityCard
              key={city}
              name={t(`cities.${city}`)}
              image={`/images/cities/${city}.jpg`}
            />
          ))}
        </div>
      </Section>

      {/* 3. Investment Categories */}
      <Section bg="default" padding="lg">
        <SectionTitle align="center" subtitle={t('categories.subtitle')}>
          {t('categories.title')}
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-6)]">
          {categories.map((cat) => (
            <CategoryTile
              key={cat}
              name={t(`categories.${cat}`)}
              image={`/images/categories/${cat}.jpg`}
            />
          ))}
        </div>
      </Section>

      {/* 4. Featured Opportunities */}
      <Section bg="secondary" padding="lg">
        <SectionTitle align="center" subtitle={t('featured.subtitle')}>
          {t('featured.title')}
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-6)]">
          {listingKeys.map((key) => (
            <ListingCard
              key={key}
              listing={{
                image: `/images/listings/${key}.jpg`,
                title: t(`featured.listings.${key}.title`),
                location: t(`featured.listings.${key}.location`),
                category: t(`featured.listings.${key}.category`),
                price: t(`featured.listings.${key}.price`),
                roi: t(`featured.listings.${key}.roi`),
                area: t(`featured.listings.${key}.area`),
                status: t(`featured.listings.${key}.status`),
              }}
              ctaLabel={t('featured.viewDetails')}
            />
          ))}
        </div>
      </Section>

      {/* 5. Why Poland */}
      <Section bg="dark" padding="lg">
        <SectionTitle align="center" subtitle={t('whyPoland.subtitle')}>
          {t('whyPoland.title')}
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-8)]">
          {(['gdp', 'population', 'fdi', 'yields'] as const).map((stat) => (
            <StatBlock
              key={stat}
              value={t(`whyPoland.stats.${stat}.value`)}
              label={t(`whyPoland.stats.${stat}.label`)}
              detail={t(`whyPoland.stats.${stat}.detail`)}
            />
          ))}
        </div>
      </Section>

      {/* 6. For Agents / Owners */}
      <Section bg="secondary" padding="lg">
        <div className="text-center max-w-2xl mx-auto">
          <SectionTitle align="center" subtitle={t('forAgents.subtitle')}>
            {t('forAgents.title')}
          </SectionTitle>
          <Button href={locale === 'pl' ? '/kontakt' : `/${locale}/contact`} pill size="lg">
            {t('forAgents.cta')}
          </Button>
        </div>
      </Section>

      {/* 7. Off-Market */}
      <CTAPanel
        headline={t('offMarket.title')}
        subtitle={t('offMarket.subtitle')}
        cta={t('offMarket.cta')}
        ctaHref={locale === 'pl' ? '/kontakt' : `/${locale}/contact`}
      />

      {/* 8. Contact strip */}
      <Section bg="default" padding="lg">
        <div className="text-center">
          <SectionTitle align="center" subtitle={t('contactStrip.subtitle')}>
            {t('contactStrip.title')}
          </SectionTitle>
          <div className="flex flex-wrap justify-center gap-[var(--spacing-4)]">
            <Button href={locale === 'pl' ? '/kontakt' : `/${locale}/contact`} pill size="lg">
              {t('contactStrip.ctaInvestor')}
            </Button>
            <Button href={locale === 'pl' ? '/kontakt' : `/${locale}/contact`} variant="outline" pill size="lg">
              {t('contactStrip.ctaOwner')}
            </Button>
          </div>
        </div>
      </Section>

      <Footer
        brand="Rozanowska"
        variant="columns"
        columns={[
          {
            title: t('footer.columns.cities'),
            links: cities.map((c) => ({ label: t(`cities.${c}`), href: '#' })),
          },
          {
            title: t('footer.columns.categories'),
            links: categories.map((c) => ({ label: t(`categories.${c}`), href: '#' })),
          },
          {
            title: t('footer.columns.company'),
            links: [
              { label: t('nav.about'), href: locale === 'pl' ? '/o-nas' : `/${locale}/about` },
              { label: t('nav.contact'), href: locale === 'pl' ? '/kontakt' : `/${locale}/contact` },
            ],
          },
          {
            title: t('footer.columns.legal'),
            links: [
              { label: t('footer.privacy'), href: '#' },
              { label: t('footer.terms'), href: '#' },
              { label: t('footer.cookies'), href: '#' },
            ],
          },
        ]}
      />
    </main>
  );
}
```

- [ ] **Step 3: Create About page**

Create `src/app/[locale]/o-nas/page.tsx`:

```typescript
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/ds/Nav';
import { Section, SectionTitle } from '@/components/ds/Section';
import { Button } from '@/components/ds/Button';
import { Footer } from '@/components/ds/Footer';
import Image from 'next/image';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = useTranslations();

  const values = ['curation', 'discretion', 'market'] as const;

  return (
    <main>
      <Nav
        brand="Rozanowska"
        brandHref={locale === 'pl' ? '/' : `/${locale}`}
        links={[
          { label: t('nav.opportunities'), href: locale === 'pl' ? '/oferty' : `/${locale}/opportunities` },
          { label: t('nav.about'), href: locale === 'pl' ? '/o-nas' : `/${locale}/about` },
          { label: t('nav.contact'), href: locale === 'pl' ? '/kontakt' : `/${locale}/contact` },
        ]}
        cta={t('nav.cta')}
        ctaHref={locale === 'pl' ? '/kontakt' : `/${locale}/contact`}
      />

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      <Section bg="default" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-12)] items-start">
          {/* Portrait */}
          <div className="relative aspect-[3/4] rounded-[var(--radius-xl)] overflow-hidden">
            <Image
              src="/images/about/magda-portrait.jpg"
              alt="Magda Rozanowska"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Bio */}
          <div>
            <h1 className="font-[var(--font-primary)] text-[var(--text-4xl)] font-[var(--weight-bold)] text-[var(--color-text)] mb-[var(--spacing-4)]" style={{ lineHeight: '1.07' }}>
              {t('about.title')}
            </h1>
            <p className="text-[var(--text-lg)] text-[var(--color-cta)] font-[var(--weight-medium)] mb-[var(--spacing-8)]">
              {t('about.intro')}
            </p>
            <p className="text-[var(--text-base)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)] mb-[var(--spacing-4)]">
              {t('about.bio1')}
            </p>
            <p className="text-[var(--text-base)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)]">
              {t('about.bio2')}
            </p>
          </div>
        </div>
      </Section>

      {/* How I Work */}
      <Section bg="secondary" padding="lg">
        <SectionTitle align="center">
          {t('about.howTitle')}
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-8)]">
          {values.map((v) => (
            <div key={v} className="text-center">
              <h3 className="text-[var(--text-xl)] font-[var(--weight-semibold)] text-[var(--color-text)] mb-[var(--spacing-3)]">
                {t(`about.values.${v}.title`)}
              </h3>
              <p className="text-[var(--text-base)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)]">
                {t(`about.values.${v}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section bg="dark" padding="lg">
        <div className="text-center">
          <h2 className="text-[var(--text-3xl)] font-[var(--weight-bold)] text-white mb-[var(--spacing-6)]" style={{ lineHeight: '1.14' }}>
            {t('contactStrip.title')}
          </h2>
          <Button href={locale === 'pl' ? '/kontakt' : `/${locale}/contact`} pill size="lg">
            {t('about.cta')}
          </Button>
        </div>
      </Section>

      <Footer brand="Rozanowska" variant="simple" />
    </main>
  );
}
```

- [ ] **Step 4: Create Opportunities page**

Create `src/app/[locale]/oferty/page.tsx`:

```typescript
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/ds/Nav';
import { Section, SectionTitle } from '@/components/ds/Section';
import { ListingCard } from '@/components/ds/ListingCard';
import { CTAPanel } from '@/components/ds/CTAPanel';
import { Footer } from '@/components/ds/Footer';

const listingKeys = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6'] as const;

export default async function OpportunitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = useTranslations();

  return (
    <main>
      <Nav
        brand="Rozanowska"
        brandHref={locale === 'pl' ? '/' : `/${locale}`}
        links={[
          { label: t('nav.opportunities'), href: locale === 'pl' ? '/oferty' : `/${locale}/opportunities` },
          { label: t('nav.about'), href: locale === 'pl' ? '/o-nas' : `/${locale}/about` },
          { label: t('nav.contact'), href: locale === 'pl' ? '/kontakt' : `/${locale}/contact` },
        ]}
        cta={t('nav.cta')}
        ctaHref={locale === 'pl' ? '/kontakt' : `/${locale}/contact`}
      />

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      <Section bg="default" padding="lg">
        <SectionTitle align="center" subtitle={t('opportunities.subtitle')}>
          {t('opportunities.title')}
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-6)]">
          {listingKeys.map((key) => (
            <ListingCard
              key={key}
              listing={{
                image: `/images/listings/${key}.jpg`,
                title: t(`featured.listings.${key}.title`),
                location: t(`featured.listings.${key}.location`),
                category: t(`featured.listings.${key}.category`),
                price: t(`featured.listings.${key}.price`),
                roi: t(`featured.listings.${key}.roi`),
                area: t(`featured.listings.${key}.area`),
                status: t(`featured.listings.${key}.status`),
              }}
              ctaLabel={t('featured.viewDetails')}
            />
          ))}
        </div>
      </Section>

      <CTAPanel
        headline={t('offMarket.title')}
        subtitle={t('offMarket.subtitle')}
        cta={t('offMarket.cta')}
        ctaHref={locale === 'pl' ? '/kontakt' : `/${locale}/contact`}
      />

      <Footer brand="Rozanowska" variant="simple" />
    </main>
  );
}
```

- [ ] **Step 5: Create Contact page**

Create `src/app/[locale]/kontakt/page.tsx`:

```typescript
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/ds/Nav';
import { Section, SectionTitle } from '@/components/ds/Section';
import { ContactForm } from '@/components/ds/ContactForm';
import { Footer } from '@/components/ds/Footer';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = useTranslations();

  return (
    <main>
      <Nav
        brand="Rozanowska"
        brandHref={locale === 'pl' ? '/' : `/${locale}`}
        links={[
          { label: t('nav.opportunities'), href: locale === 'pl' ? '/oferty' : `/${locale}/opportunities` },
          { label: t('nav.about'), href: locale === 'pl' ? '/o-nas' : `/${locale}/contact` },
          { label: t('nav.contact'), href: locale === 'pl' ? '/kontakt' : `/${locale}/contact` },
        ]}
        cta={t('nav.cta')}
        ctaHref={locale === 'pl' ? '/kontakt' : `/${locale}/contact`}
      />

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      <Section bg="default" padding="lg">
        <SectionTitle align="center" subtitle={t('contact.subtitle')}>
          {t('contact.title')}
        </SectionTitle>
        <ContactForm
          tabs={[
            { key: 'investor', label: t('contact.tabs.investor') },
            { key: 'owner', label: t('contact.tabs.owner') },
            { key: 'general', label: t('contact.tabs.general') },
          ]}
          fields={{
            name: t('contact.fields.name'),
            email: t('contact.fields.email'),
            phone: t('contact.fields.phone'),
            message: t('contact.fields.message'),
            submit: t('contact.fields.submit'),
          }}
          placeholders={{
            investor: t('contact.investorPlaceholder'),
            owner: t('contact.ownerPlaceholder'),
            general: t('contact.generalPlaceholder'),
          }}
        />
      </Section>

      <Footer brand="Rozanowska" variant="simple" />
    </main>
  );
}
```

- [ ] **Step 6: Create a root layout redirect**

Create `src/app/layout.tsx` as a minimal wrapper (Next.js requires it):

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 7: Delete old page.tsx**

```bash
rm src/app/page.tsx
```

- [ ] **Step 8: Verify the build compiles**

```bash
cd ~/OG/dev/OG-017-Magdas-Website
npm run build 2>&1 | tail -20
```

Expected: build succeeds (images will 404 at runtime until Task 10 generates them, but compilation should pass).

- [ ] **Step 9: Commit**

```bash
git add src/app/ src/components/
git commit -m "feat: build all pages — homepage (8 sections), about, opportunities, contact

Full i18n page structure with [locale] routing. Homepage: cinematic hero,
explore Poland, investment categories, featured listings, why Poland,
for agents, off-market, contact strip. All content from translation files.
Image paths ready for Nano Banana generation in next task."
```

---

## Task 9: Create placeholder images directory and SVG fallback

**Files:**
- Create: `public/images/placeholder.svg`
- Create: directory stubs for all image folders

- [ ] **Step 1: Create image directories and placeholder SVG**

```bash
cd ~/OG/dev/OG-017-Magdas-Website
mkdir -p public/images/{hero,cities,categories,listings,personas,about,cta}
```

Create `public/images/placeholder.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <rect width="1200" height="800" fill="#1d1d1f"/>
  <text x="600" y="400" text-anchor="middle" dominant-baseline="central" fill="#6e6e73" font-family="Inter, sans-serif" font-size="24">Image Placeholder</text>
</svg>
```

- [ ] **Step 2: Commit**

```bash
git add public/images/
git commit -m "chore: add image directory structure and SVG placeholder

Directories ready for Nano Banana image generation: hero, cities,
categories, listings, personas, about, cta."
```

---

## Task 10: Generate images via Nano Banana

**Files:**
- Create: 18 images in `public/images/` subdirectories

This task uses the `nanobanana` skill to generate all placeholder images. Each step is one image generation call. All images at 1K resolution, photorealistic, editorial quality.

**Important:** Each Nano Banana prompt must specify: photorealistic, no text overlays, no watermarks, no logos, editorial photography style.

- [ ] **Step 1: Hero — Warsaw skyline**

Prompt: `Photorealistic aerial view of Warsaw city skyline at golden hour, Palace of Culture and Science prominent in center, modern glass skyscrapers surrounding it, warm sunset light, cinematic composition, wide angle, editorial architectural photography, no text, no watermarks`

Save to: `public/images/hero/warsaw-skyline.jpg` (16:9, 1920x1080)

- [ ] **Step 2: City — Warsaw**

Prompt: `Photorealistic street-level view of Warsaw Zlote Tarasy business district at dusk, modern glass office buildings, warm street lighting, professional editorial photography, shallow depth of field, no text, no people in focus, no watermarks`

Save to: `public/images/cities/warsaw.jpg` (3:4, 900x1200)

- [ ] **Step 3: City — Kraków**

Prompt: `Photorealistic view of Kraków with Wawel Castle on the hill, Vistula river in foreground, mix of historic architecture and modern buildings in background, soft afternoon light, editorial travel photography, no text, no watermarks`

Save to: `public/images/cities/krakow.jpg` (3:4, 900x1200)

- [ ] **Step 4: City — Wrocław**

Prompt: `Photorealistic view of Wroclaw Market Square, colorful historic townhouses, cathedral spires visible, afternoon light with blue sky and gentle clouds, editorial architectural photography, no text, no watermarks`

Save to: `public/images/cities/wroclaw.jpg` (3:4, 900x1200)

- [ ] **Step 5: City — Tricity**

Prompt: `Photorealistic view of Gdansk waterfront along Motlawa river, historic merchant houses, modern cranes in background, blue hour twilight, reflections in water, editorial photography, no text, no watermarks`

Save to: `public/images/cities/tricity.jpg` (3:4, 900x1200)

- [ ] **Step 6: City — Poznań**

Prompt: `Photorealistic view of Poznan Old Market Square with colorful Renaissance merchant houses, town hall visible, golden hour sunlight, lively but not crowded, editorial travel photography, no text, no watermarks`

Save to: `public/images/cities/poznan.jpg` (3:4, 900x1200)

- [ ] **Step 7: Category — Commercial**

Prompt: `Photorealistic interior of a modern Class A office lobby, polished marble floor, floor-to-ceiling glass, reception desk, warm artificial lighting, premium corporate aesthetic, editorial interior photography, no text, no people, no watermarks`

Save to: `public/images/categories/commercial.jpg` (4:3, 1200x900)

- [ ] **Step 8: Category — Investment**

Prompt: `Photorealistic exterior of a modern mixed-use commercial building at dusk, ground floor retail lit up, upper floors office space, urban European setting, editorial architectural photography, no text, no watermarks`

Save to: `public/images/categories/investment.jpg` (4:3, 1200x900)

- [ ] **Step 9: Category — Land**

Prompt: `Photorealistic aerial view of a large flat development land plot next to a highway in Poland, green fields, construction crane in distance suggesting development potential, morning light, editorial photography, no text, no watermarks`

Save to: `public/images/categories/land.jpg` (4:3, 1200x900)

- [ ] **Step 10: Category — Premium Residential**

Prompt: `Photorealistic interior of a luxury penthouse apartment, floor-to-ceiling windows with city skyline view, modern minimalist furniture, warm evening light, hardwood floors, editorial interior design photography, no text, no watermarks`

Save to: `public/images/categories/residential.jpg` (4:3, 1200x900)

- [ ] **Step 11-16: Listing images (l1 through l6)**

Generate six listing images. Prompts per listing:

- **l1** (Class A Office): `Photorealistic exterior of a modern glass office tower in Warsaw Mokotow district, sleek architecture, landscaped entrance, clear sky, editorial architectural photography, no text, no watermarks`
- **l2** (Logistics Hub): `Photorealistic exterior of a large modern warehouse logistics facility near a motorway, loading docks visible, clean industrial aesthetic, clear day, editorial photography, no text, no watermarks`
- **l3** (Mixed-Use): `Photorealistic exterior of a European mixed-use building, ground floor retail shops with apartments above, historic facade renovated, warm afternoon light, editorial photography, no text, no watermarks`
- **l4** (Retail, Old Town): `Photorealistic exterior of a premium retail storefront on a European old town cobblestone street, elegant signage area, warm lighting from windows, dusk, editorial photography, no text, no watermarks`
- **l5** (Investment Land): `Photorealistic aerial view of a large coastal land plot near Gdansk Poland, access road visible, Baltic Sea in distance, development potential clear, morning light, editorial photography, no text, no watermarks`
- **l6** (Penthouse): `Photorealistic interior of a luxury penthouse living room with panoramic Warsaw skyline view through floor-to-ceiling windows, modern furniture, evening city lights visible, editorial interior photography, no text, no watermarks`

Save to: `public/images/listings/l1.jpg` through `public/images/listings/l6.jpg` (16:9, 1920x1080)

- [ ] **Step 17: About portrait**

Prompt: `Photorealistic portrait of a professional woman in her early 30s, dark hair, wearing a navy blazer and white blouse, natural smile, modern Warsaw office with large windows in background, soft natural light from left, shallow depth of field, editorial portrait photography, no text, no watermarks`

Save to: `public/images/about/magda-portrait.jpg` (3:4, 900x1200)

- [ ] **Step 18: Persona — Klaus Richter**

Prompt from DESIGN.md §9: `Professional man, early 50s, silver-grey hair, dark suit, no tie, modern office with panoramic city view through floor-to-ceiling windows, natural directional light from left, shallow depth of field, editorial portrait photography, photorealistic, no text`

Save to: `public/images/personas/klaus-richter.jpg` (3:4, 900x1200)

- [ ] **Step 19: Persona — Anna Wojciechowska**

Prompt from DESIGN.md §9: `Professional woman, late 30s, dark navy blazer, white blouse, confident posture, standing in a modern Warsaw business district setting with glass buildings in background, warm natural light, shallow depth of field, editorial portrait photography, photorealistic, no text`

Save to: `public/images/personas/anna-wojciechowska.jpg` (3:4, 900x1200)

- [ ] **Step 20: Persona — James Chen**

Prompt from DESIGN.md §9: `Professional man, mid 40s, East Asian appearance, smart casual outfit with navy quarter-zip sweater, reading on a tablet, seated in a modern co-working space with warm ambient lighting, plants in background, candid editorial photography style, photorealistic, no text`

Save to: `public/images/personas/james-chen.jpg` (3:4, 900x1200)

- [ ] **Step 21: Off-market CTA background**

Prompt: `Photorealistic aerial view of Warsaw city at night, city lights, modern skyline, moody atmospheric blue-black tones, cinematic wide angle, editorial photography, no text, no watermarks`

Save to: `public/images/cta/off-market-night.jpg` (16:9, 1920x1080)

- [ ] **Step 22: Commit all images**

```bash
git add public/images/
git commit -m "feat: add AI-generated placeholder imagery via Nano Banana

18 photorealistic images: Warsaw hero skyline, 5 city cards, 4 category
tiles, 6 listing photos, about portrait, 3 persona portraits, off-market
CTA background. All 1K+ resolution, editorial quality."
```

---

## Task 11: Update next.config.ts and verify full build

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Update next.config.ts for next-intl**

Replace `next.config.ts`:

```typescript
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 2: Run full build**

```bash
cd ~/OG/dev/OG-017-Magdas-Website
npm run build
```

Expected: build succeeds with all pages generated for both locales.

- [ ] **Step 3: Run dev server and verify pages**

```bash
npm run dev
```

Check manually:
- `http://localhost:3000` — Polish homepage
- `http://localhost:3000/en` — English homepage
- `http://localhost:3000/o-nas` — Polish about
- `http://localhost:3000/en/about` — English about
- `http://localhost:3000/oferty` — Polish opportunities
- `http://localhost:3000/kontakt` — Polish contact
- `http://localhost:3000/design-system` — Design system viewer

- [ ] **Step 4: Commit**

```bash
git add next.config.ts
git commit -m "feat: configure next-intl plugin and image optimization

Build verified with all pages generating for both PL and EN locales."
```

---

## Task 12: Final verification and push

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

Fix any lint errors.

- [ ] **Step 2: Run build one final time**

```bash
npm run build
```

Expected: clean build, no errors.

- [ ] **Step 3: Commit any lint fixes**

```bash
git add -A
git commit -m "fix: lint cleanup"
```

(Skip if no lint fixes needed.)

- [ ] **Step 4: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 5: Update project CLAUDE.md last touched date**

In `CLAUDE.md`, update:
- `Last touched` to today's date
- `Notes for the next session` with current status

- [ ] **Step 6: Update vault project page last_touched**

In vault `README.md`, update `last_touched` to today's date.

- [ ] **Step 7: Final commit**

```bash
git add CLAUDE.md
git commit -m "docs: update last touched and session notes"
git push origin main
```
