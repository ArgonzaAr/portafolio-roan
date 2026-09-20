<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import BaseButton from '@/components/BaseButton.vue'
import EditorBlock from '@/components/editor/EditorBlock.vue'
import { articleCategories, articles } from '@/data'
import { blockTypes, getBlockType } from '@/data/blockTypes'
import { useBlockEditor } from '@/composables/useBlockEditor'
import type { ArticleBlock } from '@/types'

const initialBlocks: ArticleBlock[] = [
  {
    id: 'block-1',
    type: 'paragraph',
    content:
      'Una automatización que decide por sí sola solo es útil si alguien puede reconstruir por qué decidió lo que decidió.',
  },
  { id: 'block-2', type: 'heading', content: 'Registrar la decisión, no solo el resultado' },
  { id: 'block-3', type: 'paragraph', content: '' },
  { id: 'block-4', type: 'code', content: '' },
]

const { blocks, add, move, remove, update, wordCount, readingMinutes } =
  useBlockEditor(initialBlocks)

const previewSlug = articles[0]?.slug ?? ''

const footerLinks = [
  { label: 'Ver el blog', to: '/blog' },
  { label: 'Volver al portafolio', to: '/' },
]

const labelClass = 'text-[11px] font-bold tracking-[.16em] text-label uppercase'
const fieldClass = 'w-full min-w-0 border border-line-input bg-bg px-3.5 py-3 text-sm text-fg'
const panelTitleClass = 'text-[11px] font-bold tracking-[.2em] text-dim uppercase'
const cardClass = 'border border-line-card bg-card'
const secondaryButton =
  'cursor-pointer border border-line-strong bg-transparent px-[22px] py-3 text-[13px] font-bold text-muted hover:border-accent/70 hover:text-fg'
</script>

