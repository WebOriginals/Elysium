<script setup lang="ts">

</script>

<template>
  <section class="missed-chance">
    <div class="missed-chance__wrapper">
      <div class="missed-chance__top missed-chance-top">
        <div class="missed-chance-top__left">
          <h2>{{$t('Lending.missed_chance.title')}}</h2>
          <p>{{$t('Lending.missed_chance.description')}}</p>
        </div>


        <ul class="missed-chance__tips">
          <li v-for="(item, index) in $tm('Lending.missed_chance.tips')" :key="$rt(index)">{{ $rt(item) }}</li>
        </ul>
      </div>
      <div class="missed-chance__bottom">
        <div class="missed-chance__card missed-chance-card" v-for="(item, index) in $tm('Lending.missed_chance.list')" :key="$rt(index)">
          <div class="missed-chance-card__title">{{ $rt(item.title) }}</div>
          <div class="missed-chance-card__description">{{ $rt(item.description) }}</div>
          <div class="missed-chance-card__img">
            <img :src="$rt(item.img)" alt="">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.missed-chance{
  @apply p-5 md:p-12 my-14 md:my-24  bg-sky-300 dark:bg-sky-900 rounded-3xl overflow-hidden;

  &-top{
    @apply grid gap-4 lg:gap-8 lg:grid-cols-[max(350px)_max(525px)] md:justify-between mb-12;
  }

  &__tips{
    @apply flex gap-2.5 flex-wrap text-sm;

    li{
      @apply rounded-full border-2 text-xs  px-4 py-3 text-center text-sky-950 dark:text-sky-400 w-auto border-sky-950 dark:border-sky-400;
    }
  }

  &__bottom{
    @apply grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4;
  }

  &-card{
    @apply p-5 md:p-7 text-white rounded-3xl flex flex-col gap-2.5 content-start;

    &__title{
      @apply text-2xl;
    }
    &__description{
      @apply text-sm md:text-base;
    }
    &__img{
      @apply w-[190px] md:w-[150px] ml-auto mt-auto;

      img{
        //@apply w-full h-full;
      }

    }

    &:nth-child(1){
      @apply bg-sky-500
    }
    &:nth-child(2){
      @apply bg-sky-950
    }
    &:nth-child(3){
      @apply bg-sky-600
    }
    &:nth-child(4){
      @apply bg-sky-950
    }
  }

}
</style>