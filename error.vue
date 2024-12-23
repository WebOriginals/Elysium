<template>
  <NuxtLayout>
    <div class="not-found">
      <div class="not-found__container">
        <div class="not-found__content">
          <div class="not-found__image">

          </div>
          <div class="not-found__title">{{ $t('NotFoundPage.title') }}</div>
          <div class="not-found__info">
            {{ $t('NotFoundPage.info') }}
          </div>
          <div class="not-found__links">
            <NuxtLink to="/" class="not-found__link">{{ $t('NotFoundPage.link') }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup></script>
<style lang="scss" scoped>

</style>
