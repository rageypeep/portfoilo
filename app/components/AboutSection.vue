<template>
    <section id="about" class="section about-section">
        <div class="section-heading about-heading">
            <p class="section-kicker">Developer profile</p>
            <h2>Practical systems, from interface to infrastructure.</h2>
            <p>
                Web apps, creative tools, engine experiments, deployment, and the hardware they run on.
            </p>
        </div>

        <div class="about-container">
            <div class="about-panel about-story">
                <p class="about-lead">
                    I build real, usable systems with a hands-on approach: clean interfaces, practical backend logic, and deployment that I can run and maintain.
                </p>

                <div class="about-content">
                    <p>My work spans Flask and HTMX applications, Nuxt presentation sites, C++ rendering experiments, and the self-hosted Docker/Caddy stack behind them.</p>

                    <p>Projects like ChromaForge and JotSpot focus on making useful tools feel fast and direct. The engine work pushes in the other direction: rendering, procedural worlds, chunk streaming, and performance where the details matter.</p>

                    <p>I also manage the server side myself, which keeps the work grounded. Deployment, reverse proxies, HTTPS, containers, logs, and updates are part of the same system, not an afterthought.</p>

                    <p>That practical approach carries over into hardware. I build and maintain my own machines, handle upgrades, and troubleshoot performance issues when software and hardware meet in messy ways.</p>

                    <p>Outside development, English pool keeps the same part of my brain busy: planning ahead, balancing risk, and refining technique over time.</p>
                </div>

            </div>

            <div class="about-side">
                <figure class="about-panel about-portrait">
                    <div class="about-portrait-frame">
                        <img
                            src="/images/me/peter-3.jpg"
                            alt="Peter Deacon"
                            loading="lazy"
                            decoding="async"
                        >
                    </div>
                    <figcaption>
                        <span>Peter Deacon</span>
                        <strong>Full-stack developer / systems builder</strong>
                    </figcaption>
                </figure>
            </div>

            <div class="about-host-map" aria-label="Self-hosted service map">
                <div class="about-host-map-header">
                    <span>Mini PC Server</span>
                    <strong>Self-hosted stack</strong>
                </div>

                <div class="host-map-flow">
                    <div class="host-map-node host-map-node--host">
                        <span>Host</span>
                        <strong>Mini PC</strong>
                    </div>
                    <div class="host-map-node">
                        <span>Runtime</span>
                        <strong>Docker / Compose</strong>
                    </div>
                    <div class="host-map-node">
                        <span>Proxy</span>
                        <strong>Caddy</strong>
                    </div>
                </div>

                <div class="host-map-services">
                    <a href="/" aria-label="Portfolio home">
                        <span>Portfolio</span>
                        <strong>Nuxt</strong>
                    </a>
                    <a href="/projects/chromaforge">
                        <span>ChromaForge</span>
                        <strong>Flask / HTMX</strong>
                    </a>
                    <a href="/projects/jotspot">
                        <span>JotSpot</span>
                        <strong>Flask / PostgreSQL</strong>
                    </a>
                    <a href="/projects/rageypeep">
                        <span>rageypeep.gg</span>
                        <strong>Steam API</strong>
                    </a>
                    <a href="/projects/ultimaprops">
                        <span>Ultima Props</span>
                        <strong>Shop system</strong>
                    </a>
                    <div>
                        <span>Umaarchive</span>
                        <strong>Live app</strong>
                    </div>
                </div>

                <div class="host-map-support" aria-label="Supporting containers">
                    <span>PostgreSQL</span>
                    <span>Redis</span>
                    <span>Portainer</span>
                    <span>Dockge</span>
                    <span>DuckDNS</span>
                </div>
            </div>

            <div class="about-tech" aria-label="Technologies and experience">
                <span>Python</span>
                <span>Flask</span>
                <span>Vue / Nuxt</span>
                <span>C++</span>
                <span>HTMX</span>
                <span>Rust</span>
                <span>Docker</span>
                <span>Caddy</span>
                <span>React</span>
                <span>HTML</span>
                <span>Classic ASP</span>
                <span>EPOS Integration</span>
                <span>Windows Server 2003</span>
                <span>IIS</span>
            </div>
        </div>
    </section>
</template>
