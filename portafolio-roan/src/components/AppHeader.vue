<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BaseButton from './BaseButton.vue'
import LogoMark from './icons/LogoMark.vue'

const route = useRoute()

const isMenuOpen = ref(false)

const links = computed(() => [
  { label: 'Home', to: '/#home', active: route.path === '/' },
  { label: 'Sobre mí', to: '/#sobre-mi', active: false },
  { label: 'Servicios', to: '/#servicios', active: false },
  { label: 'Proyectos', to: '/#proyectos', active: false },
  { label: 'Blog', to: '/blog', active: route.path.startsWith('/blog') },
])

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line bg-bg/88 backdrop-blur-[12px]">
    <div
      class="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-3.5 tablet:px-8 desk:h-[74px] desk:justify-start desk:gap-10 desk:px-10 desk:py-0"
    >
      <RouterLink to="/#home" class="flex items-center gap-2 text-fg hover:text-fg">
        <LogoMark :size="22" />
        <span class="text-[19px] font-extrabold tracking-[-.02em]">Angel Argonza</span>
      </RouterLink>

      <!-- Menú hamburguesa: móvil y tablet (<861px) -->
      <button
        type="button"
        class="-mr-2.5 flex size-11 cursor-pointer items-center justify-center text-fg desk:hidden"
        aria-controls="menu-movil"
        :aria-expanded="isMenuOpen"
        :aria-label="isMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
        data-test="menu-toggle"
        @click="toggleMenu"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path v-if="isMenuOpen" d="M6 6l12 12M18 6L6 18" />
          <path v-else d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <!-- Navbar horizontal: escritorio (>=861px) -->
      <nav class="ml-auto hidden items-center gap-[30px] desk:flex">
        <RouterLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="text-[13.5px] font-medium"
          :class="link.active ? 'text-fg' : 'text-muted'"
        >
          {{ link.label }}
        </RouterLink>
        <BaseButton to="/#contacto" size="sm" class="ml-2">Trabajemos juntos</BaseButton>
      </nav>
    </div>

    <!-- Panel desplegable: empuja el contenido, no es overlay -->
    <nav
      v-show="isMenuOpen"
      id="menu-movil"
      aria-label="Menú principal"
      class="border-t border-line desk:hidden"
      data-test="menu-panel"
    >
      <div class="mx-auto flex max-w-[1240px] flex-col px-5 pt-2 pb-5 tablet:px-8">
        <RouterLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="py-3 text-[15px] font-medium"
          :class="link.active ? 'text-fg' : 'text-muted'"
          @click="closeMenu"
        >
          {{ link.label }}
        </RouterLink>
        <BaseButton to="/#contacto" size="sm" class="mt-3 self-start" @click="closeMenu">
          Trabajemos juntos
        </BaseButton>
      </div>
    </nav>
  </header>
</template>
