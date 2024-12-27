<template>
  <div class="wrapper" :class="{ lock: lockScrollValue }">
    <TheHeader @lock-scroll="lockScroll" />
    <main class="page pt-28">
      <slot></slot>
    </main>
    <TheFooter></TheFooter>

    <TheCookieModal />
  </div>
</template>

<script setup>
import TheCookieModal from '~/components/TheCookieModal.vue';

const head = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
});
useHead({
  htmlAttrs: {
    lang: head.value.htmlAttrs.lang,
    dir: head.value.htmlAttrs.dir,
  },
  meta: [
    { name: 'yandex-verification', content: import.meta.env.VITE_YANDEX_METRIKA },
    { name: 'google-site-verification', content: import.meta.env.VITE_GOOGLE_METRIKA },
    { name: 'cryptomus', content: import.meta.env.VITE_CRYPTOMUS },
  ],
  noscript: [
    {
      children:
        ' <div><img src="https://mc.yandex.ru/watch/97379285" style="position: absolute; left: -9999px" alt="" /></div>',
      body: true,
    },
  ],
  link: [
    {
      rel: `stylesheet`,
      href: `https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css`,
    },
  ],
  script: [
    {
      src: `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_ID_GOOGLE_TAG}`,
      tagPosition: 'head',
    },
    {
      src: '/js/googleMetrika.js',
      tagPosition: 'head',
    },
    {
      src: '/js/yandexMetrika.js',
      tagPosition: 'head',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js',
      tagPosition: 'head',
    },
  ],
});

const lockScrollValue = ref(false);
const lockScroll = (value) => {
  lockScrollValue.value = value.value;
};
</script>

<style lang="scss">
.wrapper {
  @apply overflow-hidden flex min-h-screen flex-col;

  > main {
    @apply flex-auto pb-16;
  }

  &.lock {
    @apply h-screen;
  }
}
</style>
