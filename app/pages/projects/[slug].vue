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

const activeImage = ref(null)

function openImage(item){
    activeImage.value = item
}

function closeImage(item) {
    activeImage.value = null
}
</script>

<template>
    <div class="project-page" :class="`project-page--${project.type}`">
        <div class="project-wrap">
            <NuxtLink to="/" class="back-link">&larr; Back to Projects</NuxtLink>

            <p class="Project-type">{{ project.type }}</p>
            <p v-if="project.type === 'archive'" class="archive-note">
            Archived project · early full-stack web development
            </p>
            <p v-if="project.status" class="project-status">{{ project.status }}</p>
            <h1>{{ project.title }}</h1>
            <img v-if="project.hero" :src="project.hero" class="project-hero" />
            <p class="project-intro">{{ project.description }}</p>
            <div v-if="project.tags?.length" class="tags">
                <span v-for="t in project.tags" :key="t">{{ t }}</span>
            </div>
            <div class="project-actions">
                <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="btn primary">Visit Live Project</a>
                        <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer" class="btn">View GitHub</a>                
            </div>
            <video v-if="project.video" class="project-video" controls autoplay muted loop playsinline>
                <source :src="project.video" type="video/mp4" />
            </video>
            <p v-if ="project.caption" class="image-caption">{{ project.caption }}</p>

            <section v-if="project.timeline?.length" class="project-section">
                <h2>Screenshots</h2>

                <div class="gallery">
                    <div
                        v-for="item in project.timeline"
                        :key="item.image"
                        class="gallery-item"
                        @click="openImage(item)"
                    >
                        <img :src="item.image" :alt="item.title" />
                        <p>{{ item.title }}</p>
                    </div>
                </div>
            </section>
            <section class="project-content">
                <p v-for="paragraph in project.content" :key="paragraph">
                {{ paragraph }}
                </p>
            </section>
            <section v-if="project.features" class="project-section">
                <h2>
                    Key Features
                </h2>
                <ul>
                    <li v-for="f in project.features" :key="f">{{ f }}</li>
                </ul>
            </section>
            <section v-if="project.challenges" class="project-section">
                <h2>Challenges</h2>
                <ul>
                    <li v-for="c in project.challenges" :key="c">{{ c }}</li>
                </ul>
            </section>
            <section v-if="project.learning" class="project-section">
                <h2>Lessons Learned</h2>
                <ul>
                    <li v-for="l in project.learning" :key="l">{{ l }}</li>
                </ul>
            </section>
            <section v-if="project.postmortem" class="project-section postmortem">
                <p class="postmortem-label">Reflection</p>
                <h2>Post-Mortem</h2>

                <p v-for="p in project.postmortem" :key="p">
                    {{ p }}
                </p>
            </section>

        </div>

    </div>


    <div v-if="activeImage" class="lightbox" @click="closeImage">
        <img :src="activeImage.image" />
        <div class="lightbox-caption">
            <h3>{{ activeImage.title }}</h3>
            <p>{{ activeImage.caption }}</p>
        </div>
    </div>
</template>