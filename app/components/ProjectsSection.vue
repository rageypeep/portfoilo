<script setup>
import { computed } from 'vue'
import { projects } from '@/data/projects'

const featuredSlugs = ['chromaforge', 'jotspot', 'rageypeep', 'minecraft-in-space']
const featuredProjects = computed(() => projects.filter(project => featuredSlugs.includes(project.slug)))
const supportingProjects = computed(() => projects.filter(project => !featuredSlugs.includes(project.slug)))
</script>

<template>
    <section id="projects" class="section projects-section">
        <div class="section-heading projects-heading">
            <p class="section-kicker">Built, shipped, tested, rebuilt</p>
            <h2>Selected Systems</h2>
            <p>
                Live apps, creative tools, engine work, and the experiments that shaped the current stack.
            </p>
        </div>

        <div class="project-grid project-grid--featured" aria-label="Featured systems">
            <ProjectCard
                v-for="project in featuredProjects"
                :key="project.title"
                v-bind="project"
                featured
            />  
        </div>

        <div class="project-supporting">
            <p class="project-supporting-title">Supporting work</p>
            <div class="project-grid project-grid--supporting" aria-label="Supporting projects and experiments">
                <ProjectCard
                    v-for="project in supportingProjects"
                    :key="project.title"
                    v-bind="project"
                />
            </div>
        </div>
    </section>
</template>
