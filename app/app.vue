<template>
  <div class="page">
    <header class="hero">
      <p class="eyebrow">Portfolio</p>
      <h1>Peter Deacon</h1>
      <p class="intro">
        Web developer building clean, creative projects with Flask, HTMX,
        Nuxt, Vue and a love of polished UI.
      </p>

      <div class="actions">
        <a href="#projects" class="btn primary">View Projects</a>
        <a href="#about" class="btn">About Me</a>
      </div>
    </header>

    <main>
      <section id="projects" class="section">
        <h2>Projects</h2>
        <div class="project-grid">
          <article class="card">
            <h3>ChromaForge</h3>
            <p>
              A PBR texture pipeline tool with AI integration, designed to make material creation faster, smoother and more user-friendly.
            </p>
          </article>

          <article class="card">
            <h3>JotSpot</h3>
            <p>
              A fast note-sharing web app focused on simple publishing and clean writing.
            </p>
          </article>

          <article class="card">
            <h3>rageypeep.gg</h3>
            <p>
              A custom gaming site for reviews, playthrough logs and personal game pages.
            </p>
          </article>

          <article class="card">
            <h3>Ultima Props</h3>
            <p>
              An online shop project built around product presentation and custom tooling.
            </p>
          </article>
        </div>
      </section>

      <section id="about" class="section">
        <h2>About Me</h2>
        <p>
          I enjoy building web projects with personality, experimenting with UI,
          and creating things that feel fun to use.
        </p>
      </section>
    </main>
  </div>
</template>
<style scoped>
:global(body) {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #0f172a;
  color: #e5e7eb;
}

:global(html) {
  scroll-behavior: smooth;
}

.page {
  min-height: 100vh;
}

.hero {
  max-width: 960px;
  margin: 0 auto;
  padding: 6rem 1.5rem 4rem;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.85rem;
  color: #94a3b8;
}

h1 {
  font-size: clamp(2.5rem, 7vw, 5rem);
  line-height: 1;
  margin: 0.5rem 0 1rem;
}

.intro {
  max-width: 700px;
  font-size: 1.15rem;
  line-height: 1.7;
  color: #cbd5e1;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.9rem 1.3rem;
  border-radius: 999px;
  text-decoration: none;
  color: white;
  border: 1px solid #334155;
  background: transparent;
  transition: 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  border-color: #64748b;
}

.btn.primary {
  background: #38bdf8;
  color: #0f172a;
  border-color: #38bdf8;
}

.section {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 1.25rem;
}

.card h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.card p {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.6;
}
</style>