<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useArticleFilter } from '@/composables/useArticleFilter'
import { articleCategories, articles } from '@/data'

const [featured, ...rest] = articles
const { options, active, filtered, select } = useArticleFilter(rest, articleCategories)

const footerLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/argonzaroan' },
  { label: 'GitHub', href: 'https://github.com/ArgonzaAr' },
  { label: 'Volver al portafolio', to: '/' },
]
</script>

<template>
  <main>
    <section class="relative overflow-hidden border-b border-line">
      <div
        class="pointer-events-none absolute -top-[180px] -right-[100px] size-[600px] bg-[radial-gradient(circle,rgba(31,111,235,.24),transparent_65%)]"
      ></div>
      <div class="relative mx-auto max-w-[1240px] px-10 pt-20 pb-[60px] max-desk:px-5">
        <div class="mb-[22px] flex items-center gap-3">
          <span class="h-0.5 w-[34px] bg-accent-strong"></span>
          <span class="text-[11px] font-bold tracking-[.2em] text-eyebrow uppercase">Blog</span>
        </div>
        <h1
          class="m-0 max-w-[780px] text-[56px] leading-[1.04] font-extrabold tracking-[-.035em] text-balance text-white max-desk:text-[clamp(34px,10vw,46px)]"
        >
          Notas sobre desarrollo, automatización y datos
        </h1>
        <p class="mt-6 mb-0 max-w-[520px] text-[16.5px] leading-[1.7] text-muted">
          Apuntes de lo que voy resolviendo en proyectos reales.
        </p>
        <div class="mt-9 flex flex-wrap gap-2.5">
          <button
            v-for="option in options"
            :key="option"
            type="button"
            :aria-pressed="option === active"
            class="cursor-pointer border px-[18px] py-[9px] font-sans text-[13px] font-semibold"
            :class="
              option === active
                ? 'border-accent/60 bg-accent-strong/18 text-accent-soft'
                : 'border-line-strong bg-transparent text-muted'
            "
            @click="select(option)"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </section>

    <section v-if="featured" class="border-b border-line bg-surface">
      <div class="mx-auto max-w-[1240px] px-10 py-16 max-desk:px-5">
        <div class="mb-6 text-[11px] font-bold tracking-[.2em] text-dim uppercase">Destacado</div>
        <RouterLink
          :to="`/blog/${featured.slug}`"
          class="grid grid-cols-[1fr_1.05fr] border border-line-card bg-card text-inherit hover:border-accent/55 hover:text-inherit max-desk:grid-cols-[minmax(0,1fr)] max-desk:gap-8"
        >
          <div
            class="flex min-h-[330px] items-end bg-[repeating-linear-gradient(135deg,#0e1a2d_0_12px,#0c1626_12px_24px)] p-[18px]"
          >
            <span class="text-[11px] tracking-[.14em] text-dim uppercase">Imagen de portada</span>
          </div>
          <div class="px-[42px] py-11 max-desk:px-5">
            <div class="flex gap-3.5 text-[11px] tracking-[.14em] text-dim uppercase">
              <span class="text-accent">{{ featured.category }}</span>
              <span>{{ featured.date }} · {{ featured.readingMinutes }} min de lectura</span>
            </div>
            <h2
              class="m-0 mt-[18px] text-[32px] leading-[1.16] font-extrabold tracking-[-.028em] text-white"
            >
              {{ featured.title }}
            </h2>
            <p class="mt-[18px] mb-0 text-[15px] leading-[1.72] text-muted">
              {{ featured.excerpt }}
            </p>
            <span class="mt-[26px] inline-block text-sm font-bold text-accent">
              Leer artículo →
            </span>
          </div>
        </RouterLink>
      </div>
    </section>

    <section>
      <div class="mx-auto max-w-[1240px] px-10 pt-16 pb-20 max-desk:px-5">
        <div class="mb-6 text-[11px] font-bold tracking-[.2em] text-dim uppercase">
          Todas las entradas
        </div>
        <div class="grid grid-cols-3 gap-[22px] max-desk:grid-cols-2">
          <RouterLink
            v-for="article in filtered"
            :key="article.slug"
            :to="`/blog/${article.slug}`"
            class="flex flex-col border border-line-card bg-card text-inherit hover:border-accent/55 hover:bg-card-hover hover:text-inherit"
          >
            <div
              class="flex aspect-[16/9] items-end border-b border-line-card bg-[repeating-linear-gradient(135deg,#0e1a2d_0_12px,#0c1626_12px_24px)] p-3.5"
            >
              <span class="text-[10.5px] tracking-[.14em] text-dim uppercase">
                Imagen de portada
              </span>
            </div>
            <div class="flex flex-1 flex-col gap-3 px-[26px] pt-[26px] pb-[30px]">
              <div class="flex gap-3 text-[11px] tracking-[.14em] text-dim uppercase">
                <span class="text-accent">{{ article.category }}</span>
                <span>{{ article.date }} · {{ article.readingMinutes }} min</span>
              </div>
              <div class="text-lg leading-[1.3] font-bold text-white">{{ article.title }}</div>
              <p class="m-0 text-[13.5px] leading-[1.65] text-body">{{ article.excerpt }}</p>
              <span class="mt-auto text-[13px] font-bold text-accent">Leer artículo →</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="border-t border-line bg-surface">
      <div
        class="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-12 px-10 py-[60px] max-desk:px-5"
      >
        <div>
          <h2 class="m-0 text-[28px] leading-[1.2] font-extrabold tracking-[-.028em] text-white">
            Recibe las notas nuevas por correo
          </h2>
          <p class="mt-3 mb-0 max-w-[460px] text-[14.5px] leading-[1.7] text-body">
            Un correo al mes, sin promociones. Solo el artículo nuevo.
          </p>
        </div>
        <div
          class="flex gap-3 max-desk:w-full max-desk:flex-wrap max-desk:*:min-w-0 max-desk:*:flex-[1_1_100%]"
        >
          <input
            type="email"
            placeholder="tucorreo@dominio.com"
            aria-label="Correo"
            class="w-[280px] border border-line-input bg-bg px-4 py-3.5 text-[14.5px] text-fg"
          />
          <BaseButton class="px-7 py-3.5">Suscribirme</BaseButton>
        </div>
      </div>
    </section>
  </main>
  <AppFooter :links="footerLinks" />
</template>
