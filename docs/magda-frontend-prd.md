# Product Requirements Document — Magda Real Estate Website Frontend

## Document purpose

This PRD defines the frontend product requirements for an ultra-modern website for Magda, a Warsaw-based solo entrepreneur focused on commercial real estate opportunities across Poland, with the goal of giving Google Stitch enough clarity to design the interface, page structure, component system, and key user flows.[cite:1][cite:2]

The site should present Poland as an investment market rather than a generic property listing portal, while keeping the experience selective, premium, simple, and clearly oriented toward serious investors and opportunity owners.[cite:2]

## Product overview

The product is a premium real estate website positioned around curated investment opportunities in Poland, especially for users who want commercial, land, and premium residential opportunities with strong business framing rather than consumer-home-shopping behavior.[cite:2]

The website must feel ultra modern, uncluttered, highly intentional, and premium, using restrained visual design, strong hierarchy, and careful spacing rather than marketplace density or template-like blocks.[cite:1][cite:2]

## Product goals

- Communicate Magda’s credibility and positioning as a trusted commercial real estate advisor based in Warsaw and operating across Poland.[cite:2]
- Attract two core audiences: investors seeking curated opportunities and property owners or agents seeking a selective route to present investment-grade listings.[cite:2]
- Create a premium lead-generation engine rather than an open listing marketplace.[cite:2]
- Support future AI-assisted experiences in research, matching, qualification, and guided discovery.[cite:2]
- Provide a frontend structure that can scale from brochure-quality pages to a high-trust property exploration experience.[cite:1][cite:2]

## Success metrics

The frontend should be designed to improve qualified inquiry generation, increase engagement with curated listings, and create trust signals that encourage direct contact and off-market requests.[cite:2]

Primary KPIs:
- Contact form submission rate from listing pages and key landing sections.
- Off-market opportunity request rate.
- Qualified owner/agent submission rate.
- Click-through rate from market exploration sections to listings.
- Time on site for investor-oriented pages such as homepage, market pages, and listing detail pages.

## Target users

### Investor audience

Primary users are serious investors, including foreign investors, deal seekers, and buyers looking at Poland through an investment lens rather than a residential browsing lens.[cite:2]

Their needs include quick trust formation, curated supply, investment-specific data points, market context, and a friction-light path to request more information or discuss opportunities directly.[cite:2]

### Supply-side audience

A secondary audience includes property owners, brokers, and agents who may want to submit investment properties, but only through an application and verification flow rather than instant self-serve publishing.[cite:2]

Their needs include clarity on submission criteria, confidence in Magda’s selective positioning, and a simple process for initiating contact.[cite:2]

## Positioning

The website should not feel like a mass marketplace, classified portal, or “all properties for everyone” experience.[cite:2]

It should instead feel like a curated investment platform and advisory presence, where Poland is framed as a strategic investment destination and Magda acts as the gateway to vetted opportunities.[cite:2]

## Core product principles

- Curated over crowded.[cite:2]
- Investment language over lifestyle language.[cite:2]
- Premium restraint over portal clutter.[cite:1][cite:2]
- High trust over high volume.[cite:2]
- Guided exploration over filter overload.[cite:2]
- Strong visual clarity over decorative complexity.[cite:1]

## Scope

### In scope for the frontend

- Marketing homepage.
- Market exploration pages by city and category.
- Property listing archive pages.
- Property detail pages.
- Off-market opportunity landing and inquiry flow.
- Owner/agent submission landing page with application framing.
- Contact and consultation entry points.
- Bilingual-ready UI structure for Polish and English.[cite:2]
- AI-assisted frontend features described in this document.

### Out of scope for this PRD

- CRM implementation details.
- Backend CMS schema beyond necessary frontend content assumptions.
- Legal documentation drafting.
- Payment flows.
- Full admin panel design.

## Information architecture

The website should support a simple, premium structure with clear routes for investors, market exploration, listings, and direct contact.[cite:2]

Recommended top-level navigation:
- Home
- Opportunities
- Explore Poland
- Property Types
- Off-Market
- For Owners / Agents
- About Magda
- Contact

Recommended footer groups:
- Investment regions in Poland
- Property categories
- Investor resources
- Contact and consultation
- Language switcher
- Legal pages

## Key pages

### Homepage

The homepage should open with a large, premium hero featuring Poland investment positioning, likely anchored by Warsaw skyline or broader Poland market imagery, followed by a simple search entry that includes city, property type, and price range without excessive filtering.[cite:2]

Below the hero, the page should present Poland as a structured investment market through city exploration, investment categories, featured opportunities, “Why Poland” rationale, a selective submission path for agents or owners, and a final CTA focused on off-market opportunities.[cite:2]

Required homepage sections:
- Hero with headline, subheadline, and lightweight search.
- Explore Poland by city: Warsaw, Kraków, Wrocław, Tricity, Poznań.[cite:2]
- Four investment category tiles: Commercial, Investment, Land, Premium Residential.[cite:2]
- Featured listings with 6–8 curated cards.[cite:2]
- Why Poland section with market rationale and future room for charts/data.[cite:2]
- For agents / owners entry point with selective submission framing.[cite:2]
- Final CTA: Request Off-Market Opportunities.[cite:2]

