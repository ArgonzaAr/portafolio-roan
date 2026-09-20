<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <svg
    v-if="name === 'JavaScript'"
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="text-accent"
  >
    <path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z" />
    <path d="M7.5 8h3v8l-2 -1" />
    <path
      d="M16.5 8h-2.5a.5 .5 0 0 0 -.5 .5v3a.5 .5 0 0 0 .5 .5h1.423a.5 .5 0 0 1 .495 .57l-.418 2.93l-2 .5"
    />
  </svg>
  <svg
    v-else-if="name === 'Python'"
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="text-accent"
  >
    <path d="M12 9h-7a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h3" />
    <path d="M12 15h7a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-3" />
    <path
      d="M8 9v-4a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v5a2 2 0 0 1 -2 2h-4a2 2 0 0 0 -2 2v5a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4"
    />
    <path d="M11 6l0 .01" />
    <path d="M13 18l0 .01" />
  </svg>
  <svg
    v-else-if="name === 'C#'"
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="text-accent"
  >
    <path d="M4 9h16M4 15h16" />
    <path d="M10 3L8 21M16 3l-2 18" />
  </svg>
  <svg
    v-else-if="name === 'PHP'"
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="text-accent"
  >
    <path d="M12 12m-10 0a10 9 0 1 0 20 0a10 9 0 1 0 -20 0" />
    <path
      d="M5.5 15l.395 -1.974l.605 -3.026h1.32a1 1 0 0 1 .986 1.164l-.167 1a1 1 0 0 1 -.986 .836h-1.653"
    />
    <path
      d="M15.5 15l.395 -1.974l.605 -3.026h1.32a1 1 0 0 1 .986 1.164l-.167 1a1 1 0 0 1 -.986 .836h-1.653"
    />
    <path d="M12 7.5l-1 5.5" />
    <path d="M11.6 10h2.4l-.5 3" />
  </svg>
  <svg
    v-else-if="name === 'Vue.js'"
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="text-accent"
  >
    <path d="M16.5 4l-4.5 8l-4.5 -8" />
    <path d="M3 4l9 16l9 -16" />
  </svg>
  <svg
    v-else-if="name === 'Node.js'"
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="text-accent"
  >
    <path
      d="M9 9v8.044a2 2 0 0 1 -2.996 1.734l-1.568 -.9a3 3 0 0 1 -1.436 -2.561v-6.635a3 3 0 0 1 1.436 -2.56l6 -3.667a3 3 0 0 1 3.128 0l6 3.667a3 3 0 0 1 1.436 2.561v6.634a3 3 0 0 1 -1.436 2.56l-6 3.667a3 3 0 0 1 -3.128 0"
    />
    <path d="M17 9h-3.5a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3.5" />
  </svg>
  <svg
    v-else-if="name === 'Django'"
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="text-accent"
  >
    <path d="M3 3m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
    <path d="M12 7v8.5l-2.015 .201a2.715 2.715 0 1 1 0 -5.402l2.015 .201" />
    <path d="M16 7v.01" />
    <path d="M16 10v5.586c0 .905 -.36 1.774 -1 2.414" />
  </svg>
  <svg
    v-else-if="name === '.NET'"
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="text-accent"
  >
    <path
      d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
    />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
  <svg
    v-else-if="name === 'MySQL'"
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="text-accent"
  >
    <path
      d="M13 21c-1.427 -1.026 -3.59 -3.854 -4 -6c-.486 .77 -1.501 2 -2 2c-1.499 -.888 -.574 -3.973 0 -6c-1.596 -1.433 -2.468 -2.458 -2.5 -4c-3.35 -3.44 -.444 -5.27 2.5 -3h1c8.482 .5 6.421 8.07 9 11.5c2.295 .522 3.665 2.254 5 3.5c-2.086 -.2 -2.784 -.344 -3.5 0c.478 1.64 2.123 2.2 3.5 3"
    />
    <path d="M9 7h.01" />
  </svg>
  <svg
    v-else-if="name === 'SQL Server'"
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="text-accent"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
</template>
