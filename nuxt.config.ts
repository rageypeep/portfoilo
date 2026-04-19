// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  app: {
    head: {
      title: 'Portfolio - Peter Deacon',
      meta: [
        { name: 'description', content: 'Portfolio of Peter Deacon - full-stack developer and systems builder' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#070b0f' },
        { property: 'og:title', content: 'Portfolio - Peter Deacon' },
        { property: 'og:description', content: 'Portfolio of Peter Deacon - full-stack developer and systems builder' },
        { property: 'og:image', content: 'https://pdsystems.dev/images/chromaforge-hero.png' },
        { property: 'og:url', content: 'https://pdsystems.dev' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Portfolio - Peter Deacon' },
        { name: 'twitter:description', content: 'Portfolio of Peter Deacon - full-stack developer and systems builder' },
        { name: 'twitter:image', content: 'https://pdsystems.dev/images/chromaforge-hero.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
