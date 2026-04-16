<script setup>
defineProps({
    title: String,
    description: String,
})
</script>

<template>
    <article class="card fade-in">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
    </article>
</template>