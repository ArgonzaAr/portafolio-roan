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
    <div class="flex flex-col gap-px border border-line-card bg-line-card">
      <div
        v-for="(project, i) in projects"
        :key="project.id"
        class="grid grid-cols-[96px_1.2fr_1fr] items-center gap-9 bg-card px-8 py-[34px] max-desk:grid-cols-[minmax(0,1fr)] max-desk:gap-8"
      >
        <div class="text-[40px] font-extrabold tracking-[-.04em] text-num">
          {{ String(i + 1).padStart(2, '0') }}
        </div>
        <div>
          <div class="text-[22px] font-bold tracking-[-.02em] text-white">{{ project.title }}</div>
          <p class="mt-2.5 mb-0 text-sm leading-[1.7] text-muted">{{ project.description }}</p>
          <div class="mt-[18px] flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="border border-line-strong px-2.5 py-[5px] text-[11.5px] font-semibold tracking-[.04em] text-code"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        <div
          class="flex aspect-[16/10] items-end border border-line-img bg-[repeating-linear-gradient(135deg,#0e1a2d_0_12px,#0c1626_12px_24px)] p-3.5"
        >
          <span class="text-[11px] tracking-[.14em] text-dim uppercase">Captura del proyecto</span>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>
