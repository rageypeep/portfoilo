// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css : ['@/assets/css/main.css'],
  app: {
    head: {
      title: 'Portfolio - Peter Deacon',
      meta: [
        { name: 'description', content: 'Portfolio of Peter – Full-stack developer & systems builder' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0f172a' },
        { property: 'og:title', content: 'Portfolio - Peter Deacon' },
        { property: 'og:description', content: 'Portfolio of Peter – Full-stack developer & systems builder' },
        { property: 'og:image', content: '/og-image.png' },
        { property: 'og:url', content: 'https://peterdeacon.dev' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Portfolio - Peter Deacon' },
        { name: 'twitter:description', content: 'Portfolio of Peter – Full-stack developer & systems builder' },
        { name: 'twitter:image', content: '/og-image.png' }

      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
  
  }
})
