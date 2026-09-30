<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useCarousel } from '@/composables/useCarousel'
import type { Project } from '@/types'

const props = defineProps<{
  project: Project
  /** Enfocada por scroll en dispositivos sin hover (lo decide `ProjectsSection`). */
  focused?: boolean
}>()

const { index, start, stop } = useCarousel(props.project.images.length)

// Se leen al montar; sin matchMedia (p. ej. jsdom) la tarjeta queda estática.
const canHover = ref(false)
const reducedMotion = ref(false)
const hovered = ref(false)

onMounted(() => {
  canHover.value = window.matchMedia?.('(hover: hover)').matches ?? false
  reducedMotion.value = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
})

const active = computed(() => !reducedMotion.value && (hovered.value || props.focused))

watch(active, (isActive) => (isActive ? start() : stop()))

function onEnter() {
  if (canHover.value) hovered.value = true
}

function onLeave() {
  hovered.value = false
}
</script>

<template>
  <component
    :is="project.url ? 'a' : 'div'"
    :href="project.url"
    :target="project.url ? '_blank' : undefined"
    :rel="project.url ? 'noopener' : undefined"
    class="flex h-full flex-col border border-line-card bg-card transition-[translate,box-shadow,border-color,background-color] duration-300 ease-out hover:border-accent/55 hover:bg-card-hover"
    :class="[
      project.url ? 'text-inherit hover:text-inherit' : '',
      active
        ? '-translate-y-1.5 border-accent/55 bg-card-hover shadow-[0_18px_40px_-12px_rgba(0,0,0,0.65)]'
        : '',
    ]"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div class="relative aspect-[16/9] overflow-hidden border-b border-line-card bg-card-hover">
      <img
        v-for="(src, n) in project.images"
        :key="src"
        :src="src"
        :alt="`${project.title} — captura ${n + 1}`"
        loading="lazy"
        class="absolute inset-0 size-full object-cover object-top transition-opacity duration-700"
        :class="n === index ? 'opacity-100' : 'opacity-0'"
      />
      <div
        v-if="project.images.length > 1"
        aria-hidden="true"
        class="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 bg-bg/60 px-2 py-1.5"
      >
        <span
          v-for="(src, n) in project.images"
          :key="src"
          class="size-1.5 rounded-full transition-colors duration-300"
          :class="n === index ? 'bg-accent' : 'bg-fg/35'"
        />
      </div>
    </div>
    <div class="flex flex-1 flex-col gap-3 px-[26px] pt-[26px] pb-[30px]">
      <div class="text-lg leading-[1.3] font-bold text-white">{{ project.title }}</div>
      <p class="m-0 text-[13.5px] leading-[1.65] text-muted">{{ project.description }}</p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="border border-line-strong px-2.5 py-[5px] text-[11.5px] font-semibold tracking-[.04em] text-code"
        >
          {{ tag }}
        </span>
      </div>
      <span v-if="project.url" class="mt-auto text-[13px] font-bold text-accent">
        Ver proyecto →
      </span>
    </div>
  </component>
</template>
