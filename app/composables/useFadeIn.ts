export function useFadeIn() {
    const elements = ref<HTMLElement[]>([])

    onMounted(() => {
        elements.value = Array.from(document.querySelectorAll('.fade-in'))
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, { threshold: 0.1 })

        elements.value.forEach((el) => observer.observe(el))
    })
}

// import { nextTick } from 'vue'

// export function useFadeIn() {
//   let observer: IntersectionObserver | null = null

//   const initFadeIn = async (selector = '.page-fade-scope') => {
//     await nextTick()

//     if (observer) {
//       observer.disconnect()
//     }

//     const container = document.querySelector(selector)
//     if (!container) return

//     const elements = Array.from(
//       container.querySelectorAll('.fade-in')
//     ) as HTMLElement[]

//     observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('visible')
//           observer?.unobserve(entry.target)
//         }
//       })
//     }, { threshold: 0.1 })

//     elements.forEach((el) => {
//       observer?.observe(el)
//     })
//   }

//   return { initFadeIn }
// }
    