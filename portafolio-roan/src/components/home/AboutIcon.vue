<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <svg
    v-if="name === 'pin'"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="text-accent flex-none"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
  <svg
    v-else-if="name === 'monitor'"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="text-accent flex-none"
  >
    <rect x="2" y="4" width="20" height="13" rx="1" />
    <path d="M8 21h8M12 17v4" />
  </svg>
  <svg
    v-else-if="name === 'calendar'"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="text-accent flex-none"
  >
    <path d="M8 2v4M16 2v4" />
    <rect x="3" y="5" width="18" height="16" rx="1" />
    <path d="M3 11h18M9 16l2 2 4-4" />
  </svg>
  <svg
    v-else-if="name === 'code'"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="text-accent flex-none"
  >
    <path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" />
  </svg>
</template>
