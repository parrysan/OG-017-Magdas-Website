# Design System Inspired by Apple

## 1. Visual Theme & Atmosphere

Apple's website is a masterclass in controlled drama — vast expanses of pure black and near-white serve as cinematic backdrops for products that are photographed as if they were sculptures in a gallery. The design philosophy is reductive to its core: every pixel exists in service of the product, and the interface itself retreats until it becomes invisible. This is not minimalism as aesthetic preference; it is minimalism as reverence for the object.

The typography anchors everything. San Francisco (SF Pro Display for large sizes, SF Pro Text for body) is Apple's proprietary typeface, engineered with optical sizing that automatically adjusts letterforms depending on point size. At display sizes (56px), weight 600 with a tight line-height of 1.07 and subtle negative letter-spacing (-0.28px) creates headlines that feel machined rather than typeset — precise, confident, and unapologetically direct. At body sizes (17px), the tracking loosens slightly (-0.374px) and line-height opens to 1.47, creating a reading rhythm that is comfortable without ever feeling slack.

The color story is starkly binary. Product sections alternate between pure black (`#000000`) backgrounds with white text and light gray (`#f5f5f7`) backgrounds with near-black text (`#1d1d1f`). This creates a cinematic pacing — dark sections feel immersive and premium, light sections feel open and informational. The only chromatic accent is Apple Blue (`#0071e3`), reserved exclusively for interactive elements: links, buttons, and focus states. This singular accent color in a sea of neutrals gives every clickable element unmistakable visibility.

**Key Characteristics:**
- SF Pro Display/Text with optical sizing — letterforms adapt automatically to size context
- Binary light/dark section rhythm: black (`#000000`) alternating with light gray (`#f5f5f7`)
- Single accent color: Apple Blue (`#0071e3`) reserved exclusively for interactive elements
- Product-as-hero photography on solid color fields — no gradients, no textures, no distractions
- Extremely tight headline line-heights (1.07-1.14) creating compressed, billboard-like impact
- Full-width section layout with centered content — the viewport IS the canvas
- Pill-shaped CTAs (980px radius) creating soft, approachable action buttons
- Generous whitespace between sections allowing each product moment to breathe

## 2. Color Palette & Roles

### Primary
- **Pure Black** (`#000000`): Hero section backgrounds, immersive product showcases. The darkest canvas for the brightest products.
- **Light Gray** (`#f5f5f7`): Alternate section backgrounds, informational areas. Not white — the slight blue-gray tint prevents sterility.
- **Near Black** (`#1d1d1f`): Primary text on light backgrounds, dark button fills. Slightly warmer than pure black for comfortable reading.

### Interactive
- **Apple Blue** (`#0071e3`): `--sk-focus-color`, primary CTA backgrounds, focus rings. The ONLY chromatic color in the interface.
- **Link Blue** (`#0066cc`): `--sk-body-link-color`, inline text links. Slightly darker than Apple Blue for text-level readability.
- **Bright Blue** (`#2997ff`): Links on dark backgrounds. Higher luminance for contrast on black sections.

### Text
- **White** (`#ffffff`): Text on dark backgrounds, button text on blue/dark CTAs.
- **Near Black** (`#1d1d1f`): Primary body text on light backgrounds.
- **Black 80%** (`rgba(0, 0, 0, 0.8)`): Secondary text, nav items on light backgrounds. Slightly softened.
- **Black 48%** (`rgba(0, 0, 0, 0.48)`): Tertiary text, disabled states, carousel controls.

### Surface & Dark Variants
- **Dark Surface 1** (`#272729`): Card backgrounds in dark sections.
- **Dark Surface 2** (`#262628`): Subtle surface variation in dark contexts.
- **Dark Surface 3** (`#28282a`): Elevated cards on dark backgrounds.
- **Dark Surface 4** (`#2a2a2d`): Highest dark surface elevation.
- **Dark Surface 5** (`#242426`): Deepest dark surface tone.

### Button States
- **Button Active** (`#ededf2`): Active/pressed state for light buttons.
- **Button Default Light** (`#fafafc`): Search/filter button backgrounds.
- **Overlay** (`rgba(210, 210, 215, 0.64)`): Media control scrims, overlays.
- **White 32%** (`rgba(255, 255, 255, 0.32)`): Hover state on dark modal close buttons.

