<script setup>
import { projects } from '@/data/projects'
import { useRoute } from 'vue-router'

const route = useRoute()
const project = projects.find(p => p.slug === route.params.slug)

useFadeIn()

if (!project) {
    throw createError({
        statusCode: 404,
        message: 'Project not found'
    })
}

const activeImage = ref(null)
const headerTags = computed(() => project.tags?.length ? project.tags : project.tech ?? [])
const siteUrl = 'https://pdsystems.dev'
const projectUrl = `${siteUrl}/projects/${project.slug}`
const projectImage = project.hero?.startsWith('http') ? project.hero : `${siteUrl}${project.hero || '/og-image.png'}`
const projectDescription = project.seoDescription || project.description

useSeoMeta({
    title: `${project.title} - Peter Deacon`,
    description: projectDescription,
    ogTitle: `${project.title} - Peter Deacon`,
    ogDescription: projectDescription,
    ogImage: projectImage,
    ogUrl: projectUrl,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterTitle: `${project.title} - Peter Deacon`,
    twitterDescription: projectDescription,
    twitterImage: projectImage
})

useHead({
    link: [
        { rel: 'canonical', href: projectUrl }
    ]
})

function openImage(item) {
    activeImage.value = item
}

function closeImage() {
    activeImage.value = null
}
</script>

<template>
    <div class="project-page fade-in" :class="`project-page--${project.type}`">
        <div class="project-wrap">
            <NuxtLink to="/#projects" class="back-link">Back to Selected Systems</NuxtLink>

            <header class="project-case-header">
                <div class="project-header-copy">
                    <p class="project-type">{{ project.type }}</p>
                    <p v-if="project.type === 'archive'" class="archive-note">
                        Archived project - early full-stack web development
                    </p>
                    <p v-if="project.status" class="project-status">{{ project.status }}</p>
                    <h1>{{ project.title }}</h1>
                    <p class="project-intro">{{ project.description }}</p>
                    <p v-if="project.proofMetric" class="project-proof project-proof--hero">
                        {{ project.proofMetric }}
                    </p>
                    <div v-if="headerTags.length" class="tags">
                        <span v-for="t in headerTags" :key="t">{{ t }}</span>
                    </div>
                    <div class="project-actions">
                        <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="btn primary">Visit Live Project</a>
                        <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer" class="btn">View GitHub</a>
                    </div>
                </div>

                <div v-if="project.hero" class="project-hero-frame">
                    <img :src="project.hero" :alt="`${project.title} preview`" class="project-hero" />
                </div>
            </header>

            <section v-if="project.video" class="project-media-panel">
                <video class="project-video" controls autoplay muted loop playsinline>
                    <source :src="project.video" type="video/mp4" />
                </video>
                <p v-if="project.caption" class="image-caption">{{ project.caption }}</p>
            </section>

            <section v-if="project.timeline?.length" class="project-section project-gallery-section">
                <h2>Screenshots</h2>

                <div class="gallery">
                    <div
                        v-for="item in project.timeline"
                        :key="item.image"
                        class="gallery-item"
                        role="button"
                        tabindex="0"
                        @click="openImage(item)"
                        @keydown.enter="openImage(item)"
                        @keydown.space.prevent="openImage(item)"
                    >
                        <img :src="item.image" :alt="item.title" />
                        <p>{{ item.title }}</p>
                    </div>
                </div>
            </section>

            <section v-if="project.content?.length" class="project-content project-panel">
                <p v-for="paragraph in project.content" :key="paragraph">
                    {{ paragraph }}
                </p>
            </section>

            <section v-if="project.caseStudy?.length" class="project-section project-case-study project-panel">
                <div
                    v-for="section in project.caseStudy"
                    :key="section.title"
                    class="case-study-block"
                >
                    <p class="section-kicker">{{ section.label }}</p>
                    <h2>{{ section.title }}</h2>
                    <p>{{ section.body }}</p>
                </div>
            </section>

            <section v-if="project.architecture" class="project-section architecture-panel project-list-panel">
                <ArchitectureDiagram :architecture="project.architecture" />
            </section>

            <section v-if="project.features" class="project-section project-list-panel">
                <h2>Key Features</h2>
                <ul>
                    <li v-for="f in project.features" :key="f">{{ f }}</li>
                </ul>
            </section>

            <section v-if="project.challenges" class="project-section project-list-panel">
                <h2>Challenges</h2>
                <ul>
                    <li v-for="c in project.challenges" :key="c">{{ c }}</li>
                </ul>
            </section>

            <section v-if="project.learning" class="project-section project-list-panel">
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
        <img :src="activeImage.image" :alt="activeImage.title" @click.stop />
        <div class="lightbox-caption" @click.stop>
            <h3>{{ activeImage.title }}</h3>
            <p>{{ activeImage.caption }}</p>
        </div>
    </div>
</template>
