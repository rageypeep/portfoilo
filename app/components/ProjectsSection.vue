<script setup>
import { projects } from '@/data/projects'
</script>

<template>
    <section id="projects" class="section">
        <h2>Projects</h2>
        <div class="project-grid">
            <ProjectCard
                v-for="project in projects"
                :key="project.title"
                v-bind="project"
            />  

        </div>
    </section>
</template>