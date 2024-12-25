<script setup lang="ts">

</script>

<template>
  <section class="banner">
    <div class="banner__container">

      <div class="banner__content">
        <H1 v-html="$t('Lending.banner.title')"></H1>
        <p>{{$t('Lending.banner.description')}}</p>
        <UiButtonBlue class="banner__button-request" size="xl" block :label="$t('Buttons.leave_a_request')"/>
<!--        <UiButtonAnimation class="banner__button-request"/>-->
      </div>
      <div class="banner__animation banner-animation">

        <div class="banner-animation__img">
          <img src="/img/dollar rocket_3D.png" alt="">
        </div>
        
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.banner{
  @apply bg-sky-950 text-white rounded-3xl overflow-hidden p-5 md:p-12;

  &__container{
    @apply grid gap-9 md:grid-cols-[610px_1fr];
  }

  &__content{
    @apply grid gap-5;

    h1{
      @apply mb-20;

      :deep(span){
        @apply text-sky-600;
      }
    }

    p{
      @apply text-sky-400 md:w-[340px];
    }
  }

  &__button-request{
    @apply md:w-[340px];
    //@apply md:w-[380px] md:-mb-11 md:-ml-5;
  }

  &-animation{

    &__img{
      @apply transform -rotate-[30deg] translate-y-28 translate-x-20 w-[300px] scale-125 ;

      img{
        @apply w-full h-full;
      }
    }
  }
}
</style>