### Opportunities archive

This page should present curated listing cards with strong visual hierarchy, concise investment data, and enough whitespace to avoid the feel of a crowded marketplace.[cite:2]

Filtering should remain deliberate and limited, prioritizing quality of decision-making over exhaustive faceted search.[cite:2]

Recommended filters:
- City
- Property type
- Investment status
- Price band
- Yield / ROI availability

### Property detail page

The listing detail page is a core trust and conversion page, and it must foreground investment highlights rather than generic property descriptions.[cite:2]

Required sections include a hero area with photo, price, and location; an investment highlights block with fields such as ROI, tenant, lease term, and zoning; a business-oriented description; map; documents/data area; and direct inquiry/contact UI.[cite:2]

Required modules:
- Gallery / hero media.
- Price and location summary.
- Investment highlights.
- Narrative description in investment language.
- Location map.
- Documents / downloadable data room teaser.
- Lead form or request information CTA.
- Optional off-market or advisor consultation cross-sell.

### Explore Poland

This section should function more like a market discovery interface than a standard list page, helping investors navigate Poland through high-level geography and opportunity framing.[cite:2]

Each city entry should act as a destination page or collection page with summary copy, market signals, and curated opportunities.[cite:2]

### For Owners / Agents

This page should clearly communicate that the platform is selective and not open for unrestricted publishing, reinforcing Magda’s premium positioning.[cite:2]

The core CTA should be an application or submission request rather than “add listing now.”[cite:2]

### Off-market page

This page should frame off-market access as a premium, relationship-based offer where fuller data is shared after qualification or direct contact.[cite:2]

The tone should emphasize discretion, curation, and access rather than scarcity gimmicks.[cite:2]

## AI-enabled features

The website should make visible use of AI, but in a controlled and premium way, adding usefulness rather than novelty. This direction aligns with the project brief that the site should make very good use of AI in both its build and selected user-facing functionality.[cite:2]

Recommended AI features:
- AI property matcher: a guided conversational assistant that helps investors narrow relevant opportunities by intent, budget band, region, and asset type.
- AI brief summarizer: a short “investment summary” layer on listing pages that translates raw listing information into concise investor language.
- AI market guide: an interactive guide that helps users explore Polish cities and categories through strategic prompts.
- AI lead qualification assistant: a conversational pre-form that collects investor intent before routing into a contact form.
- AI off-market request assistant: a guided intake flow for users requesting discreet opportunities.
- AI multilingual support: English-first and Polish-ready copy handling for international and local visitors.

Important constraint: AI UI should feel discreet, expert, and embedded into the product, not gimmicky, chat-heavy, or visually noisy.[cite:1]

## Functional requirements

### Search and discovery

- User can browse by city.
- User can browse by property category.
- User can use a simple hero search with city, property type, and price range.[cite:2]
- User can open curated listing archives.
- User can move from market pages to relevant opportunities.

### Listing experience

- Listing cards must show a strong image, title, location, category, and 2–4 investment data points.
- Listing detail pages must foreground investment metrics and structured opportunity data.[cite:2]
- Documents/data availability should be indicated even when full access requires contact.[cite:2]

### Lead generation

- Users can request information from any key page.
- Users can request off-market opportunities from dedicated CTA zones.[cite:2]
- Owners or agents can begin a selective submission/application flow.[cite:2]
- Contact forms should support segmentation of inquiry intent: investor, owner, broker, general inquiry.

### Language handling

The UI should support bilingual operation, with clear provision for Polish and English versions and routing conventions already anticipated in the source notes.[cite:2]

Recommended structure:
- `/pl/`
- `/en/`

## Experience requirements

### Brand and tone

The interface should feel premium, calm, modern, investment-focused, and international.[cite:1][cite:2]

Copy should sound precise, selective, and commercially credible, avoiding mass-market real estate clichés and avoiding overloaded promotional language.[cite:2]

### Visual direction

The visual system should be highly restrained and editorial, using whitespace, strong photography, large typography, and careful pacing rather than crowded portals or decorative SaaS tropes.[cite:1][cite:2]

Recommended art direction:
- Premium minimalism.
- Large-format property and city imagery.
- Strong black / near-white / neutral rhythm with one controlled accent color for interactive elements.[cite:1]
- High typographic discipline and low chrome UI.[cite:1]
- No noisy gradients, template-style feature grids, or cluttered marketplace cards.[cite:1]

### Design cues for Stitch

Google Stitch should interpret the frontend as a luxury-investment, editorial-property interface rather than a generic proptech dashboard.[cite:1][cite:2]

