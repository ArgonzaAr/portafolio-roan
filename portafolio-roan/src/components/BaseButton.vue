<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'outline'
    size?: 'sm' | 'md'
    to?: RouteLocationRaw
    href?: string
  }>(),
  { variant: 'primary', size: 'md' },
)

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))

const variantClass = computed(() =>
  props.variant === 'primary'
    ? 'bg-accent-strong text-white hover:bg-accent-hover hover:text-white'
    : 'border border-outline text-fg hover:text-fg',
)

const sizeClass = computed(() =>
  props.size === 'sm' ? 'px-5 py-2.5 text-[13px] tracking-[.01em]' : 'px-7 py-[15px] text-sm',
)
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :type="tag === 'button' ? 'button' : undefined"
    class="inline-block cursor-pointer font-sans font-bold"
    :class="[variantClass, sizeClass]"
  >
    <slot />
  </component>
</template>
