<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

const BASE_LIKES = 128

const liked = ref(false)
const copied = ref(false)
const likes = computed(() => BASE_LIKES + (liked.value ? 1 : 0))
let copiedTimer: ReturnType<typeof setTimeout> | undefined

function toggleLike() {
  liked.value = !liked.value
}

function share() {
  const url = window.location.href
  if (navigator.share) {
    navigator.share({ url }).catch(() => {})
    return
  }
  if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {})
  copied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => (copied.value = false), 2000)
}

onBeforeUnmount(() => clearTimeout(copiedTimer))
</script>

<template>
  <div
    class="mt-11 flex flex-wrap items-center justify-between gap-6 border border-line-card bg-card px-6 py-[22px]"
  >
    <span class="text-[13.5px] text-body">¿Te sirvió este artículo?</span>
    <div class="flex items-center gap-2.5">
      <button
        type="button"
        :aria-pressed="liked"
        class="flex cursor-pointer items-center gap-[9px] border px-[18px] py-[11px] font-sans text-[13px] font-bold hover:border-accent/70"
        :class="
          liked
            ? 'border-accent/60 bg-accent-strong/18 text-accent-soft'
            : 'border-line-strong bg-transparent text-muted'
        "
        @click="toggleLike"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          class="flex-none"
          :class="liked ? 'fill-accent' : 'fill-none'"
        >
          <path
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          />
        </svg>
        <span>{{ likes }}</span>
      </button>
      <button
        type="button"
        class="flex cursor-pointer items-center gap-[9px] border border-line-strong bg-transparent px-[18px] py-[11px] font-sans text-[13px] font-bold text-muted hover:border-accent/70 hover:text-fg"
        @click="share"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          class="flex-none"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
        <span>{{ copied ? 'Enlace copiado' : 'Compartir' }}</span>
      </button>
    </div>
  </div>
</template>
