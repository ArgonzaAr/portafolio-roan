<script setup lang="ts">
import SectionWrapper from '@/components/SectionWrapper.vue'
import { services } from '@/data'
import ServiceIcon from './ServiceIcon.vue'
</script>

<template>
  <SectionWrapper id="servicios" surface eyebrow="Servicios" title="Lo que puedo construir para ti">
    <div class="grid grid-cols-5 gap-px border border-line-card bg-line-card max-desk:grid-cols-2">
      <div
        v-for="(service, i) in services"
        :key="service.id"
        v-reveal="i"
        class="min-h-[230px] bg-card px-6 pt-[30px] pb-[34px] hover:bg-card-hover"
      >
        <div class="mb-6 flex justify-center">
          <ServiceIcon :name="service.id" />
        </div>
        <div class="text-center text-[16.5px] leading-[1.25] font-bold text-white">
          {{ service.title }}
        </div>
        <p class="mt-3 mb-0 text-[13.5px] leading-[1.65] text-body">{{ service.description }}</p>
      </div>
    </div>
  </SectionWrapper>
</template>
