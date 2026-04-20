# pdsystems.dev portfolio

Source for my personal portfolio site: a Nuxt/Vue front end for showcasing practical web apps, creative tools, engine experiments, and the self-hosted infrastructure behind them.

Live site: [pdsystems.dev](https://pdsystems.dev)  
Source: [github.com/rageypeep/portfoilo](https://github.com/rageypeep/portfoilo)

## What This Is

This portfolio is built to show real systems rather than just screenshots. It brings together:

- A Three.js hero scene with interactive project cards, PBR-style materials, nebula backgrounds, moving light motes, and reduced-motion handling.
- Selected project case studies for ChromaForge, JotSpot, rageypeep.gg, Ultima Props, C++ engine work, and archived experiments.
- A self-hosted stack map showing how the live services sit behind Docker, Docker Compose, and Caddy.
- SEO metadata, Open Graph imagery, sitemap support, favicon assets, and responsive layouts.
- Contact routes for email, GitHub, X, and LinkedIn.

## Featured Work

### ChromaForge

A PBR texture pipeline tool that evolved from a Python prototype into a Flask, HTMX, and Three.js workflow for AI-assisted material generation and real-time previewing.

### JotSpot

A PostgreSQL-backed publishing app focused on fast note creation, auto-save, comments, likes, and CLI-friendly workflows.

### rageypeep.gg

A self-hosted gaming platform that uses Steam API data, scheduled sync jobs, admin tooling, and generated game pages.

### Ultima Props

A custom e-commerce platform covering storefront, admin tools, orders, Stripe integration, downloads, and reusable shop logic.

### Engine and Rendering Work

C++ / DirectX 12 rendering experiments, voxel terrain, ARPG prototypes, Three.js rendering tests, and PBR workflow experiments.

## Tech Stack

- Nuxt 4
- Vue 3
- TypeScript
- Three.js
- CSS
- Docker
- Caddy

The site is mostly presentation-focused. Heavier backend behaviour lives in the individual Flask/Python services that the portfolio links to.

## Self-Hosted Deployment

The live setup runs on a Mini PC server:

- Docker and Docker Compose manage the containers.
- Caddy handles reverse proxying and HTTPS.
- Portfolio, ChromaForge, JotSpot, rageypeep.gg, Ultima Props, and supporting services run as separate containers.
- PostgreSQL, Redis, Portainer, Dockge, and DuckDNS support the wider stack.

The portfolio itself is containerised and served from Nuxt preview output.

## Local Development

Install dependencies:

```bash
npm install
```

Start the Nuxt dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Docker

Build the image:

```bash
docker compose portfolio
```

Run it locally:

```bash
docker compose up -d portfolio
```

Check the logs:

```bash
docker compose logs portfolio --tall+100
```

## Project Structure

```text
app/
  components/        Reusable Vue components
  data/              Project data and case study content
  pages/             Nuxt pages
  composables/       Shared Vue composables
  utils/             Hero scene layout helpers
  assets/css/        Main stylesheet
public/
  images/            Project images, icons, and social assets
  textures/          Three.js hero textures
  videos/            Project demo videos
```

## Performance Notes

- Three.js is split into its own chunk.
- The hero scene lazy-loads Three.js on mount.
- Reduced-motion users get a static hero path.
- The hero animation pauses when the section or document is not visible.
- Texture-heavy visuals are kept in `public/textures` so they can be swapped without changing the scene logic.
- Textures made with ChromaForge.

## Why It Exists

This site is intended to be a practical portfolio, not a template. It shows the kind of systems I like building: server-rendered apps, focused tools, self-hosted infrastructure, rendering experiments, and projects that come from real workflow problems.

