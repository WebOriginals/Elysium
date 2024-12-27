<template>
  <div class="burger-menu">
    <div class="bg-overlay"  :class="{ 'is-active': isOpen, 'is-closing': isClosing }"  @click="toggleMenu"></div>
    <button class="burger-button" :class="{ 'is-active': isOpen }" @click="toggleMenu">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>
    <div class="menu-mobile"  :class="{ 'is-active': isOpen, 'is-closing': isClosing }">
      <div
        v-for="(link) in $tm('Nav')"
        :key="$rt(link.to)"
        class="menu-mobile__link"
        @click="toggleMenu($rt(link.to))">
        {{ $rt(link.label) }}
      </div>
      <UiButtonBlue  size="xl" block variant="outline" :label="$t('Buttons.request_a_call')"/>
      </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
const isClosing = ref(false);

/**
 * Метод для открытия/закрытия меню.
 * Если передан параметр `to`, выполняет плавный скролл к указанному якорю.
 * @param {string | undefined} to - Путь для скролла к якорю.
 */
const toggleMenu = (to?: string): void => {
  if (isOpen.value) {
    // Закрытие меню
    document.body.classList.remove('no-scroll');
    isClosing.value = true;
    setTimeout(() => {
      isOpen.value = false;
      isClosing.value = false;
    }, 400);// Задержка для анимации закрытия
    setTimeout(() => {
      // Выполнить скролл после закрытия меню, если указан якорь
      if (to) {
        scrollTo(to);
      }
    },500)
  } else {
    // Открытие меню
    isOpen.value = true;
    document.body.classList.add('no-scroll');
  }
};

/**
 * Метод для выполнения плавного скролла к указанному якорю.
 * @param {string} to - Идентификатор элемента (например, "#section").
 */
const scrollTo = (to: string): void => {
  const targetElement = document.querySelector(to);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>


<style scoped lang="scss">
.burger-menu {
  @apply relative grid-cols-subgrid;
}

.bg-overlay {
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-sky-950 rounded-full w-0 h-0 transition-all duration-300 z-10;

  &.is-active {
    @apply w-[500vw] h-[500vw];
  }

  &.is-closing {
    @apply delay-[250ms];
  }
}

.burger-button {
  @apply relative w-10 h-8 flex flex-col justify-between items-center cursor-pointer z-20;

  & .line {
    @apply w-10 h-1 bg-black dark:bg-white rounded transition-transform duration-300;
  }

  &.is-active {
    .line {
     @apply dark:bg-white;

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
  @apply invisible fixed top-0 left-0 w-full h-full z-10 grid items-center content-center gap-2.5 p-8 transition-all duration-300 delay-[250ms];

  &.is-active {
    @apply visible ;
  }

  &.is-closing {
    @apply invisible delay-[0ms];
  }

  &__link {
    @apply block w-full py-3 text-center cursor-pointer;
  }
}
</style>

