<script setup>
defineProps({
    title: String,
    description: String,
    link: String,
    github: String,
    type: String,
    tech: Array,
    slug: String,
    hero: String,
    status: String,
    proofMetric: String,
    featured: Boolean
})
</script>

<template>
    <article class="card project-card fade-in" :class="{ 'project-card--featured': featured }" :data-type="type">
        <NuxtLink v-if="hero && slug" :to="`/projects/${slug}`" class="project-card-media" :aria-label="`View ${title}`">
            <img :src="hero" :alt="`${title} preview`" loading="lazy">
        </NuxtLink>
        <div v-else-if="hero" class="project-card-media" aria-hidden="true">
            <img :src="hero" :alt="`${title} preview`" loading="lazy">
        </div>

        <div class="project-card-body">
            <div class="project-card-meta">
                <span class="badge">{{ type }}</span>
                <span v-if="status" class="status">{{ status }}</span>
            </div>

            <h3>{{ title }}</h3>        
            <p>{{ description }}</p>

            <p v-if="proofMetric" class="project-proof">
                {{ proofMetric }}
            </p>

            <div class="tags">
                <span v-for="t in tech" :key="t">{{ t }}</span>
            </div>

            <div class="links">
                <NuxtLink v-if="slug" :to="`/projects/${slug}`" class="btn primary">View Details</NuxtLink>
                <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer" class="btn">Live Site</a>
                <a v-if="github" :href="github" target="_blank" rel="noopener noreferrer" class="btn">GitHub</a>
            </div>
        </div>
    </article>
</template>
