<template>
  <header class="header" :class="{ 'sticky-header': isSticky }">
    <div class="header__container">
      <IconTheLogo class="header__logo"/>
      <nav class="header__nav header-nav">
        <NuxtLink
          v-for="(link) in links"
          :to="link.to"
          class="header-nav__link"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      <UiButtonTransparent label="Заказать звонок"/>
      <UiMobileMenu/>
    </div>
  </header>
</template>

<script setup lang="ts">

const {t} = useI18n();

const links = computed(() => [
  {
    label: t('Nav.portfolio'),
    to: '#portfolio',
  },
  {
    label: t('Nav.about_us'),
    to: '#about_us',
  },
  {
    label: t('Nav.services'),
    to: '#services',
  },
  {
    label: t('Nav.FAQ'),
    to: '#faq',
  }
])

const isSticky = ref(false);

</script>

<style scoped lang="scss">
.header{
  @apply py-8 relative;

  &__container{
    @apply flex gap-3 justify-between items-center;
  }

  &__logo{
    @apply relative z-30
  }

  &-nav{
    @apply flex gap-3 justify-between items-center;

    &__link{
      @apply p-2
    }
  }
}
</style>
