<template>
  <div class="burger-menu">
    <div class="bg-overlay" :class="{ 'is-active': isOpen }" @click="toggleMenu"></div>
    <button class="burger-button" :class="{ 'is-active': isOpen }" @click="toggleMenu">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>
    <div class="menu-mobile" :class="{ 'is-active': isOpen }">
      <NuxtLink
        v-for="(link) in $tm('Nav')"
        :to="$rt(link.to)"
        :key="$rt(link.to)"
        class="menu-mobile__link"
        @click="toggleMenu" >
        {{ $rt(link.label) }}
      </NuxtLink>
      <UiButtonTransparent block :label="$t('Buttons.request_a_call')"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
}
</script>

<style scoped lang="scss">
.burger-menu {
  @apply relative;
}

.bg-overlay {
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-0 h-0 transition-all duration-300 z-10;

  &.is-active {
    @apply w-[500vw] h-[500vw];
  }
}

.burger-button {
  @apply relative w-10 h-8 flex flex-col  justify-between items-center cursor-pointer z-20;

  & .line {
    @apply w-10 h-1 bg-black rounded transition-transform duration-300;
  }

  &.is-active {
    .line {
      &:nth-child(1) {
        transform: rotate(39deg) translate(8px, 10px);
        width: 3rem;
      }

      &:nth-child(2) {
        @apply opacity-0;
      }

      &:nth-child(3) {
        transform: rotate(-40deg) translate(9px, -11px);
        width: 3rem;
      }
    }
  }
}

.menu-mobile {
  @apply invisible fixed top-0 left-0 w-full h-full z-10 grid items-center content-center gap-2.5 p-8 transition-all duration-300 delay-[200ms] ;

  &.is-active {
    @apply  visible ;
  }

  &__link{
    @apply block w-full py-3 text-center;
  }
}
</style>
