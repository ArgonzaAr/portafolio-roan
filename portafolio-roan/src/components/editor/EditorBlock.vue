<script setup lang="ts">
import { computed } from 'vue'
import { getBlockType } from '@/data/blockTypes'
import type { ArticleBlock } from '@/types'

const props = defineProps<{ block: ArticleBlock }>()

defineEmits<{
  up: []
  down: []
  remove: []
}>()

const content = defineModel<string>({ required: true })

const meta = computed(() => getBlockType(props.block.type))

const iconButton =
  'size-[30px] cursor-pointer border border-line-input bg-transparent text-[13px] text-muted hover:border-accent/70 hover:text-fg'
</script>

<template>
  <div class="border border-line-card bg-code-bg">
    <div class="flex items-center justify-between gap-4 border-b border-line-card px-4 py-3">
      <div class="flex items-center gap-2.5">
        <span class="font-mono text-xs text-accent">{{ meta.icon }}</span>
        <span class="text-[11px] font-bold tracking-[.16em] text-label uppercase">
          {{ meta.label }}
        </span>
      </div>
      <div class="flex gap-1.5">
        <button type="button" aria-label="Subir bloque" :class="iconButton" @click="$emit('up')">
          ↑
        </button>
        <button type="button" aria-label="Bajar bloque" :class="iconButton" @click="$emit('down')">
          ↓
        </button>
        <button
          type="button"
          aria-label="Eliminar bloque"
          class="size-[30px] cursor-pointer border border-line-input bg-transparent text-[13px] text-muted hover:border-[rgba(255,120,120,.6)] hover:text-[#ffb3b3]"
          @click="$emit('remove')"
        >
          ✕
        </button>
      </div>
    </div>
    <textarea
      v-model="content"
      :rows="meta.rows"
      :placeholder="meta.placeholder"
      class="field-sizing-content block w-full resize-none overflow-hidden border-0 bg-transparent p-4 leading-[1.7]"
      :class="meta.textClass"
    ></textarea>
  </div>
</template>
