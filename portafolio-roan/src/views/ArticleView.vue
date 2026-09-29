<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import angel from '@/assets/angel.jpg'
import AppFooter from '@/components/AppFooter.vue'
import ArticleActions from '@/components/article/ArticleActions.vue'
import ArticleBlockView from '@/components/article/ArticleBlockView.vue'
import { articles } from '@/data'
import NotFoundView from './NotFoundView.vue'

const route = useRoute()

const article = computed(() => articles.find((a) => a.slug === route.params.slug))
const related = computed(() => articles.filter((a) => a.slug !== article.value?.slug).slice(0, 3))
</script>

<template>
  <NotFoundView v-if="!article" />
  <template v-else>
    <main>
      <section class="relative overflow-hidden border-b border-line">
        <div
          class="pointer-events-none absolute -top-[200px] -right-[120px] size-[600px] bg-[radial-gradient(circle,rgba(31,111,235,.22),transparent_65%)]"
        ></div>
        <div class="relative mx-auto max-w-[820px] px-5 pt-14 pb-[30px] tablet:px-8 desk:px-10">
          <RouterLink to="/blog" class="text-[13px] font-semibold text-label">
            ← Volver al blog
          </RouterLink>
          <div
            class="mt-8 flex flex-wrap gap-x-3.5 gap-y-1 text-[11px] tracking-[.14em] text-dim uppercase"
          >
            <span class="text-accent">{{ article.category }}</span>
            <span>{{ article.date }} · {{ article.readingMinutes }} min</span>
          </div>
          <h1
            class="m-0 mt-[18px] text-[clamp(34px,10vw,46px)] leading-[1.06] font-extrabold tracking-[-.035em] text-balance text-white desk:text-[48px]"
          >
            {{ article.title }}
          </h1>
          <div class="relative mt-9 flex items-center gap-3.5 border-t border-line-card pt-[26px]">
            <img :src="angel" alt="Angel Argonza" class="size-11 object-cover" />
            <div>
              <div class="text-sm font-bold text-fg">Angel Argonza</div>
              <div class="text-[12.5px] text-label">Desarrollador</div>
            </div>
          </div>
        </div>
      </section>
      <div class="mx-auto max-w-[820px] px-5 tablet:px-8 desk:px-10">
        <article class="pt-[5px] pb-20">
          <ArticleBlockView
            v-for="(block, i) in article.blocks"
            :key="block.id"
            :block="block"
            :lead="i === 0"
          />
          <ArticleActions />
        </article>
      </div>
      <section class="border-t border-line bg-surface">
        <div class="mx-auto max-w-[1240px] px-5 pt-16 pb-20 tablet:px-8 desk:px-10">
          <div class="mb-6 text-[11px] font-bold tracking-[.2em] text-dim uppercase">
            Sigue leyendo
          </div>
          <div
            class="grid grid-cols-[minmax(0,1fr)] gap-[22px] tablet:grid-cols-2 desk:grid-cols-3"
          >
            <RouterLink
              v-for="item in related"
              :key="item.slug"
              :to="`/blog/${item.slug}`"
              class="flex flex-col gap-3 border border-line-card bg-card p-[26px] text-inherit hover:border-accent/55 hover:bg-card-hover hover:text-inherit"
            >
              <div
                class="flex flex-wrap gap-x-3 gap-y-1 text-[11px] tracking-[.14em] text-dim uppercase"
              >
                <span class="text-accent">{{ item.category }}</span>
                <span>{{ item.date }} · {{ item.readingMinutes }} min</span>
              </div>
              <div class="text-lg leading-[1.3] font-bold text-white">{{ item.title }}</div>
              <span class="mt-1.5 text-[13px] font-bold text-accent">Leer artículo →</span>
            </RouterLink>
          </div>
        </div>
      </section>
    </main>
    <AppFooter
      :links="[
        { label: 'LinkedIn', href: 'https://linkedin.com/in/argonzaroan' },
        { label: 'GitHub', href: 'https://github.com/ArgonzaAr' },
        { label: 'Volver al blog', to: '/blog' },
      ]"
    />
  </template>
</template>
