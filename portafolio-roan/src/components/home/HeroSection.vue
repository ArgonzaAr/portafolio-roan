<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import angel from '@/assets/angel.jpg'

const stats = [
  { value: '5', label: 'años de experiencia' },
  { value: '56%', label: 'menos carga operativa' },
  { value: '+70%', label: 'más rápido en reportería' },
]
</script>

<template>
  <section id="home" class="relative overflow-hidden border-b border-line">
    <div
      class="pointer-events-none absolute -top-20 -right-[120px] size-[620px] bg-[radial-gradient(circle,rgba(31,111,235,.28),transparent_65%)]"
    ></div>
    <div
      class="relative mx-auto grid max-w-[1240px] grid-cols-[1.15fr_.85fr] items-center gap-[72px] px-10 pt-24 pb-[88px] max-desk:grid-cols-[minmax(0,1fr)] max-desk:gap-8 max-desk:px-5 max-desk:py-14"
    >
      <div v-reveal="0">
        <div class="mb-[26px] flex items-center gap-3">
          <span class="h-0.5 w-[34px] bg-accent-strong"></span>
          <span class="text-[11px] font-bold tracking-[.2em] text-eyebrow uppercase">
            CIUDAD DE MÉXICO
          </span>
        </div>
        <h1
          class="m-0 text-[70px] leading-[1.02] font-extrabold tracking-[-.035em] text-balance text-white max-desk:text-[clamp(34px,10vw,46px)]"
        >
          Desarrollador de Software <span class="text-accent">Fullstack</span>
        </h1>
        <p class="mt-7 mb-0 max-w-[480px] text-[17px] leading-[1.65] text-muted">
          Diseño y desarrollo sistemas web, automatizaciones y microservicios de extremo a extremo.
          Cinco años entregando soluciones medibles.
        </p>
        <div class="mt-[38px] flex gap-3.5">
          <BaseButton to="/#proyectos">Ver proyectos</BaseButton>
          <BaseButton to="/#contacto" variant="outline">Descargar CV</BaseButton>
        </div>
        <div class="mt-14 flex border-t border-line-card">
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            class="flex-1 pt-[22px]"
            :class="[
              i === 0 ? 'pr-6' : 'border-l border-line-card',
              i === 1 ? 'px-6' : '',
              i === 2 ? 'pl-6' : '',
            ]"
          >
            <div class="text-[34px] font-extrabold tracking-[-.03em] text-white">
              {{ stat.value }}
            </div>
            <div class="text-[12.5px] leading-[1.4] text-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
      <div v-reveal="1" class="relative">
        <div
          class="absolute top-[22px] -right-[22px] -bottom-[22px] left-[22px] border-2 border-accent-strong max-desk:hidden"
        ></div>
        <img
          :src="angel"
          alt="Angel Argonza"
          class="relative block aspect-[4/5] w-full object-cover"
        />
        <div
          class="absolute -bottom-6 -left-6 border border-line-img bg-code-bg px-5 py-4 font-mono text-xs leading-[1.7] text-code max-desk:static max-desk:mt-3.5"
        >
          <div class="text-dim">// developer.js</div>
          <div><span class="text-dim">const</span> dev = {</div>
          <div class="pl-3.5">rol: <span class="text-accent">'Fullstack'</span>,</div>
          <div class="pl-3.5">enfoque: <span class="text-accent">'automatizar'</span>,</div>
          <div class="pl-3.5">entrega: <span class="text-accent">'medible'</span></div>
          <div>};</div>
        </div>
      </div>
    </div>
  </section>
</template>
