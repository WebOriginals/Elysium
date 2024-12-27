<template>
  <header class="header" :class="{ 'sticky-header': isSticky }">
    <div class="header__container">
      <IconTheLogo class="header__logo"/>
      <nav v-if="width > 840" class="header__nav header-nav">
        <NuxtLink
          v-for="(link) in $tm('Nav')"
          :to="$rt(link.to)"
          :key="$rt(link.to)"
          class="header-nav__link"
        >
          {{ $rt(link.label) }}
        </NuxtLink>
      </nav>
      <div class="grid grid-cols-[1fr_auto_auto] items-center gap-2">
        <UiButtonBlue v-if="width > 840" size="xl" block variant="outline" :label="$t('Buttons.request_a_call')"/>
        <UiColorModeButton/>
        <UiTheLangSwitcher class="header__langSelect langSelect"/>
        <UiMobileMenu v-if="width <= 840"/>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { width } = useGetWidth();

const isSticky = ref(false);

</script>

<style scoped lang="scss">
.header{
  @apply py-3 md:py-8 fixed top-0 left-0 w-full z-40;

  &__container{
    @apply flex gap-3 justify-between items-center relative ;

    &:after{
      content: '';
      position: absolute;
      width: calc(100% + 16px);
      height: calc(100% + 16px);
      margin-left:-8px;
      margin-top: -8px;
      left: 0;
      top: 0;
      border-radius: 50px;
      z-index: -1;
      @apply bg-white dark:bg-sky-950;
    }
  }

  &__logo{
    @apply relative z-30
  }

  &-nav{
    @apply flex gap-3 justify-between items-center;

    &__link{
      @apply p-2 relative after:content-[''];

      &:after {
        @apply absolute bottom-0 left-0 w-0 h-[2px] bg-sky-600  transition-all ease-in-out duration-300;
      }
      &:hover::after {
        @apply w-full;
      }
    }
  }
}
</style>
