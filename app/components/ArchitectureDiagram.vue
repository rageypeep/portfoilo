<script setup>
defineProps({
    architecture: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="architecture-diagram">
        <div class="architecture-copy">
            <p class="section-kicker">System path</p>
            <h2>{{ architecture.title }}</h2>
            <p>{{ architecture.description }}</p>
        </div>

        <div class="architecture-flow" :aria-label="architecture.title">
            <article
                v-for="node in architecture.nodes"
                :key="node.label"
                class="architecture-node"
            >
                <span>{{ node.label }}</span>
                <p>{{ node.detail }}</p>
            </article>
        </div>

        <ul v-if="architecture.flows?.length" class="architecture-notes">
            <li v-for="flow in architecture.flows" :key="flow">{{ flow }}</li>
        </ul>
    </div>
</template>
