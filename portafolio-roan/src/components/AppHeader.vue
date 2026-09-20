<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BaseButton from './BaseButton.vue'

const route = useRoute()

const links = computed(() => [
  { label: 'Home', to: '/#home', active: route.path === '/' },
  { label: 'Sobre mí', to: '/#sobre-mi', active: false },
  { label: 'Servicios', to: '/#servicios', active: false },
  { label: 'Proyectos', to: '/#proyectos', active: false },
  { label: 'Blog', to: '/blog', active: route.path.startsWith('/blog') },
])
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line bg-bg/88 backdrop-blur-[12px]">
    <div
      class="mx-auto flex h-[74px] max-w-[1240px] items-center gap-10 px-10 max-desk:block max-desk:h-auto max-desk:px-5 max-desk:py-3.5"
    >
      <RouterLink to="/#home" class="flex items-baseline gap-2.5 text-fg hover:text-fg">
        <span class="text-[19px] font-extrabold tracking-[-.02em]">Angel Argonza</span>
      </RouterLink>
      <nav
        class="ml-auto flex items-center gap-[30px] max-desk:mt-3 max-desk:ml-0 max-desk:gap-5 max-desk:overflow-x-auto max-desk:pb-1.5"
      >
        <RouterLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="text-[13.5px] font-medium max-desk:flex-none max-desk:whitespace-nowrap"
          :class="link.active ? 'text-fg' : 'text-muted'"
        >
          {{ link.label }}
        </RouterLink>
        <BaseButton
          to="/#contacto"
          size="sm"
          class="ml-2 max-desk:ml-0 max-desk:flex-none max-desk:px-4 max-desk:whitespace-nowrap"
        >
          Trabajemos juntos
        </BaseButton>
      </nav>
    </div>
  </header>
</template>
