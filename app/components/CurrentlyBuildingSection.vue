<template>
    <section id="currently-building" class="section building-section">
        <div class="building-wrap">
            <div class="building-copy">
                <p class="section-kicker">Currently building</p>
                <h2>ChromaForge is moving from useful tool to serious material workflow.</h2>
                <p>
                    The next pass is focused on better PBR map control, clearer preview feedback, stronger texture presets, and a smoother path from generated material to usable asset.
                </p>

                <div class="building-actions">
                    <NuxtLink to="/projects/chromaforge" class="btn primary">View ChromaForge</NuxtLink>
                    <a href="https://chromaforge.duckdns.org/" target="_blank" rel="noopener noreferrer" class="btn">Live Build</a>
                </div>
            </div>

            <div class="building-panel" aria-label="ChromaForge development focus">
                <div class="building-panel-header">
                    <span>Active focus</span>
                    <strong>PBR texture pipeline</strong>
                </div>

                <div class="building-track">
                    <article>
                        <span>01</span>
                        <h3>Login & Sessions</h3>
                        <p>Building a proper auth system with secure sessions and user state handling.</p>
                    </article>

                    <article>
                        <span>02</span>
                        <h3>User Accounts</h3>
                        <p>Letting users manage their uploads, data, and settings from a clean dashboard.</p>
                    </article>

                    <article>
                        <span>03</span>
                        <h3>Admin Tools</h3>
                        <p>Internal tools for managing users and reviewing content without leaving the app.</p>
                    </article>

                    <article>
                        <span>04</span>
                        <h3>Lighting Presets</h3>
                        <p>Upgrading the PBR viewer with different scene setups, including indoor, outdoor, and night-time lighting.</p>
                    </article>

                    <article>
                        <span>05</span>
                        <h3>Dynamic Lighting Control</h3>
                        <p>Interactive control over light direction, intensity, and colour to test materials under different conditions.</p>
                    </article>

                    <article>
                        <span>06</span>
                        <h3>Content Moderation</h3>
                        <p>Admin tools for reviewing uploads, managing users, and maintaining platform quality.</p>
                    </article>
                </div>
            </div>
        </div>
    </section>
</template>
