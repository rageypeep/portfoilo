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