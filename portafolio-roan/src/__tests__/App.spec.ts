import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../App.vue'

describe('App', () => {
  it('renderiza el header con la navegación', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', component: { template: '<div />' } }],
    })
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })

    expect(wrapper.text()).toContain('Angel Argonza')
    expect(wrapper.text()).toContain('Trabajemos juntos')
  })
})
