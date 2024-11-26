<script setup lang="ts">
import BaseHeader from "~~/components/BaseHeader.vue";
import BaseAsideLinks from "~~/components/BaseAsideLinks.vue";

const nuxtApp = useNuxtApp()
const {activeHeadings, updateHeadings} = useScrollspy()

const links = computed(() => [
  {
    label: 'Особенности',
    to: '#features',
    icon: 'i-heroicons-cube-transparent',
    active: activeHeadings.value.includes('features') && !activeHeadings.value.includes('pricing')
  },
  {
    label: 'Работы',
    to: '#portfolio',
    icon: 'i-heroicons-credit-card',
    active: activeHeadings.value.includes('pricing') && !activeHeadings.value.includes('testimonials')
  },
  {
    label: 'Рецензии',
    to: '#testimonials',
    icon: 'i-heroicons-academic-cap',
    active: activeHeadings.value.includes('testimonials')
  },
  {
    label: 'FAQ',
    to: '#faq',
    icon: 'i-heroicons-question-mark-circle',
    active: activeHeadings.value.includes('faq')
  }
])

nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#features'),
    document.querySelector('#portfolio'),
    document.querySelector('#testimonials'),
    document.querySelector('#faq')
  ])
})

const makeCall = () => {
  window.location.href = 'tel:+79885242737'
}
</script>

<template>
  <BaseHeader :links="links">
    <template #logo>
      Elysium
    </template>

    <template #right>
      <ColorMode size="sm"/>

      <UButton
        label="Позвонить"
        color="primary"
        variant="soft"
        trailing-icon="i-heroicons-device-phone-mobile"
        class="hidden lg:flex"
        @click="makeCall"
      />
    </template>

    <template #panel>
      <BaseAsideLinks :links="links"/>

      <UDivider class="my-6"/>

      <UButton
        label="Позвонить"
        color="white"
        block
        class="mb-3"
        @click="makeCall"
      />
    </template>
  </BaseHeader>
</template>
