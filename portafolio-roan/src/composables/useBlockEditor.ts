import { computed, ref } from 'vue'
import type { ArticleBlock, ArticleBlockType } from '@/types'

const WORDS_PER_MINUTE = 200

export function useBlockEditor(initial: ArticleBlock[] = []) {
  const blocks = ref<ArticleBlock[]>(initial.map((block) => ({ ...block })))
  let nextId = initial.length + 1

  function add(type: ArticleBlockType) {
    blocks.value.push({ id: `block-${nextId++}`, type, content: '' })
  }

  function move(index: number, delta: -1 | 1) {
    const target = index + delta
    if (index < 0 || index >= blocks.value.length) return
    if (target < 0 || target >= blocks.value.length) return
    const next = [...blocks.value]
    ;[next[index], next[target]] = [next[target]!, next[index]!]
    blocks.value = next
  }

  function remove(id: string) {
    blocks.value = blocks.value.filter((block) => block.id !== id)
  }

  function update(id: string, content: string) {
    const block = blocks.value.find((item) => item.id === id)
    if (block) block.content = content
  }

  const wordCount = computed(() =>
    blocks.value.reduce((total, block) => total + countWords(block.content), 0),
  )
  const readingMinutes = computed(() => Math.max(1, Math.round(wordCount.value / WORDS_PER_MINUTE)))

  return { blocks, add, move, remove, update, wordCount, readingMinutes }
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}
