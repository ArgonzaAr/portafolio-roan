import type { ObjectDirective } from 'vue'

/** Paso de retraso (ms) entre elementos hermanos y tope máximo del stagger. */
const STAGGER_STEP_MS = 50
const STAGGER_MAX_MS = 300

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('reveal-visible', entry.isIntersecting)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )
  }
  return observer
}

/**
 * Directiva `v-reveal`: anima la aparición del elemento cuando entra en el
 * viewport (fade + translateY, ver clases `.reveal`/`.reveal-visible` en
 * main.css). El valor opcional es el índice del elemento dentro de una lista,
 * usado para escalonar (stagger) el retraso entre elementos hermanos.
 */
export const vReveal: ObjectDirective<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')

    if (typeof binding.value === 'number') {
      const delay = Math.min(binding.value * STAGGER_STEP_MS, STAGGER_MAX_MS)
      el.style.setProperty('--reveal-delay', `${delay}ms`)
    }

    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
