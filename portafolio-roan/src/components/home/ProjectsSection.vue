<script setup lang="ts">
import { onMounted, onUnmounted, reactive, useTemplateRef } from 'vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import ProjectCard from '@/components/home/ProjectCard.vue'
import { projects } from '@/data'

/**
 * En dispositivos sin hover, se enfocan las tarjetas que cruzan la franja central
 * del viewport: una fila de la cuadrícula a la vez (1 tarjeta en móvil, 2 en tablet).
 */
const focusedIds = reactive(new Set<string>())
const wrappers = useTemplateRef<HTMLElement[]>('wrappers')
let observer: IntersectionObserver | undefined

onMounted(() => {
  const isTouch = window.matchMedia?.('(hover: none)').matches ?? false
  if (!isTouch || typeof IntersectionObserver === 'undefined') return

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).dataset.projectId
        if (!id) continue
        if (entry.isIntersecting) focusedIds.add(id)
        else focusedIds.delete(id)
      }
    },
    { rootMargin: '-49.5% 0px -49.5% 0px' },
  )
  for (const el of wrappers.value ?? []) observer.observe(el)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <SectionWrapper id="proyectos" eyebrow="Proyectos" title="Trabajo seleccionado">
    <div class="grid grid-cols-[minmax(0,1fr)] gap-[22px] tablet:grid-cols-2 desk:grid-cols-3">
      <!-- v-reveal va en el envoltorio: la tarjeta interior usa su propio transform al elevarse -->
      <div
        v-for="(project, i) in projects"
        ref="wrappers"
        :key="project.id"
        v-reveal="i"
        :data-project-id="project.id"
      >
        <ProjectCard :project="project" :focused="focusedIds.has(project.id)" />
      </div>
    </div>
  </SectionWrapper>
</template>
