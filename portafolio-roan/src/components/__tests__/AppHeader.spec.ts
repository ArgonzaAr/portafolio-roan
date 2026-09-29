import { describe, it, expect, afterEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import AppHeader from '../AppHeader.vue'

let wrapper: VueWrapper | undefined

async function mountHeader() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/blog', component: { template: '<div />' } },
    ],
  })
  router.push('/')
  await router.isReady()

  wrapper = mount(AppHeader, { global: { plugins: [router] }, attachTo: document.body })
  return { wrapper, router }
}

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

describe('AppHeader — menú hamburguesa', () => {
  it('el panel está cerrado por defecto', async () => {
    const { wrapper } = await mountHeader()

    expect(wrapper.get('[data-test="menu-panel"]').isVisible()).toBe(false)
    expect(wrapper.get('[data-test="menu-toggle"]').attributes('aria-expanded')).toBe('false')
  })

  it('se abre al tocar el botón y se cierra al volver a tocarlo', async () => {
    const { wrapper } = await mountHeader()
    const toggle = wrapper.get('[data-test="menu-toggle"]')

    await toggle.trigger('click')
    expect(wrapper.get('[data-test="menu-panel"]').isVisible()).toBe(true)
    expect(toggle.attributes('aria-expanded')).toBe('true')

    await toggle.trigger('click')
    expect(wrapper.get('[data-test="menu-panel"]').isVisible()).toBe(false)
  })

  it('se cierra al hacer click en un link y navega al destino', async () => {
    const { wrapper, router } = await mountHeader()

    await wrapper.get('[data-test="menu-toggle"]').trigger('click')
    const blogLink = wrapper
      .get('[data-test="menu-panel"]')
      .findAll('a')
      .find((a) => a.text() === 'Blog')!

    await blogLink.trigger('click')
    await router.isReady()
    await new Promise((resolve) => setTimeout(resolve))

    expect(wrapper.get('[data-test="menu-panel"]').isVisible()).toBe(false)
    expect(router.currentRoute.value.path).toBe('/blog')
  })
})
