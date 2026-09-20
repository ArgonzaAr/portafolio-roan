<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

interface FooterLink {
  label: string
  to?: RouteLocationRaw
  href?: string
}

withDefaults(defineProps<{ links?: FooterLink[] }>(), {
  links: () => [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/argonzaroan' },
    { label: 'GitHub', href: 'https://github.com/ArgonzaAr' },
    { label: 'Volver arriba', to: '/#home' },
  ],
})
</script>

<template>
  <footer class="border-t border-line">
    <div
      class="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-10 py-8 max-desk:flex-col max-desk:items-start max-desk:gap-4 max-desk:px-5"
    >
      <span class="text-[13px] text-dim">© 2026 Angel Rogelio Argonza Roblero</span>
      <div class="flex gap-6">
        <template v-for="link in links" :key="link.label">
          <RouterLink v-if="link.to" :to="link.to" class="text-[13px] text-muted">
            {{ link.label }}
          </RouterLink>
          <a v-else :href="link.href" class="text-[13px] text-muted">{{ link.label }}</a>
        </template>
      </div>
    </div>
  </footer>
</template>
