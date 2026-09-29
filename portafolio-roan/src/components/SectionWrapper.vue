<script setup lang="ts">
const spacingClass = {
  default: 'tablet:py-16 desk:py-24',
  tight: 'tablet:py-16 desk:py-[84px]',
  compact: 'desk:py-[52px]',
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
      class="mx-auto max-w-[1240px] px-5 py-14 tablet:px-8 desk:px-10"
      :class="spacingClass[spacing]"
    >
      <div
        v-if="eyebrow || title || $slots.aside"
        class="mb-12 flex flex-col items-start gap-4 desk:flex-row desk:items-end desk:justify-between desk:gap-10"
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
            class="m-0 text-[30px] leading-[1.08] font-extrabold tracking-[-.03em] text-white tablet:text-[36px] desk:text-[42px]"
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
