<script setup>
defineProps({
    title: String,
    description: String,
    link: String,
    github: String,
})
</script>

<template>
    <article class="card fade-in">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <div class="links">
            <a v-if="link" :href="link" target="_blank" class="btn primary">View Project</a>
            <a v-if="github" :href="github" target="_blank" class="btn">GitHub</a>
        </div>
    </article>
</template>