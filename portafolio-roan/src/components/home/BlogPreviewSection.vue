<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SectionWrapper from '@/components/SectionWrapper.vue'
import { articles } from '@/data'

const latest = articles.slice(0, 2)
</script>

<template>
  <SectionWrapper id="blog" surface eyebrow="Blog" title="Notas de desarrollo">
    <template #aside>
      <RouterLink to="/blog" class="text-[13.5px] font-bold text-accent">
        Ver todas las entradas →
      </RouterLink>
    </template>
    <div class="grid grid-cols-2 gap-7 max-desk:grid-cols-[minmax(0,1fr)] max-desk:gap-8">
      <RouterLink
        v-for="(article, i) in latest"
        :key="article.slug"
        :to="`/blog/${article.slug}`"
        v-reveal="i"
        class="block border border-line-card bg-card px-[26px] pt-7 pb-[30px] text-inherit hover:border-accent/55 hover:text-inherit"
      >
        <div class="flex gap-3 text-[11px] tracking-[.14em] text-dim uppercase">
          <span class="text-accent">{{ article.category }}</span>
          <span>{{ article.date }}</span>
        </div>
        <div class="mt-4 text-lg leading-[1.3] font-bold text-white">{{ article.title }}</div>
        <p class="mt-3 mb-0 text-[13.5px] leading-[1.65] text-body">{{ article.excerpt }}</p>
      </RouterLink>
    </div>
  </SectionWrapper>
</template>
