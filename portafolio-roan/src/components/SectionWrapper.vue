<script setup lang="ts">
const spacingClass = {
  default: 'py-24',
  tight: 'py-[84px]',
  compact: 'py-[52px]',
}

withDefaults(
  defineProps<{
    id?: string
    surface?: boolean
    bordered?: boolean
    spacing?: 'default' | 'tight' | 'compact'
    eyebrow?: string
    title?: string
  }>(),
  { surface: false, bordered: true, spacing: 'default' },
)
</script>

<template>
  <section :id="id" :class="[{ 'border-b border-line': bordered, 'bg-surface': surface }]">
    <div
      class="mx-auto max-w-[1240px] px-10 max-desk:px-5 max-desk:py-14"
      :class="spacingClass[spacing]"
    >
      <div
        v-if="eyebrow || title || $slots.aside"
        class="mb-12 flex items-end justify-between gap-10 max-desk:flex-col max-desk:items-start max-desk:gap-4"
      >
        <div>
          <div
            v-if="eyebrow"
            class="mb-[18px] text-[11px] font-bold tracking-[.2em] text-eyebrow uppercase"
          >
            {{ eyebrow }}
          </div>
          <h2
            v-if="title"
            class="m-0 text-[42px] leading-[1.08] font-extrabold tracking-[-.03em] text-white max-desk:text-[30px]"
          >
            {{ title }}
          </h2>
        </div>
        <slot name="aside" />
      </div>
      <slot />
    </div>
  </section>
</template>
