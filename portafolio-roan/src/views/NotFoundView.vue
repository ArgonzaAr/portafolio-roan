<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <main class="mx-auto max-w-[1240px] px-10 py-24 max-desk:px-5 max-desk:py-14">
    <div class="mb-[18px] text-[11px] font-bold tracking-[.2em] text-eyebrow uppercase">
      Error 404
    </div>
    <h1
      class="m-0 mb-4 text-[clamp(34px,10vw,46px)] leading-[1.08] font-extrabold tracking-[-.03em] text-white desk:text-[52px]"
    >
      Página no encontrada
    </h1>
    <p class="mb-8 max-w-[520px] text-base leading-[1.65] text-muted">
      La dirección que buscas no existe o fue movida.
    </p>
    <BaseButton to="/">Volver al inicio</BaseButton>
  </main>
  <AppFooter />
</template>