<template>
  <main>
    <div class="border-b border-line bg-surface">
      <div
        class="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6 px-10 py-[26px] max-desk:flex-col max-desk:items-start max-desk:gap-4 max-desk:px-5"
      >
        <div>
          <div class="mb-3 flex items-center gap-3">
            <span class="h-0.5 w-[34px] bg-accent-strong"></span>
            <span class="text-[11px] font-bold tracking-[.2em] text-eyebrow uppercase">
              Nueva entrada
            </span>
          </div>
          <h1 class="m-0 text-[30px] leading-[1.1] font-extrabold tracking-[-.03em] text-white">
            Publicar artículo
          </h1>
        </div>
        <div
          class="flex items-center gap-3 max-desk:w-full max-desk:flex-wrap max-desk:*:min-w-0 max-desk:*:flex-[1_1_100%]"
        >
          <span class="text-[12.5px] text-label">
            {{ blocks.length }} bloques · {{ wordCount }} palabras
          </span>
          <button type="button" :class="secondaryButton">Guardar borrador</button>
          <BaseButton
            :to="`/blog/${previewSlug}`"
            variant="outline"
            size="sm"
            class="px-[22px] py-3"
          >
            Previsualizar
          </BaseButton>
          <BaseButton size="sm" class="px-6 py-3">Publicar</BaseButton>
        </div>
      </div>
    </div>

    <div
      class="mx-auto grid max-w-[1240px] grid-cols-[minmax(0,1fr)_320px] items-start gap-10 px-10 pt-11 pb-[88px] max-desk:grid-cols-[minmax(0,1fr)] max-desk:gap-8 max-desk:px-5"
    >
      <div class="min-w-0">
        <div class="px-[30px] pt-[30px] pb-8" :class="cardClass">
          <div class="mb-[22px]" :class="panelTitleClass">Encabezado</div>
          <div class="grid grid-cols-[minmax(0,1fr)] gap-5">
            <div class="flex flex-col gap-2">
              <label for="na-titulo" :class="labelClass">Título</label>
              <input
                id="na-titulo"
                type="text"
                placeholder="Cómo diseñar una automatización que sí se pueda auditar"
                class="w-full min-w-0 border border-line-input bg-bg px-4 py-[15px] text-[22px] font-bold tracking-[-.02em] text-white"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="na-entrada" :class="labelClass">Entradilla</label>
              <textarea
                id="na-entrada"
                rows="3"
                placeholder="Resumen de dos o tres líneas que aparece bajo el título y en la tarjeta del blog."
                class="w-full min-w-0 resize-y border border-line-input bg-bg px-4 py-3.5 text-[14.5px] leading-[1.7] text-fg"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="mt-6" :class="cardClass">
          <div
            class="flex flex-wrap items-center justify-between gap-5 border-b border-line-card px-[30px] py-[22px]"
          >
            <div :class="panelTitleClass">Cuerpo del artículo</div>
            <div class="flex flex-wrap gap-2 max-desk:w-full">
              <button
                v-for="meta in blockTypes"
                :key="meta.type"
                type="button"
                :title="meta.short"
                class="flex cursor-pointer items-center gap-2 border border-line-strong bg-transparent px-3.5 py-[9px] text-[12.5px] font-semibold text-muted hover:border-accent/70 hover:text-fg"
                @click="add(meta.type)"
              >
                <span class="font-mono text-accent">{{ meta.icon }}</span>
                <span>{{ meta.short }}</span>
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-[18px] px-[30px] pt-[26px] pb-[30px]">
            <EditorBlock
              v-for="(block, i) in blocks"
              :key="block.id"
              :block="block"
              :model-value="block.content"
              @update:model-value="update(block.id, $event)"
              @up="move(i, -1)"
              @down="move(i, 1)"
              @remove="remove(block.id)"
            />
          </div>
        </div>
      </div>

      <aside class="sticky top-[98px] flex flex-col gap-6 max-desk:static max-desk:w-auto">
        <div class="p-[26px]" :class="cardClass">
          <div class="mb-5" :class="panelTitleClass">Publicación</div>
          <div class="grid grid-cols-[minmax(0,1fr)] gap-[18px]">
            <div class="flex flex-col gap-2">
              <label for="na-cat" :class="labelClass">Categoría</label>
              <select id="na-cat" :class="fieldClass">
                <option v-for="category in articleCategories" :key="category">
                  {{ category }}
                </option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-3.5 max-desk:grid-cols-[minmax(0,1fr)] max-desk:gap-8">
              <div class="flex flex-col gap-2">
                <label for="na-fecha" :class="labelClass">Fecha</label>
                <input id="na-fecha" type="text" placeholder="Ago 2026" :class="fieldClass" />
              </div>
              <div class="flex flex-col gap-2">
                <label for="na-lectura" :class="labelClass">Lectura</label>
                <input
                  id="na-lectura"
                  type="text"
                  :value="`${readingMinutes} min`"
                  readonly
                  class="w-full min-w-0 border border-line-input bg-bg px-3.5 py-3 text-sm text-label"
                />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label for="na-tags" :class="labelClass">Etiquetas</label>
              <input
                id="na-tags"
                type="text"
                placeholder="Python, SQL Server"
                :class="fieldClass"
              />
              <span class="text-xs text-dim">Sepáralas con comas.</span>
            </div>
            <div class="flex flex-col gap-2">
              <label for="na-slug" :class="labelClass">URL</label>
              <input
                id="na-slug"
                type="text"
                placeholder="/blog/automatizacion-auditable"
                :class="fieldClass"
              />
            </div>
          </div>
        </div>

        <div class="p-[26px]" :class="cardClass">
          <div class="mb-4" :class="panelTitleClass">Portada</div>
          <div
            class="flex aspect-[16/9] items-center justify-center border border-line-img bg-[repeating-linear-gradient(135deg,#0e1a2d_0_12px,#0c1626_12px_24px)]"
          >
            <span class="text-[11px] tracking-[.14em] text-dim uppercase">Arrastra una imagen</span>
          </div>
          <p class="mt-3.5 mb-0 text-[12.5px] leading-[1.6] text-label">
            Se usa en la tarjeta del blog. No aparece dentro del artículo.
          </p>
        </div>

        <div class="p-[26px]" :class="cardClass">
          <div class="mb-4" :class="panelTitleClass">Estructura</div>
          <div class="flex flex-col gap-px bg-line-card">
            <div
              v-for="block in blocks"
              :key="block.id"
              class="flex items-center gap-2.5 bg-card px-0.5 py-[11px]"
            >
              <span class="w-[22px] font-mono text-[11px] text-accent">
                {{ getBlockType(block.type).icon }}
              </span>
              <span class="truncate text-[13px] text-muted">
                {{ block.content.trim().slice(0, 46) || getBlockType(block.type).label }}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </main>
  <AppFooter :links="footerLinks" />
</template>
