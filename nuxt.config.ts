// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui'
  ],

  content: {
    // Options
  },

  ssr: true,

  css: ['~/assets/css/tailwind.scss'],

  plugins: [
    '~/plugins/phoneMask.ts'
  ],

  devtools: {
    enabled: true
  },

  typescript: {
    strict: false
  },

  future: {
    compatibilityVersion: 4
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  compatibilityDate: '2024-07-11',
  extends: 'content-wind',
  experimental: {
    watcher: 'parcel'
  }
})
