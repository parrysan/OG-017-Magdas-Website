# OG-017-Magdas-Website

> Magda is a solo entrepreneur in real estate based in Warsaw, Poland. She is building her brand in the Warsaw market, and the website will be a key promotional pillar.

## Where to start

- **For working on this project**: read `CLAUDE.md` in this folder. It is the bootstrap manifest — it tells any LLM (or human) which files to read and in what order.
- **For project status, decisions, and history**: see the vault project page at `Open-Memory-Vault/projects/OG-017-Magdas-Website/README.md`.

## Quick facts

- **Project code**: OG-017-Magdas-Website
- **Created**: 2026-04-11
- **GitHub**: https://github.com/parrysan/OG-017-Magdas-Website

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Structure

```
.
├── CLAUDE.md              # bootstrap manifest — read this first
├── DESIGN.md              # Apple-inspired design reference
├── README.md              # this file
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/ds/     # OS-000 design system components
│   └── styles/tokens/     # design tokens (base, themes)
├── docs/                  # technical docs & design screenshots
└── tests/                 # tests
```

All durable knowledge — decisions, research, status narrative — lives in the vault project page, **not** in `docs/`. The code repo holds code, config, and build artefacts.
