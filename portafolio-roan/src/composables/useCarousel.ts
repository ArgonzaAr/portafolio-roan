import { onUnmounted, ref } from 'vue'

/**
 * Carrusel automático de `count` elementos: `start()` avanza `index` cada
 * `intervalMs` (volviendo a 0 tras el último) y `stop()` lo detiene y regresa
 * a la primera posición.
 */
export function useCarousel(count: number, intervalMs = 1500) {
  const index = ref(0)
  let timer: ReturnType<typeof setInterval> | undefined

  function start() {
    if (timer !== undefined || count < 2) return
    timer = setInterval(() => {
      index.value = (index.value + 1) % count
    }, intervalMs)
  }

  function stop() {
    clearInterval(timer)
    timer = undefined
    index.value = 0
  }

  onUnmounted(() => clearInterval(timer))

  return { index, start, stop }
}