### Shadows
- **Card Shadow** (`rgba(0, 0, 0, 0.22) 3px 5px 30px 0px`): Soft, diffused elevation for product cards. Offset and wide blur create a natural, photographic shadow.

## 3. Typography Rules

### Font Family
- **Display**: `SF Pro Display`, with fallbacks: `SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif`
- **Body**: `SF Pro Text`, with fallbacks: `SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif`
- SF Pro Display is used at 20px and above; SF Pro Text is optimized for 19px and below.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Hero | SF Pro Display | 56px (3.50rem) | 600 | 1.07 (tight) | -0.28px | Product launch headlines, maximum impact |
| Section Heading | SF Pro Display | 40px (2.50rem) | 600 | 1.10 (tight) | normal | Feature section titles |
| Tile Heading | SF Pro Display | 28px (1.75rem) | 400 | 1.14 (tight) | 0.196px | Product tile headlines |
| Card Title | SF Pro Display | 21px (1.31rem) | 700 | 1.19 (tight) | 0.231px | Bold card headings |
| Sub-heading | SF Pro Display | 21px (1.31rem) | 400 | 1.19 (tight) | 0.231px | Regular card headings |
| Nav Heading | SF Pro Text | 34px (2.13rem) | 600 | 1.47 | -0.374px | Large navigation headings |
| Sub-nav | SF Pro Text | 24px (1.50rem) | 300 | 1.50 | normal | Light sub-navigation text |
| Body | SF Pro Text | 17px (1.06rem) | 400 | 1.47 | -0.374px | Standard reading text |
| Body Emphasis | SF Pro Text | 17px (1.06rem) | 600 | 1.24 (tight) | -0.374px | Emphasized body text, labels |
| Button Large | SF Pro Text | 18px (1.13rem) | 300 | 1.00 (tight) | normal | Large button text, light weight |
| Button | SF Pro Text | 17px (1.06rem) | 400 | 2.41 (relaxed) | normal | Standard button text |
| Link | SF Pro Text | 14px (0.88rem) | 400 | 1.43 | -0.224px | Body links, "Learn more" |
| Caption | SF Pro Text | 14px (0.88rem) | 400 | 1.29 (tight) | -0.224px | Secondary text, descriptions |
| Caption Bold | SF Pro Text | 14px (0.88rem) | 600 | 1.29 (tight) | -0.224px | Emphasized captions |
| Micro | SF Pro Text | 12px (0.75rem) | 400 | 1.33 | -0.12px | Fine print, footnotes |
| Micro Bold | SF Pro Text | 12px (0.75rem) | 600 | 1.33 | -0.12px | Bold fine print |
| Nano | SF Pro Text | 10px (0.63rem) | 400 | 1.47 | -0.08px | Legal text, smallest size |

### Principles
- **Optical sizing as philosophy**: SF Pro automatically switches between Display and Text optical sizes. Display versions have wider letter spacing and thinner strokes optimized for large sizes; Text versions are tighter and sturdier for small sizes. This means the font literally changes its DNA based on context.
- **Weight restraint**: The scale spans 300 (light) to 700 (bold) but most text lives at 400 (regular) and 600 (semibold). Weight 300 appears only on large decorative text. Weight 700 is rare, used only for bold card titles.
- **Negative tracking at all sizes**: Unlike most systems that only track headlines, Apple applies subtle negative letter-spacing even at body sizes (-0.374px at 17px, -0.224px at 14px, -0.12px at 12px). This creates universally tight, efficient text.
- **Extreme line-height range**: Headlines compress to 1.07 while body text opens to 1.47, and some button contexts stretch to 2.41. This dramatic range creates clear visual hierarchy through rhythm alone.

## 4. Component Stylings

### Buttons

**Primary Blue (CTA)**
- Background: `#0071e3` (Apple Blue)
- Text: `#ffffff`
- Padding: 8px 15px
- Radius: 8px
- Border: 1px solid transparent
- Font: SF Pro Text, 17px, weight 400
- Hover: background brightens slightly
- Active: `#ededf2` background shift
- Focus: `2px solid var(--sk-focus-color, #0071E3)` outline
- Use: Primary call-to-action ("Buy", "Shop iPhone")

**Primary Dark**
- Background: `#1d1d1f`
- Text: `#ffffff`
- Padding: 8px 15px
- Radius: 8px
- Font: SF Pro Text, 17px, weight 400
- Use: Secondary CTA, dark variant

