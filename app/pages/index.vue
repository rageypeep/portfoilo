<script setup>
import CurrentlyBuildingSection from '@/components/CurrentlyBuildingSection.vue'

useFadeIn();

const siteUrl = 'https://pdsystems.dev'
const socialImage = `${siteUrl}/og-image.png`
const homeDescription = 'Portfolio of Peter Deacon: full-stack Flask, HTMX, Nuxt, Docker, Caddy, and C++ systems work.'

useSeoMeta({
    title: 'Peter Deacon - Full-stack systems portfolio',
    description: homeDescription,
    ogTitle: 'Peter Deacon - Full-stack systems portfolio',
    ogDescription: homeDescription,
    ogImage: socialImage,
    ogUrl: siteUrl,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Peter Deacon - Full-stack systems portfolio',
    twitterDescription: homeDescription,
    twitterImage: socialImage
})

useHead({
    link: [
        { rel: 'canonical', href: siteUrl }
    ]
})

const showBackToTop = ref(false)

function updateBackToTop() {
    showBackToTop.value = window.scrollY > window.innerHeight * 0.55
}

function scrollBackToTop() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
    })
}

onMounted(() => {
    updateBackToTop()
    window.addEventListener('scroll', updateBackToTop, { passive: true })
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateBackToTop)
})
</script>

<template>
    <div class="page">
        <HeroSection class="fade-in" />
        <CurrentlyBuildingSection class="fade-in" />
        <ProjectsSection class="fade-in" />
        <AboutSection class="fade-in" />
        <ContactSignalSection class="fade-in" />

        <button
            type="button"
            class="back-to-top"
            :class="{ 'back-to-top--visible': showBackToTop }"
            aria-label="Back to top"
            @click="scrollBackToTop"
        >
            <span aria-hidden="true">Top</span>
        </button>
    </div>
</template>
