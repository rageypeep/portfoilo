# AGENTS.md

## Project Overview

This is a personal portfolio site built using **Nuxt (Vue)** and deployed via a **self-hosted Docker + Caddy stack**.

The purpose of this project is to:
- Showcase real-world development work
- Demonstrate full-stack capability (frontend, backend, infrastructure)
- Provide a central entry point to multiple live and experimental systems

This is not just a static portfolio — it represents an ecosystem of projects and services.

---

## Tech Stack

### Frontend
- Nuxt (Vue 3)
- SSR / server-rendered approach preferred
- Minimal reliance on heavy client-side logic unless justified


### Infrastructure
- Docker (multi-service environment)
- Docker Compose
- Caddy (reverse proxy + automatic HTTPS)
- Self-hosted on a personal server

---

## Deployment Architecture

- Main site: `https://pdsystems.dev`
- Reverse proxy handled by Caddy
- Each project runs as its own container
- All services are connected via a shared Docker network (`web`)


---

## Key Projects (Portfolio Content)

### ChromaForge
- PBR texture generation tool
- Evolved from a Python prototype (Texture Map Generator)
- Focus: performance, real-time workflow, UX

### JotSpot
- Note-sharing platform with live updates
- Server-rendered (Flask + HTMX)
- Evolved from "Simple Pages" prototype

### rageypeep.gg
- Gaming log / review platform
- Steam API integration
- Auto-generated content + manual customization
- Fully self-hosted

### Ultima Props
- Custom e-commerce platform
- Admin backend + product management
- Designed to be reusable across storefronts
- Dave's website 😮‍💨

### C++ / Engine Projects
- Voxel planetary engine (DirectX 12)
- ARPG prototype
- Focus on rendering, systems, and performance

### Experimental / Fun Projects
- React video player with dynamic ambient box-shadow
- Three.js voxel rendering experiments

---

## Development Philosophy

- Prefer **simple, maintainable systems** over unnecessary complexity
- Avoid heavy frontend frameworks unless they provide clear benefit
- Favor **server-side rendering + HTMX-style interactivity**
- Build tools and systems that solve real problems
- Iterate:
  - prototype → identify limitations → rebuild properly

---

## Notes for Agents

- Do NOT assume this is a standard SPA architecture
- Prefer SSR or server-driven approaches when suggesting changes
- Respect the existing Docker + Caddy deployment model
- Avoid suggesting FastAPI (Flask is preferred)
- Keep solutions practical and aligned with self-hosted environments

---

## Known Patterns

- Services are containerised and exposed via Caddy
- Static assets handled via Caddy when appropriate
- Nuxt is used primarily for presentation, not complex frontend state management
- Backend logic is typically handled in Python services

---

## Future Plans

- Expand API layer (`api.pdsystems.dev`)
- Add AI-driven features via Flask services
- Continue evolving existing projects (not replacing them)
- Possibly introduce reusable platform components (e.g. shop system)

---

## Final Note

This project reflects **real-world development experience**, not tutorial-based work.

When making suggestions:
- Prioritize practicality
- Consider deployment implications
- Align with existing stack and philosophy
