import type { Directive } from 'vue'

/**
 * v-reveal — fade/slide an element in the first time it enters the viewport.
 *
 * The binding value is an optional stagger delay in milliseconds:
 *   <article v-reveal="120">
 *
 * Elements already inside the viewport when they mount are left untouched so
 * above-the-fold content never flashes, and the whole effect is skipped when
 * the visitor asks for reduced motion.
 */
const REVEAL_TRANSITION = 'cubic-bezier(.2,.7,.2,1)'

let observer: IntersectionObserver | null = null

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const getObserver = (): IntersectionObserver => {
  if (observer) return observer

  observer = new IntersectionObserver(
    entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return

        const el = target as HTMLElement
        const delay = Number(el.dataset.revealDelay ?? 0)

        el.style.transition =
          `opacity .7s ${REVEAL_TRANSITION} ${delay}ms, transform .7s ${REVEAL_TRANSITION} ${delay}ms`
        el.style.opacity = '1'
        el.style.transform = 'none'

        observer?.unobserve(el)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  )

  return observer
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return

    el.dataset.revealDelay = String(binding.value ?? 0)
    el.style.opacity = '0'
    el.style.transform = 'translateY(18px)'

    getObserver().observe(el)
  },

  unmounted(el) {
    observer?.unobserve(el)
  }
}

export default vReveal
