<script setup>
defineProps({
    title: String,
    description: String,
    link: String,
    github: String,
    type: String,
    tech: Array,
    slug: String
})
</script>

<template>
    <article class="card fade-in" :data-type="type">
        <span class="badge">{{ type }}</span>

        <h3>{{ title }}</h3>        
        <p>{{ description }}</p>


        <div class="tags">
            <span v-for="t in tech" :key="t">{{ t }}</span>
        </div>

        <div class="links">
            <NuxtLink v-if="slug" :to="`/projects/${slug}`" class="btn primary">View Details</NuxtLink>
            <a v-if="link" :href="link" target="_blank" class="btn">Live Site</a>
            <a v-if="github" :href="github" target="_blank" class="btn">GitHub</a>
        </div>

        
        
    </article>
</template>