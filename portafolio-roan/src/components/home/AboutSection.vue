<script setup lang="ts">
import SectionWrapper from '@/components/SectionWrapper.vue'
import AboutIcon from './AboutIcon.vue'

const facts = [
  { icon: 'pin', label: 'Ubicación', value: 'Ciudad de México' },
  { icon: 'monitor', label: 'Modalidad', value: 'Remoto · Freelance' },
  { icon: 'calendar', label: 'Entregas', value: 'Periódicas' },
  { icon: 'code', label: 'Enfoque', value: 'Web Developer' },
]

const timeline = [
  {
    period: 'Jul 2025 — Actual',
    role: 'Desarrollador Fullstack',
    company: 'Grupo Salinas',
    description:
      'Automatización de cierre de tickets, portal de reportería con KPIs y microservicios de gestión.',
  },
  {
    period: 'Sep 2023 — Jul 2025',
    role: 'Ingeniero de Software',
    company: 'Relative-IT',
    description:
      'Sistemas web con arquitecturas MVC/MVVM, bases de datos relacionales y servidores Linux.',
  },
  {
    period: 'Ago 2022 — Mar 2023',
    role: 'Becario',
    company: 'DGTIC — UNAM',
    description:
      'Sistemas web institucionales, diseño de bases de datos y documentación de requerimientos.',
  },
]
</script>

<template>
  <SectionWrapper id="sobre-mi">
    <div
      class="grid grid-cols-[.9fr_1.1fr] items-stretch gap-20 max-desk:grid-cols-[minmax(0,1fr)] max-desk:gap-8"
    >
      <div class="flex flex-col">
        <div class="mb-[18px] text-[11px] font-bold tracking-[.2em] text-eyebrow uppercase">
          Sobre mí
        </div>
        <h2
          class="m-0 text-[42px] leading-[1.08] font-extrabold tracking-[-.03em] text-white max-desk:text-[30px]"
        >
          Soluciones que se miden en resultados
        </h2>
        <div class="mt-auto grid gap-px border border-line-card bg-line-card">
          <div
            v-for="fact in facts"
            :key="fact.label"
            class="flex items-baseline justify-between gap-4 bg-card px-[22px] py-5"
          >
            <div class="flex items-center gap-2.5">
              <AboutIcon :name="fact.icon" />
              <div class="text-[10.5px] tracking-[.16em] text-dim uppercase">{{ fact.label }}</div>
            </div>
            <div class="text-[14.5px] text-fg">{{ fact.value }}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="mb-6 text-[11px] font-bold tracking-[.2em] text-dim uppercase">Trayectoria</div>
        <div class="flex flex-col">
          <div
            v-for="(job, i) in timeline"
            :key="job.period"
            class="grid grid-cols-[130px_1fr] gap-6 border-t border-line-card py-[22px] max-desk:grid-cols-[minmax(0,1fr)] max-desk:gap-2"
            :class="{ 'border-b': i === timeline.length - 1 }"
          >
            <div class="pt-[3px] text-[12.5px] text-label">{{ job.period }}</div>
            <div>
              <div class="text-[17px] font-bold text-white">{{ job.role }}</div>
              <div class="mt-[3px] text-[13.5px] text-accent">{{ job.company }}</div>
              <p class="mt-2.5 mb-0 text-sm leading-[1.65] text-muted">{{ job.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>
