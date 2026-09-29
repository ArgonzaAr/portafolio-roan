<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'

const labelClass = 'text-[11px] font-bold tracking-[.16em] text-label uppercase'
const fieldClass = 'border border-line-input bg-bg px-3.5 py-[13px] text-[14.5px] text-fg'
</script>

<template>
  <SectionWrapper id="contacto" :bordered="false" spacing="tight">
    <div
      class="grid grid-cols-[minmax(0,1fr)] items-center gap-8 tablet:gap-10 desk:grid-cols-[.85fr_1.15fr] desk:gap-[72px]"
    >
      <div v-reveal="0">
        <div class="mb-[18px] text-[11px] font-bold tracking-[.2em] text-eyebrow uppercase">
          Contacto
        </div>
        <h2
          class="m-0 text-[30px] leading-[1.04] font-extrabold tracking-[-.035em] text-white tablet:text-[42px] desk:text-[54px]"
        >
          ¿Tienes un proyecto en mente?
        </h2>
      </div>
      <div
        v-reveal="1"
        class="border border-line-card bg-card px-6 pt-7 pb-8 tablet:px-[34px] tablet:pt-[34px] tablet:pb-9"
      >
        <div
          class="grid grid-cols-[minmax(0,1fr)] gap-8 tablet:grid-cols-2 tablet:gap-x-5 tablet:gap-y-[18px]"
        >
          <div class="flex flex-col gap-2">
            <label for="v1-nombre" :class="labelClass">Nombre</label>
            <input id="v1-nombre" type="text" placeholder="Tu nombre" :class="fieldClass" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="v1-mail" :class="labelClass">Correo</label>
            <input
              id="v1-mail"
              type="email"
              placeholder="tucorreo@dominio.com"
              :class="fieldClass"
            />
          </div>
          <div class="col-span-full flex flex-col gap-2">
            <label for="v1-msg" :class="labelClass">Mensaje</label>
            <textarea
              id="v1-msg"
              rows="4"
              placeholder="Describe brevemente tu proyecto"
              class="resize-y"
              :class="fieldClass"
            ></textarea>
          </div>
          <BaseButton class="col-span-full justify-self-start px-[30px] py-[15px]">
            Enviar mensaje
          </BaseButton>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>
