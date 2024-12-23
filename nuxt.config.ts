// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve, dirname } from 'node:path';
import en from './locales/en.json';
import ru from './locales/ru.json';
export default defineNuxtConfig({
  $development: undefined,
  $env: undefined,
  $meta: undefined,
  $production: undefined,
  $test: undefined,


  css: ['~/assets/scss/tailwind.scss'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/ui',
    'nuxt-swiper',
    '@vueuse/nuxt',
    '@nuxtjs/svg-sprite',
    'dayjs-nuxt',
  ],

  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },

  pinia: {
    autoImports: ['defineStore'],
  },

  i18n: {
    langDir: 'locales',
    strategy: 'prefix',
    dynamicRouteParams: false,
    compilation: {
      strictMessage: false,
    },
    messages: {
      en,
      ru,
    },
    locales: [
      {
        flag: 'https://pvaboom.s3.eu-central-1.amazonaws.com/assets/img/country/0.svg',
        code: 'ru',
        iso: 'ru_RU',
        name: 'Русский',
        file: 'ru.json',
      },
      {
        flag: 'https://pvaboom.s3.eu-central-1.amazonaws.com/assets/img/country/16.svg',
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
      },
    ],

    defaultLocale: 'ru',
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  extends: 'content-wind',
  experimental: {
    watcher: 'parcel',
  },
});
