<script setup lang="ts">
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
    label: 'Цена',
    to: '#pricing',
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
    document.querySelector('#pricing'),
    document.querySelector('#testimonials'),
    document.querySelector('#faq')
  ])
})
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      Elysium
    </template>

    <template #right>
      <UColorModeButton size="sm"/>

      <UButton
        label="Заказать звонок"
        color="white"
        variant="soft"
        trailing-icon="i-heroicons-device-phone-mobile"
        class="hidden lg:flex"
        href="tel.:+79885242737"
      />
    </template>

    <template #panel>
      <UAsideLinks :links="links"/>

      <UDivider class="my-6"/>
      <UColorModeButton size="sm"/>
      <UButton
        label="Заказать звонок"
        color="white"
        block
        class="mb-3"
        href="tel:+79885242737"
      />
      <UButton
        label="Get started"
        block
      />
    </template>
  </UHeader>
</template>
