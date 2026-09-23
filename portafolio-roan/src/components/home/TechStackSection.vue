<script setup lang="ts">
import SectionWrapper from '@/components/SectionWrapper.vue'
import TechIcon from './TechIcon.vue'

const technologies = [
  'JavaScript',
  'Python',
  'C#',
  'PHP',
  'Vue.js',
  'Node.js',
  'Django',
  '.NET',
  'MySQL',
  'SQL Server',
]
</script>

<template>
  <SectionWrapper surface spacing="compact">
    <div class="mb-8 text-[11px] font-bold tracking-[.2em] text-dim uppercase">
      Tecnologías con las que trabajo
    </div>
    <div
      class="grid grid-cols-10 gap-4 max-desk:grid-cols-3 max-desk:gap-x-3 max-desk:gap-y-[26px]"
    >
      <div
        v-for="(tech, i) in technologies"
        :key="tech"
        v-reveal="i"
        class="flex flex-col items-center gap-3.5"
      >
        <TechIcon :name="tech" />
        <span class="text-[12.5px] font-semibold whitespace-nowrap text-muted">{{ tech }}</span>
      </div>
    </div>
  </SectionWrapper>
</template>
