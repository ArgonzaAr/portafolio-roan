import { computed, ref } from 'vue'
import type { Article } from '@/types'

export const ALL_CATEGORIES = 'Todos'

export function filterByCategory(articles: Article[], category: string): Article[] {
  if (category === ALL_CATEGORIES) return articles
  return articles.filter((article) => article.category === category)
}

export function useArticleFilter(articles: Article[], categories: readonly string[]) {
  const options = [ALL_CATEGORIES, ...categories]
  const active = ref(ALL_CATEGORIES)
  const filtered = computed(() => filterByCategory(articles, active.value))

  function select(category: string) {
    active.value = category
  }

  return { options, active, filtered, select }
}
