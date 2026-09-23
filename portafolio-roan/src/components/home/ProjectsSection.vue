<script setup lang="ts">
import SectionWrapper from '@/components/SectionWrapper.vue'
import { projects } from '@/data'
</script>

<template>
  <SectionWrapper id="proyectos" eyebrow="Proyectos" title="Trabajo seleccionado">
    <template #aside>
      <span class="border border-line-strong px-3.5 py-2 text-xs text-label">
        Contenido de ejemplo — pendiente de reemplazar
      </span>
    </template>
    <div class="grid grid-cols-3 gap-[22px] max-desk:grid-cols-2">
      <component
        :is="project.url ? 'a' : 'div'"
        v-for="(project, i) in projects"
        :key="project.id"
        v-reveal="i"
        :href="project.url"
        :target="project.url ? '_blank' : undefined"
        :rel="project.url ? 'noopener' : undefined"
        class="flex flex-col border border-line-card bg-card hover:border-accent/55 hover:bg-card-hover"
        :class="project.url ? 'text-inherit hover:text-inherit' : ''"
      >
        <div
          class="flex aspect-[16/9] items-end border-b border-line-card bg-[repeating-linear-gradient(135deg,#0e1a2d_0_12px,#0c1626_12px_24px)] p-3.5"
        >
          <span class="text-[11px] tracking-[.14em] text-dim uppercase">Captura del proyecto</span>
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
    </div>
  </SectionWrapper>
</template>
