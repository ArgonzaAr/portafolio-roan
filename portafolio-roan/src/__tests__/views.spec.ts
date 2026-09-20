import { describe, it, expect, vi, afterEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../App.vue'
import { routes } from '../router'
import { articles } from '../data'

async function mountAt(path: string) {
  const router = createRouter({ history: createMemoryHistory(), routes })
  router.push(path)
  await router.isReady()
  const wrapper = mount(App, { global: { plugins: [router] } })
  await flushPromises()
  return wrapper
}

afterEach(() => vi.restoreAllMocks())

describe('vistas (humo)', () => {
  it('/ renderiza la home con sus anclas', async () => {
    const wrapper = await mountAt('/')
    for (const id of ['home', 'sobre-mi', 'servicios', 'proyectos', 'blog', 'contacto']) {
      expect(wrapper.find(`#${id}`).exists(), id).toBe(true)
    }
    expect(wrapper.text()).toContain('Desarrollador de Software')
  })

  it('/blog renderiza el listado', async () => {
    const wrapper = await mountAt('/blog')
    expect(wrapper.text()).toContain('Notas sobre desarrollo, automatización y datos')
    expect(wrapper.text()).toContain(articles[0]!.title)
  })

  it('/blog/<slug existente> renderiza el artículo', async () => {
    const article = articles[0]!
    const wrapper = await mountAt(`/blog/${article.slug}`)
    expect(wrapper.find('h1').text()).toBe(article.title)
    expect(wrapper.text()).toContain('Registrar la decisión, no solo el resultado')
  })

  it('/blog/<slug inexistente> muestra la vista 404', async () => {
    const wrapper = await mountAt('/blog/no-existe')
    expect(wrapper.text()).toContain('Página no encontrada')
  })

  it('una ruta desconocida muestra la vista 404', async () => {
    const wrapper = await mountAt('/otra/cosa')
    expect(wrapper.text()).toContain('Página no encontrada')
  })

  it('/blog/nuevo renderiza el editor', async () => {
    const wrapper = await mountAt('/blog/nuevo')
    expect(wrapper.text()).toContain('Publicar artículo')
    expect(wrapper.findAll('textarea').length).toBeGreaterThan(4)
  })

  it('el like alterna aria-pressed y el contador', async () => {
    const wrapper = await mountAt(`/blog/${articles[0]!.slug}`)
    const like = wrapper.find('button[aria-pressed]')
    expect(like.attributes('aria-pressed')).toBe('false')
    expect(like.text()).toBe('128')

    await like.trigger('click')
    expect(like.attributes('aria-pressed')).toBe('true')
    expect(like.text()).toBe('129')

    await like.trigger('click')
    expect(like.attributes('aria-pressed')).toBe('false')
  })

  it('los filtros del blog cambian la lista', async () => {
    const wrapper = await mountAt('/blog')
    const filter = wrapper.findAll('button[aria-pressed]').find((b) => b.text() === 'Datos')!
    await filter.trigger('click')
    expect(filter.attributes('aria-pressed')).toBe('true')
    expect(wrapper.text()).toContain('Reportería que no castiga a la base de datos')
    expect(wrapper.text()).not.toContain('Consumir web services heredados')
  })

  it('el editor agrega, mueve y elimina bloques desde la UI', async () => {
    const wrapper = await mountAt('/blog/nuevo')
    const before = wrapper.findAll('button[aria-label="Eliminar bloque"]').length
    await wrapper.findAll('button[title="Cita"]')[0]!.trigger('click')
    expect(wrapper.findAll('button[aria-label="Eliminar bloque"]').length).toBe(before + 1)
    await wrapper.findAll('button[aria-label="Eliminar bloque"]')[0]!.trigger('click')
    expect(wrapper.findAll('button[aria-label="Eliminar bloque"]').length).toBe(before)
  })
})
