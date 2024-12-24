<template>
  <header class="header" :class="{ 'sticky-header': isSticky }">
    <div class="header__container">
      <IconTheLogo class="header__logo"/>
      <nav v-if="width > 768" class="header__nav header-nav">
        <NuxtLink
          v-for="(link) in $tm('Nav')"
          :to="$rt(link.to)"
          :key="$rt(link.to)"
          class="header-nav__link"
        >
          {{ $rt(link.label) }}
        </NuxtLink>
      </nav>
      <UiButtonTransparent v-if="width > 768" :label="$t('Buttons.request_a_call')"/>
      <UiTheLangSwitcher v-if="width > 768" class="langSelect"/>
      <UiMobileMenu v-if="width <= 768"/>
    </div>
  </header>
</template>

<script setup lang="ts">
const { width } = useGetWidth();

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
