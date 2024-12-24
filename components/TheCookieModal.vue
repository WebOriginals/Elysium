<template>
  <div class="cookie" v-if="showCookie">
    <div class="cookie__body">
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        class="cookie__close"
        size="xl"
        @click="closeCookie"
      />
      <div class="cookie__wrapper">
        <div class="cookie__content">
          <div class="cookie__title">
            <h5>{{ $t('Cookie.title') }}</h5>
          </div>
          <div class="cookie__text cookie-text">
            <p v-if="isShowSettings">
              {{ $t('Cookie.description') }}
              <a href="#">{{ $t('Cookie.link') }}</a>
            </p>
            <div v-else class="cookie-text__checkbox">
              <div class="cookie-text__checkbox-group">
                <input type="checkbox" id="cookie1" value="cookie1" v-model="checkedNames" />
                <label for="cookie1">{{ $t('Cookie.min') }}</label>
              </div>
              <div class="cookie-text__checkbox-group">
                <input type="checkbox" id="cookie2" value="cookie2" v-model="checkedNames" />
                <label for="cookie2">{{ $t('Cookie.mid') }}</label>
              </div>
              <div class="cookie-text__checkbox-group">
                <input type="checkbox" id="cookie3" value="cookie3" v-model="checkedNames" />
                <label for="cookie3">{{ $t('Cookie.ceo') }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="cookie__button">
          <UiButtonBlue v-if="isShowSettings" size="xl" block :label="$t('Cookie.btn_accept_all')" @click="closeCookie" />
          <UiButtonTransparent
            block
            v-if="isShowSettings"
            size="xl"
            :label="$t('Cookie.btn_settings')"
            @click="isShowSettings = !isShowSettings"
          />
          <UiButtonBlue v-else size="xl" block :label="$t('Cookie.btn_accept')" @click="closeCookie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCookie } from '#app';
const showCookie = useCookie('showCookie');
const isShowSettings = ref(true);
const checkedNames = ref(['cookie1', 'cookie2', 'cookie3']);

onMounted(() => {
  if (showCookie.value === null || showCookie.value === undefined) {
    showCookie.value = true;
  }
});
const closeCookie = () => (showCookie.value = false);
</script>

<style scoped lang="scss">
.cookie {
  @apply fixed bottom-11 flex justify-center w-full px-4 z-10;

  &__body {
    @apply bg-white rounded-2xl px-4 md:px-16 py-4 md:py-11 max-w-[938px] border border-sky-200  shadow-[0_0px_24px_0px_rgba(0,0,0,0.08)] relative;
  }

  &__close {
    @apply absolute top-1 right-1;
  }

  &__wrapper {
    @apply grid gap-4 md:grid-cols-[1fr_240px] md:gap-20;
  }

  &__content {
    @apply grid gap-4;
  }

  &__title {
    @apply dark:text-black;
  }

  &-text {
    p {
      @apply text-sm text-stone-500;
    }
    a {
      @apply text-sky-500;
    }

    &__checkbox {
      &-group {
        @apply flex gap-2 dark:text-black items-center;
      }
    }
  }

  &__button {
    @apply grid gap-2 items-center;
  }
}
</style>
