<template>
  <header :class="['header', { 'fixed-on': isFixed, 'visible': showHeader }]">
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


// Состояния
const showHeader = ref(false); // Видимость шапки
const isFixed = ref(false); // Фиксация шапки
const lastScrollPosition = ref(0); // Предыдущая позиция прокрутки

const handleScroll = () => {
  const scrollY = window.scrollY;

  // Если на самом верху, сброс всех состояний
  if (scrollY === 0) {
    showHeader.value = false;
    isFixed.value = false;
    return;
  }

  // Если скролл ниже порогового значения, включаем логику
  const threshold = 112;
  if (scrollY > threshold) {
    isFixed.value = true;
    showHeader.value = scrollY < lastScrollPosition.value; // true, если скролл вверх
  } else {
    // Если скролл меньше порога
    isFixed.value = false;
    showHeader.value = false;
  }

  lastScrollPosition.value = scrollY; // Обновляем позицию скролла
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.header{
  @apply py-3 md:py-8 absolute top-0 left-0 w-full z-40;

  &.fixed-on {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 40;
    @apply md:py-2 bg-white;
  }
  &.fixed-on:not(.visible) {
    transform: translateY(-100%);
    opacity: 0;
  }
  &__container{
    @apply flex gap-3 justify-between items-center relative ;

    //&:after{
    //  content: '';
    //  position: absolute;
    //  width: calc(100% + 16px);
    //  height: calc(100% + 16px);
    //  margin-left:-8px;
    //  margin-top: -8px;
    //  left: 0;
    //  top: 0;
    //  border-radius: 50px;
    //  z-index: -1;
    //  @apply bg-white dark:bg-sky-950;
    //}
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
