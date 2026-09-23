<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 24 })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 512 512"
    fill="none"
    aria-hidden="true"
    class="shrink-0"
  >
    <defs>
      <linearGradient id="logo-mark-grad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="var(--color-accent-soft)" />
        <stop offset="1" stop-color="var(--color-accent-strong)" />
      </linearGradient>
    </defs>

    <g stroke="url(#logo-mark-grad)" stroke-width="40" stroke-linecap="round" stroke-linejoin="round">
      <!-- Ángulo izquierdo '<' -->
      <path d="M 160 176 L 80 256 L 160 336" />
      <!-- Barra '/' -->
      <path d="M 280 168 L 232 368" />
      <!-- Ángulo derecho '>' -->
      <path d="M 352 176 L 432 256 L 352 336" />
    </g>

    <!-- Detalle único: nodo de acento que marca el inicio de la diagonal -->
    <circle cx="280" cy="144" r="18" fill="var(--color-accent)" />
  </svg>
</template>
