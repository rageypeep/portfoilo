<script setup>
import { projects } from '@/data/projects'
const route = useRoute()
const project = projects.find(p => p.slug === route.params.slug)

if (!project) {
    // Handle case where project is not found, e.g. redirect or show error
    throw createError({
        statusCode: 404,
        message: 'Project not found'
    })
}
</script>

<template>
    <div class="project-page">
        <div class="project-wrap">
            <NuxtLink to="/" class="back-link">&larr; Back to Projects</NuxtLink>

            <p class="Project-type">{{ project.type }}</p>
            <h1>{{ project.title }}</h1>
            <p class="project-intro">{{ project.description }}</p>

            <div v-if="project.tech?.length" class="tags">
                <span v-for="t in project.tech" :key="t">{{ t }}</span>
            </div>

            <div class="project-actions">
                <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="btn primary">Visit Live Project</a>
                        <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer" class="btn">View GitHub</a>                
            </div>
            <section class="project-content">
                <p v-for="paragraph in project.content" :key="paragraph">
                {{ paragraph }}
                </p>
            </section>
        </div>

    </div>
</template>