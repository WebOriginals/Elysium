<script setup lang="ts">

</script>

<template>
  <section class="banner">
    <div class="banner__wrapper">
      <div class="banner__content">
        <H1 v-html="$t('Lending.banner.title')"></H1>
        <p>{{$t('Lending.banner.description')}}</p>
        <UiButtonBlue
          class="banner__button-request"
          size="xxl"
          block
          :label="$t('Buttons.leave_a_request')"
        />
      </div>
      <div class="banner__animation banner-animation">
        <UiButtonPlay />
        <div class="banner-animation__img">
          <img src="/img/dollar rocket_3D.png" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.banner {
  @apply bg-sky-950 text-white rounded-3xl overflow-hidden p-5 md:p-12 mb-14 md:mb-24;

  &__wrapper {
    @apply grid gap-9 md:grid-cols-[410px_1fr] lg:grid-cols-[510px_1fr] xl:grid-cols-[660px_1fr];
  }

  &__content {
    @apply grid gap-5;

    h1 {
      //@apply mb-20;

      :deep(span) {
        @apply text-sky-600;
      }
    }

    p {
      @apply text-white md:w-[340px];
    }
  }

  &__button-request {
    @apply md:w-[340px] max-h-[60px] self-end;
  }

  &-animation {
    @apply grid justify-items-end;

    &__img {
      @apply opacity-100 transform -rotate-[30deg] -translate-y-4 -translate-x-32 w-[100px] scale-[2] md:translate-y-12 md:-translate-x-4 md:w-[200px] md:scale-[1.4] lg:scale-[1.9] xl:translate-y-8 xl:-translate-x-24;

      @media only screen and (min-width: 1024px) {
        animation: combined 9s ease-in-out 1 backwards;
        animation-delay: 3s;
      }



      img {
        @apply w-full h-full;
      }
    }
  }
}


@keyframes combined {
  0% {
    opacity: 1;
  }

  10%{
    transform: translateX(-96px) translateY(32px) rotate(-30deg) scale(1.9);
  }
  70% {
    transform: translateY(-700px) translateX(-450px) rotate(-30deg) scale(.6);
    opacity: 1;
  }

  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