**Pill Link (Learn More / Shop)**
- Background: transparent
- Text: `#0066cc` (light bg) or `#2997ff` (dark bg)
- Radius: 980px (full pill)
- Border: 1px solid `#0066cc`
- Font: SF Pro Text, 14px-17px
- Hover: underline decoration
- Use: "Learn more" and "Shop" links — the signature Apple inline CTA

**Filter / Search Button**
- Background: `#fafafc`
- Text: `rgba(0, 0, 0, 0.8)`
- Padding: 0px 14px
- Radius: 11px
- Border: 3px solid `rgba(0, 0, 0, 0.04)`
- Focus: `2px solid var(--sk-focus-color, #0071E3)` outline
- Use: Search bars, filter controls

**Media Control**
- Background: `rgba(210, 210, 215, 0.64)`
- Text: `rgba(0, 0, 0, 0.48)`
- Radius: 50% (circular)
- Active: scale(0.9), background shifts
- Focus: `2px solid var(--sk-focus-color, #0071e3)` outline, white bg, black text
- Use: Play/pause, carousel arrows

### Cards & Containers
- Background: `#f5f5f7` (light) or `#272729`-`#2a2a2d` (dark)
- Border: none (borders are rare in Apple's system)
- Radius: 5px-8px
- Shadow: `rgba(0, 0, 0, 0.22) 3px 5px 30px 0px` for elevated product cards
- Content: centered, generous padding
- Hover: no standard hover state — cards are static, links within them are interactive

### Navigation
- Background: `rgba(0, 0, 0, 0.8)` (translucent dark) with `backdrop-filter: saturate(180%) blur(20px)`
- Height: 48px (compact)
- Text: `#ffffff` at 12px, weight 400
- Active: underline on hover
- Logo: Apple logomark (SVG) centered or left-aligned, 17x48px viewport
- Mobile: collapses to hamburger with full-screen overlay menu
- The nav floats above content, maintaining its dark translucent glass regardless of section background

### Image Treatment
- Products on solid-color fields (black or white) — no backgrounds, no context, just the object
- Full-bleed section images that span the entire viewport width
- Product photography at extremely high resolution with subtle shadows
- Lifestyle images confined to rounded-corner containers (12px+ radius)

### Distinctive Components

**Product Hero Module**
- Full-viewport-width section with solid background (black or `#f5f5f7`)
- Product name as the primary headline (SF Pro Display, 56px, weight 600)
- One-line descriptor below in lighter weight
- Two pill CTAs side by side: "Learn more" (outline) and "Buy" / "Shop" (filled)

**Product Grid Tile**
- Square or near-square card on contrasting background
- Product image dominating 60-70% of the tile
- Product name + one-line description below
- "Learn more" and "Shop" link pair at bottom

**Feature Comparison Strip**
- Horizontal scroll of product variants
- Each variant as a vertical card with image, name, and key specs
- Minimal chrome — the products speak for themselves

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 2px, 4px, 5px, 6px, 7px, 8px, 9px, 10px, 11px, 14px, 15px, 17px, 20px, 24px
- Notable characteristic: the scale is dense at small sizes (2-11px) with granular 1px increments, then jumps in larger steps. This allows precise micro-adjustments for typography and icon alignment.

### Grid & Container
- Max content width: approximately 980px (the recurring "980px radius" in pill buttons echoes this width)
- Hero: full-viewport-width sections with centered content block
- Product grids: 2-3 column layouts within centered container
- Single-column for hero moments — one product, one message, full attention
- No visible grid lines or gutters — spacing creates implied structure

### Whitespace Philosophy
- **Cinematic breathing room**: Each product section occupies a full viewport height (or close to it). The whitespace between products is not empty — it is the pause between scenes in a film.
- **Vertical rhythm through color blocks**: Rather than using spacing alone to separate sections, Apple uses alternating background colors (black, `#f5f5f7`, white). Each color change signals a new "scene."
- **Compression within, expansion between**: Text blocks are tightly set (negative letter-spacing, tight line-heights) while the space surrounding them is vast. This creates a tension between density and openness.

### Border Radius Scale
- Micro (5px): Small containers, link tags
- Standard (8px): Buttons, product cards, image containers
- Comfortable (11px): Search inputs, filter buttons
- Large (12px): Feature panels, lifestyle image containers
- Full Pill (980px): CTA links ("Learn more", "Shop"), navigation pills
- Circle (50%): Media controls (play/pause, arrows)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, solid background | Standard content sections, text blocks |
| Navigation Glass | `backdrop-filter: saturate(180%) blur(20px)` on `rgba(0,0,0,0.8)` | Sticky navigation bar — the glass effect |
| Subtle Lift (Level 1) | `rgba(0, 0, 0, 0.22) 3px 5px 30px 0px` | Product cards, floating elements |
| Media Control | `rgba(210, 210, 215, 0.64)` background with scale transforms | Play/pause buttons, carousel controls |
| Focus (Accessibility) | `2px solid #0071e3` outline | Keyboard focus on all interactive elements |

**Shadow Philosophy**: Apple uses shadow extremely sparingly. The primary shadow (`3px 5px 30px` with 0.22 opacity) is soft, wide, and offset — mimicking a diffused studio light casting a natural shadow beneath a physical object. This reinforces the "product as physical sculpture" metaphor. Most elements have NO shadow at all; elevation comes from background color contrast (dark card on darker background, or light card on slightly different gray).

### Decorative Depth
- Navigation glass: the translucent, blurred navigation bar is the most recognizable depth element, creating a sense of floating UI above scrolling content
- Section color transitions: depth is implied by the alternation between black and light gray sections rather than by shadows
- Product photography shadows: the products themselves cast shadows in their photography, so the UI doesn't need to add synthetic ones

## 7. Do's and Don'ts

### Do
- Use SF Pro Display at 20px+ and SF Pro Text below 20px — respect the optical sizing boundary
- Apply negative letter-spacing at all text sizes (not just headlines) — Apple tracks tight universally
- Use Apple Blue (`#0071e3`) ONLY for interactive elements — it must be the singular accent
- Alternate between black and light gray (`#f5f5f7`) section backgrounds for cinematic rhythm
- Use 980px pill radius for CTA links — the signature Apple link shape
- Keep product imagery on solid-color fields with no competing visual elements
- Use the translucent dark glass (`rgba(0,0,0,0.8)` + blur) for sticky navigation
- Compress headline line-heights to 1.07-1.14 — Apple headlines are famously tight

### Don't
- Don't introduce additional accent colors — the entire chromatic budget is spent on blue
- Don't use heavy shadows or multiple shadow layers — Apple's shadow system is one soft diffused shadow or nothing
- Don't use borders on cards or containers — Apple almost never uses visible borders (except on specific buttons)
- Don't apply wide letter-spacing to SF Pro — it is designed to run tight at every size
- Don't use weight 800 or 900 — the maximum is 700 (bold), and even that is rare
- Don't add textures, patterns, or gradients to backgrounds — solid colors only
- Don't make the navigation opaque — the glass blur effect is essential to the Apple UI identity
- Don't center-align body text — Apple body copy is left-aligned; only headlines center
- Don't use rounded corners larger than 12px on rectangular elements (980px is for pills only)

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Small Mobile | <360px | Minimum supported, single column |
| Mobile | 360-480px | Standard mobile layout |
| Mobile Large | 480-640px | Wider single column, larger images |
| Tablet Small | 640-834px | 2-column product grids begin |
| Tablet | 834-1024px | Full tablet layout, expanded nav |
| Desktop Small | 1024-1070px | Standard desktop layout begins |
| Desktop | 1070-1440px | Full layout, max content width |
| Large Desktop | >1440px | Centered with generous margins |

### Touch Targets
- Primary CTAs: 8px 15px padding creating ~44px touch height
- Navigation links: 48px height with adequate spacing
- Media controls: 50% radius circular buttons, minimum 44x44px
- "Learn more" pills: generous padding for comfortable tapping

### Collapsing Strategy
- Hero headlines: 56px Display → 40px → 28px on mobile, maintaining tight line-height proportionally
- Product grids: 3-column → 2-column → single column stacked
- Navigation: full horizontal nav → compact mobile menu (hamburger)
- Product hero modules: full-bleed maintained at all sizes, text scales down
- Section backgrounds: maintain full-width color blocks at all breakpoints — the cinematic rhythm never breaks
- Image sizing: products scale proportionally, never crop — the product silhouette is sacred

### Image Behavior
- Product photography maintains aspect ratio at all breakpoints
- Hero product images scale down but stay centered
- Full-bleed section backgrounds persist at every size
- Lifestyle images may crop on mobile but maintain their rounded corners
- Lazy loading for below-fold product images

## 9. Target Personas

Every component, heading, and CTA should be tested against: "which persona does this serve, and does it speak their language?"

### P1 — Klaus Richter ("The Buyer")

**Photo:** `public/personas/klaus-richter.png`
**Nano Banana prompt:** Professional man, early 50s, silver-grey hair, dark suit, no tie, modern office with panoramic city view through floor-to-ceiling windows, natural directional light from left, shallow depth of field, editorial portrait photography, photorealistic, no text

- **Age:** 52
- **Location:** Hamburg, Germany
- **Role:** Private family office managing ~€15M in European commercial real estate
- **Why Poland:** Seeking yield diversification beyond saturated Western European markets
- **Language:** English primary, basic German on site would be a bonus
- **Behaviour:** Scans homepage in under 10 seconds. Uses simple search (city + type + price). Will request a call or deck if trust is formed quickly through design quality, clarity, and investment language.
- **Key needs:** "Why Poland" in 3-6 data-backed bullets. Clear investment highlights per listing (ROI, yield, tenant, lease term, zoning). Easy off-market request path.
- **Decision speed:** Fast — if the numbers and positioning are right, he's on a call within 48 hours.
- **Primary journey:** Hero → Featured Listings → Listing Detail → Off-Market / Contact
- **Test question:** *"Would Klaus trust this page enough to pick up the phone?"*

### P2 — Anna Wojciechowska ("The Supplier")

**Photo:** `public/personas/anna-wojciechowska.png`
**Nano Banana prompt:** Professional woman, late 30s, dark navy blazer, white blouse, confident posture, standing in a modern Warsaw business district setting with glass buildings in background, warm natural light, shallow depth of field, editorial portrait photography, photorealistic, no text

- **Age:** 38
- **Location:** Warsaw, Poland
- **Role:** Senior broker at a mid-size Polish commercial real estate agency
- **Why Rozanowska:** Has quality investment stock but no digital channel to reach foreign capital. Wants selective, premium brand association — not another OLX-style marketplace.
- **Language:** Polish primary, professional English
- **Behaviour:** Finds the site via network, LinkedIn, or direct outreach. Looks for "For agents" or "List your property." Accepts application/verification if the brand looks truly premium.
- **Key needs:** Clear explanation of who qualifies to list. Simple application form (portfolio type, cities, ticket sizes, proof of mandate). Confidence that this is curated, not crowded.
- **Decision speed:** Medium — will review the site, check Magda's LinkedIn, then apply if positioning is right.
- **Primary journey:** Homepage → For Agents section → Application form / Contact
- **Test question:** *"Would Anna feel proud to have her listings presented here?"*

### P3 — James Chen ("The Researcher")

**Photo:** `public/personas/james-chen.png`
**Nano Banana prompt:** Professional man, mid 40s, East Asian appearance, smart casual outfit with navy quarter-zip sweater, reading on a tablet, seated in a modern co-working space with warm ambient lighting, plants in background, candid editorial photography style, photorealistic, no text

- **Age:** 44
- **Location:** London, UK
- **Role:** Tech founder and angel investor considering European real estate as portfolio diversification
- **Why Poland:** Heard it's undervalued. Wants to understand the market before committing capital. Will act in 6-12 months.
- **Language:** English only
- **Behaviour:** Browses "Explore Poland" by city and category to build a mental model. Reads "Why Poland" and 1-2 detailed listings end-to-end. May not enquire immediately but will share the site with a partner or advisor.
- **Key needs:** City-level overviews that read like concise investment briefs. Clear segmentation of asset classes with examples. Low-friction way to stay in the loop. Clear off-market explanation.
- **Decision speed:** Slow — 6-12 months. But when he shares the link with his advisor, the site needs to convert that second-hand visitor too.
- **Primary journey:** Explore Poland → Why Poland → City pages → Bookmark / Share / Newsletter
- **Test question:** *"Would James send this link to his financial advisor with confidence?"*

### How personas shape every page

| Section | P1 Klaus | P2 Anna | P3 James |
|---------|----------|---------|----------|
| Hero | Strong investment headline + simple search | Sees premium positioning, knows this isn't a mass portal | Understands Poland = investment destination |
| Featured Listings | His primary browse — investment data on every card | Sees how her stock would be presented | Benchmarks example deals |
| Explore Poland | Secondary — goes direct to listings | Not her journey | Primary entry ramp — market intelligence |
| Why Poland | Confirmation of what he already suspects | Validates the foreign-investor pitch | Core learning content |
| For Agents | Not his journey | Her entry point — selective, application-based | Not his journey |
| Off-Market | High intent — requests access | May submit off-market stock | Parks the relationship for later |
| Contact | Calls or submits inquiry | Applies to list | Low priority now, high priority in 6 months |

---

## 10. Tone of Voice

Polish default. Confident, understated, investment-focused. Short sentences. No exclamation marks. No "dream home" language — this is capital allocation, not lifestyle browsing.

**Do:**
- Use investment language: yield, cap rate, opportunity, portfolio, asset class
- Be precise and data-led: "7.2% net yield" not "great returns"
- Sound like a trusted advisor briefing a serious investor
- Keep sentences short and declarative
- Let the quality of the opportunity speak — no hard sell

**Don't:**
- Use residential consumer language: dream home, cosy, charming, stunning
- Use exclamation marks or promotional superlatives
- Write long paragraphs of filler copy
- Sound like a mass-market property portal or classified ad
- Use generic real estate marketing clichés

**Examples:**
- Good: "Biurowiec klasy A w Mokotowie. 2 400 m², pełne obłożenie, stopa zwrotu 7,2% netto."
- Bad: "Wspaniała okazja inwestycyjna! Fantastyczny budynek biurowy w świetnej lokalizacji!"
- Good: "Class A office, Mokotów. 2,400 m², fully tenanted, 7.2% net yield."
- Bad: "Amazing investment opportunity! Stunning office building in a great location!"

---

## 11. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: Apple Blue (`#0071e3`)
- Page background (light): `#f5f5f7`
- Page background (dark): `#000000`
- Heading text (light): `#1d1d1f`
- Heading text (dark): `#ffffff`
- Body text: `rgba(0, 0, 0, 0.8)` on light, `#ffffff` on dark
- Link (light bg): `#0066cc`
- Link (dark bg): `#2997ff`
- Focus ring: `#0071e3`
- Card shadow: `rgba(0, 0, 0, 0.22) 3px 5px 30px 0px`

### Example Component Prompts
- "Create a hero section on black background. Headline at 56px SF Pro Display weight 600, line-height 1.07, letter-spacing -0.28px, color white. One-line subtitle at 21px SF Pro Display weight 400, line-height 1.19, color white. Two pill CTAs: 'Learn more' (transparent bg, white text, 1px solid white border, 980px radius) and 'Buy' (Apple Blue #0071e3 bg, white text, 8px radius, 8px 15px padding)."
- "Design a product card: #f5f5f7 background, 8px border-radius, no border, no shadow. Product image top 60% of card on solid background. Title at 28px SF Pro Display weight 400, letter-spacing 0.196px, line-height 1.14. Description at 14px SF Pro Text weight 400, color rgba(0,0,0,0.8). 'Learn more' and 'Shop' links in #0066cc at 14px."
- "Build the Apple navigation: sticky, 48px height, background rgba(0,0,0,0.8) with backdrop-filter: saturate(180%) blur(20px). Links at 12px SF Pro Text weight 400, white text. Apple logo left, links centered, search and bag icons right."
- "Create an alternating section layout: first section black bg with white text and centered product image, second section #f5f5f7 bg with #1d1d1f text. Each section near full-viewport height with 56px headline and two pill CTAs below."
- "Design a 'Learn more' link: text #0066cc on light bg or #2997ff on dark bg, 14px SF Pro Text, underline on hover. After the text, include a right-arrow chevron character (>). Wrap in a container with 980px border-radius for pill shape when used as a standalone CTA."

### Iteration Guide
1. Every interactive element gets Apple Blue (`#0071e3`) — no other accent colors
2. Section backgrounds alternate: black for immersive moments, `#f5f5f7` for informational moments
3. Typography optical sizing: SF Pro Display at 20px+, SF Pro Text below — never mix
4. Negative letter-spacing at all sizes: -0.28px at 56px, -0.374px at 17px, -0.224px at 14px, -0.12px at 12px
5. The navigation glass effect (translucent dark + blur) is non-negotiable — it defines the Apple web experience
6. Products always appear on solid color fields — never on gradients, textures, or lifestyle backgrounds in hero modules
7. Shadow is rare and always soft: `3px 5px 30px 0.22 opacity` or nothing at all
8. Pill CTAs use 980px radius — this creates the signature Apple rounded-rectangle-that-looks-like-a-capsule shape
