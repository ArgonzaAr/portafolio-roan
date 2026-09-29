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
      class="mx-auto flex max-w-[1240px] flex-col items-start gap-4 px-5 py-8 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-6 tablet:px-8 desk:px-10"
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
