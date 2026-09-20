import { describe, it, expect } from 'vitest'
import { ALL_CATEGORIES, filterByCategory, useArticleFilter } from '../useArticleFilter'
import { articleCategories, articles } from '@/data'

describe('filterByCategory', () => {
  it('"Todos" devuelve todos los artículos', () => {
    expect(filterByCategory(articles, ALL_CATEGORIES)).toEqual(articles)
  })

  it('filtra por categoría', () => {
    const backend = filterByCategory(articles, 'Backend')
    expect(backend.length).toBeGreaterThan(0)
    expect(backend.every((a) => a.category === 'Backend')).toBe(true)
  })

  it('una categoría sin artículos devuelve una lista vacía', () => {
    expect(filterByCategory(articles, 'Inexistente')).toEqual([])
  })
})

describe('useArticleFilter', () => {
  it('ofrece "Todos" más las categorías y arranca en "Todos"', () => {
    const { options, active, filtered } = useArticleFilter(articles, articleCategories)
    expect(options).toEqual([ALL_CATEGORIES, ...articleCategories])
    expect(active.value).toBe(ALL_CATEGORIES)
    expect(filtered.value).toHaveLength(articles.length)
  })

  it('select actualiza la lista filtrada', () => {
    const { select, filtered } = useArticleFilter(articles, articleCategories)
    select('Datos')
    expect(filtered.value.map((a) => a.category)).toEqual(['Datos'])
    select(ALL_CATEGORIES)
    expect(filtered.value).toHaveLength(articles.length)
  })
})
