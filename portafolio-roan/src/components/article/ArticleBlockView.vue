<script setup lang="ts">
import { computed } from 'vue'
import type { ArticleBlock } from '@/types'

const props = defineProps<{ block: ArticleBlock; lead?: boolean }>()

const codeLines = computed(() =>
  props.block.content.split('\n').map((line) => ({
    comment: line.startsWith('//'),
    parts: line.split(/('[^']*')/).map((text) => ({ text, string: /^'.*'$/.test(text) })),
  })),
)

const listItems = computed(() =>
  props.block.content
    .split('\n')
    .map((line) => line.replace(/^\s*(—|-|•)\s*/, '').trim())
    .filter(Boolean),
)

const isImageUrl = computed(() => /^(https?:\/\/|\/)/.test(props.block.content.trim()))
</script>

<template>
  <h2
    v-if="block.type === 'heading'"
    class="m-0 mt-11 text-[26px] leading-[1.2] font-extrabold tracking-[-.028em] text-white"
  >
    {{ block.content }}
  </h2>
  <h3
    v-else-if="block.type === 'subheading'"
    class="m-0 mt-8 text-xl leading-[1.3] font-bold text-fg"
  >
    {{ block.content }}
  </h3>
  <p
    v-else-if="block.type === 'paragraph'"
    class="m-0"
    :class="
      lead
        ? 'mt-[22px] text-lg leading-[1.65] text-muted'
        : 'mt-4 text-[17px] leading-[1.8] text-prose'
    "
  >
    {{ block.content }}
  </p>
  <div
    v-else-if="block.type === 'code'"
    class="mt-8 border border-line-img bg-code-bg px-[26px] py-6 font-mono text-[13px] leading-[1.8] text-code"
  >
    <div v-for="(line, i) in codeLines" :key="i" :class="{ 'text-dim': line.comment }">
      <template v-for="(part, j) in line.parts" :key="j">
        <span v-if="part.string" class="text-accent">{{ part.text }}</span>
        <template v-else>{{ part.text }}</template>
      </template>
    </div>
  </div>
  <blockquote
    v-else-if="block.type === 'quote'"
    class="m-0 mt-9 border-l-2 border-accent-strong py-1 pl-[26px]"
  >
    <p class="m-0 text-[20px] leading-[1.55] font-semibold text-white">{{ block.content }}</p>
  </blockquote>
  <ul
    v-else-if="block.type === 'list'"
    class="m-0 mt-4 list-disc pl-6 text-[17px] leading-[1.8] text-prose"
  >
    <li v-for="item in listItems" :key="item">{{ item }}</li>
  </ul>
  <figure v-else-if="block.type === 'image'" class="m-0 mt-8">
    <img v-if="isImageUrl" :src="block.content" alt="" class="block w-full" />
    <div
      v-else
      class="flex aspect-[16/9] items-end border border-line-img bg-[repeating-linear-gradient(135deg,#0e1a2d_0_12px,#0c1626_12px_24px)] p-3.5"
    >
      <span class="text-[13.5px] text-muted">{{ block.content }}</span>
    </div>
  </figure>
</template>