Specific design cues:
- Full-width hero sections with cinematic pacing.[cite:1]
- Premium card layouts with generous spacing.[cite:1][cite:2]
- Minimal visible filters and reduced interface chrome.[cite:2]
- Strong emphasis on image-led sections and concise investment data.[cite:2]
- Interactive accent color reserved mainly for CTAs, links, and focus states.[cite:1]
- Avoid visual patterns associated with generic AI-generated websites, including repetitive 3-column feature blocks, decorative blobs, and over-centered layouts.[cite:1]

## Component requirements

Core components required for design:
- Header with language toggle and primary CTA.
- Hero section with investor proposition and compact search.
- City exploration tiles/cards.
- Property category tiles.
- Listing cards in premium grid layout.
- Investment highlight stat chips or rows.
- Inquiry forms and conversational intake widgets.
- Testimonial / credibility strip if later needed.
- Data insight cards for “Why Poland.”
- Off-market CTA panel.
- Owner/agent submission CTA section.
- Footer with market navigation and trust links.

## Content requirements

The frontend should be designed around concise, high-quality content modules rather than long walls of generic copy.[cite:2]

Content blocks needed:
- Homepage positioning statement.
- City intros.
- Category intros.
- Why Poland proof points.
- Listing summaries.
- Off-market value proposition.
- Selective submission explanation.
- Magda bio / credibility summary.

## Trust signals

Because the audience includes foreign investors and high-value commercial prospects, the design must embed trust through content and layout rather than relying only on verbal claims.[cite:2]

Recommended trust elements:
- Warsaw / Poland market expertise framing.
- Curated and selective admission language.[cite:2]
- Clear investment data fields on listings.[cite:2]
- Strong contact availability.
- Document/data readiness indicators.
- Bilingual professionalism.
- Optional future inclusion of market snapshots and evidence-based charts.[cite:2]

## User flows

### Investor discovery flow

1. User lands on homepage.
2. User understands Magda’s positioning around Poland investment real estate.[cite:2]
3. User explores by city, category, or featured opportunity.[cite:2]
4. User opens listing detail page.
5. User reviews investment highlights and summary.[cite:2]
6. User requests more information or off-market opportunities.[cite:2]

### Off-market flow

1. User sees premium CTA for off-market access.
2. User opens off-market landing page.
3. User completes guided qualification or form.
4. User submits request for direct follow-up.

### Owner / agent flow

1. User visits submission page.
2. User learns the platform is curated and approval-based.[cite:2]
3. User completes submission interest form.
4. User awaits manual review / follow-up.

## Non-functional requirements

- Mobile-first responsive design.
- Premium performance and fast perceived load.
- Accessible contrast, keyboard states, and semantic structure.
- Flexible enough for future CMS integration.
- Modular sections that Stitch can turn into a reusable design system.
- High image quality without visual clutter.

## SEO and discoverability requirements

The page architecture should support geographic and category-based discoverability, especially around Poland investment real estate, commercial property, land, and premium opportunities.[cite:2]

Recommended SEO content surfaces:
- City pages.
- Category pages.
- Structured listing pages.
- About / expertise page.
- Market insight blocks for “Why Poland.”[cite:2]

## Future-ready considerations

The frontend should leave room for later expansion into:
- Market reports and insights.
- Interactive data visualizations in the “Why Poland” section.[cite:2]
- Saved opportunity collections.
- Investor onboarding journeys.
- Richer AI advisory tools.
- Off-market gated content experiences.

## Constraints and anti-requirements

The site must not feel like an open marketplace, discount portal, or generic WordPress property template.[cite:2]

The frontend must avoid clutter, excessive filters, small dense cards, repetitive feature-grid clichés, decorative gradients, and anything that weakens the premium investment positioning.[cite:1][cite:2]

## Suggested prompt block for Google Stitch

Design a premium, ultra-modern, uncluttered bilingual real estate website frontend for Magda, a Warsaw-based commercial real estate advisor serving opportunities across Poland. The site is not a mass listing portal; it is a curated investment platform focused on commercial, land, and premium residential opportunities. The homepage should position Poland as an investment market, with a cinematic hero, simple search, Explore Poland by city, four investment categories, featured listings, a Why Poland section, a selective For Owners/Agents section, and a strong Off-Market CTA. Listing pages should emphasize investment highlights such as ROI, tenant, lease term, zoning, and documents. The design should feel editorial, premium, and international, using large imagery, strong typography, lots of whitespace, minimal filters, and restrained color. Avoid generic marketplace UI, avoid clutter, and avoid templated AI-SaaS aesthetics. Include discreet AI-assisted features such as a property matcher, investor qualification assistant, and market guide.[cite:1][cite:2]

## Open decisions

The following items should be confirmed before final visual production:
- Final brand name.
- Whether the primary CTA is “Request Opportunities,” “Book Consultation,” or “Discuss an Opportunity.”[cite:2]
- Whether the first release includes live listings or high-fidelity concept listings.
- Exact scope of user-facing AI in v1.
- Whether bilingual launch is immediate or phased.
- Whether charts/data in “Why Poland” ship in v1 or later.[cite:2]
