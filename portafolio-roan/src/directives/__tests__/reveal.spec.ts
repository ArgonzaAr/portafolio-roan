import { describe, it, expect, beforeAll, vi } from 'vitest'
import type { DirectiveBinding } from 'vue'
import { vReveal } from '../reveal'

/**
 * jsdom no implementa IntersectionObserver: se mockea guardando el callback
 * y los elementos observados para poder disparar entradas manualmente.
 */
class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = []
  callback: IntersectionObserverCallback
  observed: Element[] = []

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    MockIntersectionObserver.instances.push(this)
  }

  observe(el: Element) {
    this.observed.push(el)
  }

  unobserve(el: Element) {
    this.observed = this.observed.filter((observed) => observed !== el)
  }

  disconnect() {
    this.observed = []
  }
}

function binding(value: number | undefined): DirectiveBinding<number | undefined> {
  return { value } as DirectiveBinding<number | undefined>
}

function getLastInstance(): MockIntersectionObserver {
  const instances = MockIntersectionObserver.instances
  const last = instances[instances.length - 1]
  if (!last) throw new Error('No hay ninguna instancia de MockIntersectionObserver')
  return last
}

beforeAll(() => {
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
})

describe('v-reveal', () => {
  it('agrega la clase "reveal" y observa el elemento al montarlo', () => {
    const el = document.createElement('div')
    vReveal.mounted!(el, binding(undefined), {} as never, null as never)

    expect(el.classList.contains('reveal')).toBe(true)
    const observerInstance = getLastInstance()
    expect(observerInstance.observed).toContain(el)
  })

  it('calcula el retraso de stagger a partir del índice, con un tope máximo', () => {
    const first = document.createElement('div')
    const stepped = document.createElement('div')
    const capped = document.createElement('div')

    vReveal.mounted!(first, binding(0), {} as never, null as never)
    vReveal.mounted!(stepped, binding(2), {} as never, null as never)
    vReveal.mounted!(capped, binding(10), {} as never, null as never)

    expect(first.style.getPropertyValue('--reveal-delay')).toBe('0ms')
    expect(stepped.style.getPropertyValue('--reveal-delay')).toBe('100ms')
    expect(capped.style.getPropertyValue('--reveal-delay')).toBe('300ms')
  })

  it('agrega y quita "reveal-visible" según isIntersecting, repitiéndose en cada entrada', () => {
    const el = document.createElement('div')
    vReveal.mounted!(el, binding(undefined), {} as never, null as never)
    const observerInstance = getLastInstance()

    observerInstance.callback(
      [{ target: el, isIntersecting: true } as unknown as IntersectionObserverEntry],
      observerInstance as unknown as IntersectionObserver,
    )
    expect(el.classList.contains('reveal-visible')).toBe(true)

    observerInstance.callback(
      [{ target: el, isIntersecting: false } as unknown as IntersectionObserverEntry],
      observerInstance as unknown as IntersectionObserver,
    )
    expect(el.classList.contains('reveal-visible')).toBe(false)

    observerInstance.callback(
      [{ target: el, isIntersecting: true } as unknown as IntersectionObserverEntry],
      observerInstance as unknown as IntersectionObserver,
    )
    expect(el.classList.contains('reveal-visible')).toBe(true)
  })

  it('deja de observar el elemento al desmontarlo', () => {
    const el = document.createElement('div')
    vReveal.mounted!(el, binding(undefined), {} as never, null as never)
    const observerInstance = getLastInstance()
    expect(observerInstance.observed).toContain(el)

    vReveal.unmounted!(el, binding(undefined), {} as never, null as never)
    expect(observerInstance.observed).not.toContain(el)
  })
})
